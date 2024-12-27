import { AxiosInstance } from "@/lib/axios";
import { FilesToUpload } from "@/lib/types";
import { AxiosProgressEvent } from "axios";

async function getPresignedUploadUrlService(
  partyId: string,
  filesToUpload: FilesToUpload[],
  folder?: string,
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void
) {
  const {
    data: { data: presignedUrls },
  } = await AxiosInstance.post(
    `/party/getPresignedUploadUrl`,
    {
      partyId: partyId,
      files: filesToUpload.map((file: FilesToUpload) => ({
        fileName: file.fileName,
        type: file.type,
        fileType: file.fileType,
      })),
      folder,
    },
    {
      withCredentials: true,
      onUploadProgress,
    }
  );

  return presignedUrls;
}

export default getPresignedUploadUrlService;
