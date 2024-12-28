import { AxiosInstance } from "@/lib/axios";
import { PartyValues } from "@/lib/validation";
import { AxiosProgressEvent } from "axios";

async function createPartyPageMediaService(
  partyId: string,
  partyValues: PartyValues,
  presignedUrls: string[],
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void
) {
  const response = await AxiosInstance.post(
    `/party/media/createPartyPageMedia`,
    { partyId, partyValues, presignedUrls },
    {
      withCredentials: true,
      onUploadProgress,
    }
  );
  return response.data;
}

export default createPartyPageMediaService;
