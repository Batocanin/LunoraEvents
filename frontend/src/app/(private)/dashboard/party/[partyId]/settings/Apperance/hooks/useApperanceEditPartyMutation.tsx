import { FilesToUpload } from "@/lib/types";
import { PartyValues } from "@/lib/validation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import getPresignedUploadUrlService from "../../../../shared/services/getPresignedUploadUrlService";
import { presignedUrlsData } from "../../shared/types/types";
import updatePartyService from "../services/updatePartyService";
import { handleMutationOptimisticallyUpdate } from "../../shared/utils/handleMutationOptimisticallyUpdate";
import { handleMutationError } from "../../shared/utils/handleMutationError";
import uploadFileToR2 from "../../../../shared/utils/uploadFileToR2";
import { useToast } from "@/hooks/use-toast";

function useApperanceEditPartyMutation(partyData: PartyValues) {
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async () => {
      if (!partyData.id) throw new Error("Party ID je nepostojeci.");

      const filesToUpload: FilesToUpload[] = [];
      if (partyData.mainPhoto instanceof File) {
        filesToUpload.push({
          fileName: partyData.mainPhoto.name,
          file: partyData.mainPhoto,
          fileType: partyData.mainPhoto.type,
          type: "mainPhoto",
        });
      }
      if (partyData.backgroundPhoto instanceof File) {
        filesToUpload.push({
          fileName: partyData.backgroundPhoto.name,
          file: partyData.backgroundPhoto,
          fileType: partyData.backgroundPhoto.type,
          type: "backgroundPhoto",
        });
      }

      setProgress(10);
      const presignedUrls = await getPresignedUploadUrlService(
        partyData.id,
        filesToUpload,
        undefined,
        (progressEvent) => {
          if (progressEvent.total) {
            setProgress(
              10 + Math.round((progressEvent.loaded * 10) / progressEvent.total)
            );
          }
        }
      );

      let uploadProgress = 0;
      const totalFiles = filesToUpload.length;

      const presignedUrlsPromise = presignedUrls.map(
        async (presignedUrlData: presignedUrlsData) => {
          const fileToUpload = filesToUpload.find(
            (file) => file.fileName === presignedUrlData.fileName
          )?.file;
          if (!fileToUpload)
            throw new Error(
              `File nije pronadjen za presigned ${presignedUrlData.fileName} URL`
            );
          const response = await uploadFileToR2(
            presignedUrlData.presignedUrl,
            fileToUpload,
            (progressEvent) => {
              if (progressEvent.total) {
                const progress = Math.round(
                  (progressEvent.loaded * 60) /
                    (progressEvent.total * totalFiles)
                );
                uploadProgress += progress;
                setProgress(20 + Math.min(uploadProgress, 60));
              }
            }
          );
          return response;
        }
      );

      await Promise.all(presignedUrlsPromise);

      setProgress(80);
      const data = await updatePartyService(
        partyData,
        presignedUrls,
        (progressEvent) => {
          if (progressEvent.total) {
            setProgress(
              80 + Math.round((progressEvent.loaded * 20) / progressEvent.total)
            );
          }
        }
      );
      return data;
    },
    onSuccess: (data) => {
      setProgress(100);
      const { settings, ...otherValues } = data;
      handleMutationOptimisticallyUpdate(
        queryClient,
        ["partyList"],
        (old: PartyValues[] | undefined) => {
          if (old) {
            const existingIndex = old.findIndex(
              (party) => party.id === data.id
            );
            if (existingIndex !== -1) {
              const updatedList = [...old];
              updatedList[existingIndex] = { ...otherValues };
              return updatedList;
            } else {
              return [...old, data];
            }
          }
          return [data];
        }
      );

      handleMutationOptimisticallyUpdate(
        queryClient,
        ["party", data.id],
        (old: PartyValues[] | undefined) => {
          if (old) {
            return { ...old, ...settings, ...otherValues };
          }
          return { ...data };
        }
      );
    },
    onError: (error, variables, context) => {
      console.log(error);
      handleMutationError(
        toast,
        queryClient,
        ["party", partyData.id as string],
        "",
        () => mutation.mutate()
      );
      setProgress(0);
    },
  });
  return { mutation, progress };
}

export default useApperanceEditPartyMutation;
