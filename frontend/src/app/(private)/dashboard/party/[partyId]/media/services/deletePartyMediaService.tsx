import { AxiosInstance } from "@/lib/axios";

async function deletePartyMediaService(
  partyId: string,
  mediaId: string,
  key: string
) {
  const response = await AxiosInstance.post(
    "/party/media/deletePartyMedia",
    {
      partyId,
      mediaId,
      key,
    },
    { withCredentials: true }
  );

  return response.data;
}

export default deletePartyMediaService;
