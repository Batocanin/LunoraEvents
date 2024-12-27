import { AxiosInstance } from "@/lib/axios";

async function unarchivePartyMediaService(partyId: string, mediaId: string) {
  const response = await AxiosInstance.post(
    "/party/media/unarchivePartyMedia",
    {
      partyId,
      mediaId,
    }
  );

  return response.data;
}

export default unarchivePartyMediaService;
