import { AxiosInstance } from "@/lib/axios";

async function activePartyMediaService(partyId: string, mediaId: string) {
  const response = await AxiosInstance.post("/party/media/activePartyMedia", {
    partyId,
    mediaId,
  });

  return response.data;
}

export default activePartyMediaService;
