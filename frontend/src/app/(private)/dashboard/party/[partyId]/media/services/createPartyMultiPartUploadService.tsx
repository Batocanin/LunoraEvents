import { AxiosInstance } from "@/lib/axios";

async function createPartyMultiPartUploadService(
  partyId: string,
  file: File,
  folder: string = "media/",
  totalParts: number
) {
  const response = await AxiosInstance.post(
    "/party/media/createPartyMultiPartUpload",
    {
      partyId,
      folder,
      fileName: file.name,
      fileType: file.type,
      totalParts,
    }
  );

  return response.data;
}

export default createPartyMultiPartUploadService;
