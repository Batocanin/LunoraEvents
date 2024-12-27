import { AxiosInstance } from "@/lib/axios";

type uploadedParts = {
  ETag: string;
  PartNumber: number;
};

async function completeMultiPartUpload(
  partyId: string,
  UploadId: number,
  key: string,
  uploadedParts: uploadedParts[],
  width: number,
  height: number,
  type: string
) {
  const response = await AxiosInstance.post(
    `/party/media/completeMultiPartUpload`,
    {
      partyId,
      UploadId,
      key,
      parts: uploadedParts,
      width,
      height,
      type,
    }
  );

  return response.data;
}

export default completeMultiPartUpload;
