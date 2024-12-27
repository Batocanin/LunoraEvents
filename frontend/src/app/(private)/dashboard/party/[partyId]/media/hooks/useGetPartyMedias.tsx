import { AxiosInstance } from "@/lib/axios";
import { useInfiniteQuery } from "@tanstack/react-query";

function useGetPartyMedias(partyId: string) {
  const mutation = useInfiniteQuery({
    queryKey: ["partyMediaAll", partyId],
    queryFn: async ({ pageParam }) => {
      const response = await AxiosInstance.get(
        `/party/media/getPartyMedias/${partyId}`,
        {
          params: {
            cursor: pageParam || {},
            limit: 10,
          },
        }
      );
      return response.data.data;
    },
    initialPageParam: null as string | null,
    getNextPageParam: ({ nextCursor }) => nextCursor,
    staleTime: Infinity,
  });

  return mutation;
}

export default useGetPartyMedias;
