import { AxiosInstance } from "@/lib/axios";
import multiPartUpload from "@/lib/multiPartUpload";
import { FilesToUploadGallery, Party, PartyGalleryMedia } from "@/lib/types";
import { getImageDimensions } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";

function useUploadPartyMedia(
  partyData: Party,
  setProgressMap: React.Dispatch<React.SetStateAction<Record<string, number>>>
) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async ({ file, id }: { file: File; id: string }) => {
      const { width, height } = await getImageDimensions(file);

      if (file.size > 10 * 1024 * 1024) {
        return await multiPartUpload(
          file,
          partyData.id,
          id,
          setProgressMap,
          queryClient,
          width,
          height
        );
      } else {
        const {
          data: { data: presignedUrls },
        } = await AxiosInstance.post(
          `/party/getPresignedUploadUrl`,
          {
            partyId: partyData.id,
            folder: "media/",
            files: [{ fileName: file.name, type: file.type }],
          },
          {
            withCredentials: true,
          }
        );

        const onProgress = (fileName: string, progress: number) => {
          queryClient.setQueryData(
            ["adminUploads"],
            (oldUploads: FilesToUploadGallery[] = []) => {
              return oldUploads.map((upload) =>
                upload.id === id ? { ...upload, progress } : upload
              );
            }
          );
          setProgressMap((prev) => ({
            ...prev,
            [id]: progress,
          }));
        };

        await AxiosInstance.put(presignedUrls[0].presignedUrl, file, {
          headers: {
            "Content-Type": file.type,
          },
          withCredentials: false,
          onUploadProgress: (progressEvent) => {
            if (progressEvent.total) {
              const progress = Math.round(
                (progressEvent.loaded / progressEvent.total) * 100
              );
              onProgress(file.name, progress);
            }
          },
        });

        const {
          data: { data },
        } = await AxiosInstance.post("/party/media/createPartyMedia", {
          partyId: partyData.id,
          key: presignedUrls[0].key,
          width,
          height,
          type: file.type,
        });

        return data;
      }
    },
    onSuccess: (data, variables) => {
      queryClient.setQueryData(
        ["adminUploads"],
        (oldUploads: FilesToUploadGallery[]) =>
          oldUploads.map((upload) => {
            if (upload.id === variables.id) {
              URL.revokeObjectURL(upload.previewUrl);
              return {
                ...upload,
                previewUrl: `${process.env.NEXT_PUBLIC_S3_URL}/${data.url}`,
                serverUrl: `${process.env.NEXT_PUBLIC_S3_URL}/${data.url}`,
                progress: 100,
                status: "completed",
              };
            }
            return upload;
          })
      );
      queryClient.setQueryData(
        ["partyMedia", partyData.id],
        (oldUploads: PartyGalleryMedia | undefined) => {
          if (oldUploads) {
            return {
              ...oldUploads,
              pages: oldUploads.pages.map((page, index: number) =>
                index === 0
                  ? {
                      ...page,
                      partyMedias: [data, ...page.partyMedias],
                    }
                  : page
              ),
            };
          }
          return {
            pages: [{ partyMedias: [data], nextCursor: null }],
            pageParams: [null],
          };
        }
      );
    },
    onError: (error, variables, context) => {
      console.log(error);
      queryClient.setQueryData(
        ["adminUploads"],
        (oldUploads: FilesToUploadGallery[]) => {
          oldUploads.map((upload) =>
            upload.id === variables.id
              ? { ...upload, status: "failed" }
              : upload
          );
        }
      );
    },
  });

  return mutation;
}

export default useUploadPartyMedia;
