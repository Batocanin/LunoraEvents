import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { AxiosInstance } from "@/lib/axios";
import { FilesToUpload } from "@/lib/types";
import { PartyValues } from "@/lib/validation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

function useApperanceEditPartyMutation(partyData: PartyValues) {
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async () => {
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
      const {
        data: { data: presignedUrls },
      } = await AxiosInstance.post(
        `/party/getPresignedUploadUrl`,
        {
          partyId: partyData.id,
          files: filesToUpload.map((file: FilesToUpload) => ({
            fileName: file.fileName,
            type: file.type,
            fileType: file.fileType,
          })),
        },
        {
          withCredentials: true,
          onUploadProgress: (progressEvent) => {
            if (progressEvent.total) {
              setProgress(
                10 +
                  Math.round((progressEvent.loaded * 10) / progressEvent.total)
              );
            }
          },
        }
      );

      let uploadProgress = 0;
      const totalFiles = filesToUpload.length;
      await Promise.all(
        presignedUrls.map(
          async ({
            presignedUrl,
            fileType,
            fileName,
          }: {
            presignedUrl: string;
            fileType: string;
            fileName: string;
          }) => {
            const fileToUpload = filesToUpload.find(
              (file) => file.fileName === fileName
            )?.file;
            return await AxiosInstance.put(presignedUrl, fileToUpload, {
              headers: {
                "Content-Type":
                  fileToUpload?.type || "application/octet-stream",
              },
              withCredentials: false,
              onUploadProgress: (progressEvent) => {
                if (progressEvent.total) {
                  const progress = Math.round(
                    (progressEvent.loaded * 60) /
                      (progressEvent.total * totalFiles)
                  );
                  uploadProgress += progress;
                  setProgress(20 + Math.min(uploadProgress, 60));
                }
              },
            });
          }
        )
      );

      setProgress(80);
      const {
        data: { data },
      } = await AxiosInstance.post(
        `/party/updatePartyPage/${partyData.id}`,
        {
          partyData,
          presignedUrls,
        },
        {
          withCredentials: true,
          onUploadProgress: (progressEvent) => {
            if (progressEvent.total) {
              setProgress(
                80 +
                  Math.round((progressEvent.loaded * 20) / progressEvent.total)
              );
            }
          },
        }
      );

      return data;
    },
    onSuccess: (data) => {
      setProgress(100);
      const { settings, ...otherValues } = data;
      queryClient.setQueryData(
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
      queryClient.setQueryData(
        ["party", data.id],
        (old: PartyValues[] | undefined) => {
          if (old) {
            return { ...old, ...settings, ...otherValues };
          }
          return { ...data };
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
      setProgress(0);
    },
  });
  return { mutation, progress };
}

export default useApperanceEditPartyMutation;
