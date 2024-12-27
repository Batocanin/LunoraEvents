import { useQueryClient } from "@tanstack/react-query";
import { AxiosInstance } from "../../../../../../../lib/axios";
import { FilesToUploadGallery } from "../../../../../../../lib/types";
import React from "react";

export const CHUNK_SIZE = 5 * 1024 * 1024;

async function multiPartUpload(
  file: File,
  partyId: string,
  id: string,
  setProgressMap: React.Dispatch<React.SetStateAction<Record<string, number>>>,
  queryClient: ReturnType<typeof useQueryClient>,
  width: number,
  height: number,
  pending: boolean
) {
  const totalParts = Math.ceil(file.size / CHUNK_SIZE);

  const {
    data: {
      data: { presignedUrls, key, UploadId },
    },
  } = await AxiosInstance.post("/party/media/createPartyMultiPartUpload", {
    partyId,
    folder: "media/",
    fileName: file.name,
    fileType: file.type,
    totalParts,
  });

  let uploadedBytes = 0;

  const uploadedParts = await Promise.all(
    Array.from({ length: totalParts }).map(async (_, index) => {
      const start = index * CHUNK_SIZE;
      const end = Math.min(start + CHUNK_SIZE, file.size);
      const chunk = file.slice(start, end);

      let bytesUploadedForChunk = 0;

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

      const response = await AxiosInstance.put(presignedUrls[index], chunk, {
        headers: {
          "Content-Type": file.type,
        },
        withCredentials: false,
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const chunkProgress = progressEvent.loaded - bytesUploadedForChunk;
            bytesUploadedForChunk = progressEvent.loaded;

            uploadedBytes += chunkProgress;
            const totalProgress = Math.round((uploadedBytes / file.size) * 100);
            onProgress(file.name, totalProgress);
          }
        },
      });

      return {
        ETag: response.headers.etag.replace(/"/g, ""),
        PartNumber: index + 1,
      };
    })
  );

  const {
    data: { data },
  } = await AxiosInstance.post(
    `/party/media/completeMultiPartUpload`,
    {
      partyId,
      UploadId,
      key,
      parts: uploadedParts,
      width,
      height,
      type: file.type,
      pending,
    },
    { withCredentials: true }
  );

  return data;
}

export default multiPartUpload;
