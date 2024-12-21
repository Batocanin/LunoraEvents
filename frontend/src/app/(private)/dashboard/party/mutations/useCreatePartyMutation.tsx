import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { AxiosInstance } from "@/lib/axios";
import { FilesToUpload } from "@/lib/types";
import { PartyValues } from "@/lib/validation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";

function useCreatePartyMutation(partyData: PartyValues) {
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: async () => {
      const filesToUpload: FilesToUpload[] = [];

      const {
        data: { data },
      } = await AxiosInstance.post(
        "/party/createParty",
        {
          partyData,
        },
        {
          withCredentials: true,
        }
      );

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
      const {
        data: { data: presignedUrls },
      } = await AxiosInstance.post(
        `/party/getPresignedUploadUrl`,
        {
          partyId: data.id,
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
            fileName,
          }: {
            presignedUrl: string;
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
        data: { data: updatedParty },
      } = await AxiosInstance.post(
        `/party/media/createPartyPageMedia`,
        { partyId: data.id, presignedUrls },
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

      return updatedParty;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(
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
            } else {
              return [...old, data];
            }
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
