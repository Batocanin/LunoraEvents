import { AxiosInstance } from "@/lib/axios";
import { AxiosProgressEvent } from "axios";
import { PartyValues } from "@/lib/validation";
import { presignedUrlsData } from "../../shared/types/types";

async function updatePartyService(
  partyData: PartyValues,
  presignedUrls: presignedUrlsData,
  onUploadProgress: (progressEvent: AxiosProgressEvent) => void
) {
  const {
    data: { data },
  } = await AxiosInstance.post(
    `/party/updatePartyPage/${partyData.id}`,
    {
      partyData,
      presignedUrls,
    },
    {
      onUploadProgress,
    }
  );

  return data;
}

export default updatePartyService;
