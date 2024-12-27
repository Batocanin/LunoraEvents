import { AxiosInstance } from "@/lib/axios";

async function getApprovedPartyMediasService(
  partyId: string,
  pageParam: string | null
) {
  const response = await AxiosInstance.get(
    `/party/media/getPartyApprovedMedias/${partyId}`,
    {
      params: {
        cursor: pageParam || {},
        limit: 10,
      },
    }
  );
  return response.data.data;
}

export default getApprovedPartyMediasService;
