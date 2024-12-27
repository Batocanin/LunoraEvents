import { QueryClient, useQueryClient } from "@tanstack/react-query";
import { FilesToUploadGallery } from "../../../../../../../lib/types";
import React from "react";
import createPartyMultiPartUploadService from "../services/createPartyMultiPartUploadService";
import completeMultiPartUpload from "../services/completeMultiPartUpload";
import uploadFileToR2 from "../../../shared/utils/uploadFileToR2";

export const CHUNK_SIZE = 20 * 1024 * 1024;

async function multiPartUpload(
  file: File,
  partyId: string,
  id: string,
  setProgressMap: React.Dispatch<React.SetStateAction<Record<string, number>>>,
  queryClient: ReturnType<typeof useQueryClient>,
  width: number,
  height: number
) {
  const totalParts = Math.ceil(file.size / CHUNK_SIZE);

  const multiPartData = await createPartyMultiPartUploadService(
    partyId,
    file,
    undefined,
    totalParts
  );

  let uploadedBytes = 0;

  const uploadedPartsPromise = Array.from({ length: totalParts }).map(
    async (_, index) => {
      const start = index * CHUNK_SIZE;
      const end = Math.min(start + CHUNK_SIZE, file.size);
      const chunk = file.slice(start, end);

      let bytesUploadedForChunk = 0;

      const response = await uploadFileToR2(
        multiPartData.presignedUrls[index],
        chunk,
        (progressEvent) => {
          if (progressEvent.total) {
            const chunkProgress = progressEvent.loaded - bytesUploadedForChunk;
            bytesUploadedForChunk = progressEvent.loaded;

            uploadedBytes += chunkProgress;
            const totalProgress = Math.round((uploadedBytes / file.size) * 100);
            onProgress(queryClient, totalProgress, id, setProgressMap);
          }
        }
      );

      return {
        ETag: response.headers.etag.replace(/"/g, ""),
        PartNumber: index + 1,
      };
    }
  );

  const uploadedParts = await Promise.all(uploadedPartsPromise);

  const completeMultiPartUploadData = await completeMultiPartUpload(
    partyId,
    multiPartData.UploadId,
    multiPartData.key,
    uploadedParts,
    width,
    height,
    file.type
  );

  return completeMultiPartUploadData.data;
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
        upload.id === id ? { ...upload, progress } : upload
      );
    }
  );
  setProgressMap((prev) => ({
    ...prev,
    [id]: progress,
  }));
};

export default multiPartUpload;
