import multiPartUpload from "@/app/(private)/dashboard/party/[partyId]/media/hooks/multiPartUpload";
import { FilesToUploadGallery, Party, PartyGalleryMedia } from "@/lib/types";
import { getImageDimensions } from "@/lib/utils";
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import React from "react";
import getPresignedUploadUrlService from "../../../shared/services/getPresignedUploadUrlService";
import uploadFileToR2 from "../../../shared/utils/uploadFileToR2";
import createPartyMediaService from "../services/createPartyMediaService";
import { handleMutationOptimisticallyUpdate } from "../../settings/shared/utils/handleMutationOptimisticallyUpdate";
import getPendingPartyMediasService from "../services/getPendingPartyMediasService";

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
          height,
          partyData.settings.manualApproval
        );
      } else {
        const presignedUrls = await getPresignedUploadUrlService(
          partyData.id,
          [{ fileName: file.name, type: file.type }],
          "media/"
        );

        await uploadFileToR2(
          presignedUrls[0].presignedUrl,
          file,
          (progressEvent) => {
            if (progressEvent.total) {
              const progress = Math.round(
                (progressEvent.loaded / progressEvent.total) * 100
              );
              onProgress(queryClient, progress, id, setProgressMap);
            }
          }
        );

        const response = await createPartyMediaService(
          partyData.id,
          presignedUrls[0].key,
          width,
          height,
          file.type,
          partyData.settings.manualApproval
        );

        return response.data;
      }
    },
    onSuccess: async (data, variables) => {
      onProgress(queryClient, 100, data.id, setProgressMap);
      handleMutationOptimisticallyUpdate(
        queryClient,
        ["adminUploads"],
        (old: FilesToUploadGallery[] | undefined) => {
          if (old) {
            return old.map((upload) => {
              if (upload.id === variables.id) {
                URL.revokeObjectURL(upload.previewUrl);
                return {
                  ...upload,
                  id: data.id,
                  previewUrl: `${process.env.NEXT_PUBLIC_S3_URL}/${data.url}`,
                  serverUrl: `${process.env.NEXT_PUBLIC_S3_URL}/${data.url}`,
                  progress: 100,
                  status: "completed" as const,
                };
              }
              return upload;
            });
          }
          return [data];
        }
      );

      const oldPendingData = queryClient.getQueryData([
        "partyMediaPending",
        partyData.id,
      ]);

      const fetchedPendingData = !oldPendingData
        ? await getPendingPartyMediasService(partyData.id, null)
        : null;

      if (partyData.settings.manualApproval) {
        handleMutationOptimisticallyUpdate(
          queryClient,
          ["partyMediaPending", partyData.id],
          (old: PartyGalleryMedia | undefined) => {
            if (old) {
              return {
                ...old,
                pages: old.pages.map((page, index: number) =>
                  index === 0
                    ? { ...page, partyMedias: [data, ...page.partyMedias] }
                    : page
                ),
              };
            }
            return {
              pages: [
                {
                  nextCursor: null,
                  partyMedias: [...fetchedPendingData.partyMedias],
                },
              ],
              pageParams: [null],
            };
          }
        );
      }

      handleMutationOptimisticallyUpdate(
        queryClient,
        ["partyMediaAll", partyData.id],
        (old: PartyGalleryMedia | undefined) => {
          if (old) {
            return {
              ...old,
              pages: old.pages.map((page, index: number) =>
                index === 0
                  ? { ...page, partyMedias: [data, ...page.partyMedias] }
                  : page
              ),
            };
          }
          return {
            pages: [{ nextCursor: null, partyMedias: [data] }],
            pageParams: [null],
          };
        }
      );
    },
    onError: (error, variables, context) => {
      console.log(error);
      handleMutationOptimisticallyUpdate(
        queryClient,
        ["adminUploads"],
        (old: FilesToUploadGallery[] | undefined) => {
          if (old) {
            return old.map((upload) =>
              upload.id === variables.id
                ? { ...upload, status: "failed" as const }
                : upload
            );
          }
          return old;
        }
      );
    },
  });
  return mutation;
}

const onProgress = (
  queryClient: QueryClient,
  progress: number,
  id: string,
  setProgressMap: React.Dispatch<React.SetStateAction<Record<string, number>>>
) => {
  queryClient.setQueryData(
    ["adminUploads"],
    (oldUploads: FilesToUploadGallery[] = []) => {
      return oldUploads.map((upload) =>
        upload.id === id ? { ...upload, id, progress } : upload
      );
    }
  );
  setProgressMap((prev) => ({
    ...prev,
    [id]: progress,
  }));
};

export default useUploadPartyMedia;
