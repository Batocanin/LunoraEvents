import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { FilesToUpload } from "@/lib/types";
import { PartyValues } from "@/lib/validation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import createPartyService from "../services/createPartyService";
import getPresignedUploadUrlService from "../shared/services/getPresignedUploadUrlService";
import uploadFileToR2 from "../shared/utils/uploadFileToR2";
import createPartyPageMediaService from "../services/createPartyPageMediaService";
import { handleMutationOptimisticallyUpdate } from "../[partyId]/settings/shared/utils/handleMutationOptimisticallyUpdate";

function useCreatePartyMutation(partyData: PartyValues) {
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async () => {
      const filesToUpload: FilesToUpload[] = [];

      const createdParty = await createPartyService(partyData);

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
          type: "backgroundPhoto",
          fileType: partyData.backgroundPhoto.type,
        });
      }

      setProgress(10);
      const presignedUrls = await getPresignedUploadUrlService(
        createdParty.data.id,
        filesToUpload,
        "",
        (progressEvent) => {
          if (progressEvent.total) {
            setProgress(
              10 + Math.round((progressEvent.loaded * 10) / progressEvent.total)
            );
          }
        }
      );

      console.log(presignedUrls);

      let uploadProgress = 0;
      const totalFiles = filesToUpload.length;
      const presignedUrlsPromise = presignedUrls.map(
        async ({
          presignedUrl,
          fileName,
        }: {
          presignedUrl: string;
          fileName: string;
        }) => {
          const fileToUpload = filesToUpload.find(
            (file) => file.fileName === fileName
          )?.file;
          if (!fileToUpload) {
            toast({
              description: `${fileName} nije pronadjen te isti nije uploadovan!`,
            });
            return;
          }
          return await uploadFileToR2(
            presignedUrl,
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
        }
      );

      await Promise.all(presignedUrlsPromise);

      setProgress(80);
      const updatedParty = await createPartyPageMediaService(
        createdParty.data.id,
        presignedUrls,
        (progressEvent) => {
          if (progressEvent.total) {
            setProgress(
              80 + Math.round((progressEvent.loaded * 20) / progressEvent.total)
            );
          }
        }
      );

      return updatedParty.data;
    },
    onSuccess: (data) => {
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
              updatedList[existingIndex] = data;
              return updatedList;
            }
            return [...old, data];
          }
          return [data];
        }
      );
    },
    onError: (error) => {
      console.log(error);
      const { dismiss } = toast({
        variant: "destructive",
        description: (
          <div className="space-y-3">
            <p>Dogodila se greska! Izmene nisu sacuvane.</p>
            <Button
              variant="secondary"
              onClick={() => {
                dismiss();
                mutation.mutate();
              }}
            >
              Retry
            </Button>
          </div>
        ),
      });
    },
  });
  return { mutation, progress };
}

export default useCreatePartyMutation;
