import { AxiosInstance } from "@/lib/axios";
import { AxiosProgressEvent } from "axios";

async function createPartyPageMediaService(
  partyId: string,
  presignedUrls: string[],
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void
) {
  const response = await AxiosInstance.post(
    `/party/media/createPartyPageMedia`,
    { partyId, presignedUrls },
    {
      withCredentials: true,
      onUploadProgress,
    }
  );
  return response.data;
}

export default createPartyPageMediaService;
