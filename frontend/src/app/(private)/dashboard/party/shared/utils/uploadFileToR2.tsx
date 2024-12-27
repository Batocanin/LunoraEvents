import { AxiosInstance } from "@/lib/axios";
import { AxiosProgressEvent } from "axios";

async function uploadFileToR2(
  presignedUrl: string,
  fileToUpload: File | Blob,
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void
) {
  const response = await AxiosInstance.put(presignedUrl, fileToUpload, {
    headers: {
      "Content-Type": fileToUpload?.type || "application/octet-stream",
    },
    withCredentials: false,
    onUploadProgress,
  });

  return response;
}

export default uploadFileToR2;
