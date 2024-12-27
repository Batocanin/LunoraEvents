import { AxiosInstance } from "@/lib/axios";

async function getPendingPartyMediasService(
  partyId: string,
  pageParam: string | null
) {
  const response = await AxiosInstance.get(
    `/party/media/getPartyPendingMedias/${partyId}`,
    {
      params: {
        cursor: pageParam || {},
        limit: 10,
      },
    }
  );
  return response.data.data;
}

export default getPendingPartyMediasService;
