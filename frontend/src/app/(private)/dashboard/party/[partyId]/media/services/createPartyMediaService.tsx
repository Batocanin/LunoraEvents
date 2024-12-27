import { AxiosInstance } from "@/lib/axios";

async function createPartyMediaService(
  partyId: string,
  key: string,
  width: number,
  height: number,
  type: string,
  pending: boolean
) {
  const response = await AxiosInstance.post("/party/media/createPartyMedia", {
    partyId,
    key,
    width,
    height,
    type,
    pending,
  });

  return response.data;
}

export default createPartyMediaService;
