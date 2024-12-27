import { AxiosInstance } from "@/lib/axios";

async function getArchivedPartyMediasService(
  partyId: string,
  pageParam: string | null
) {
  const response = await AxiosInstance.get(
    `/party/media/getPartyArchivedMedias/${partyId}`,
    {
      params: {
        cursor: pageParam || {},
        limit: 10,
      },
    }
  );
  return response.data.data;
}

export default getArchivedPartyMediasService;
