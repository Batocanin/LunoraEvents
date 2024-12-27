import { AxiosInstance } from "@/lib/axios";

async function archivePartyMediaService(partyId: string, mediaId: string) {
  const response = await AxiosInstance.post("/party/media/archivePartyMedia", {
    partyId,
    mediaId,
  });

  return response.data;
}

export default archivePartyMediaService;
