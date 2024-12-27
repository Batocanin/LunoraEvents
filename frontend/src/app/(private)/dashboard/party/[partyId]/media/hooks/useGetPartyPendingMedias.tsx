import { useInfiniteQuery } from "@tanstack/react-query";
import getPendingPartyMediasService from "../services/getPendingPartyMediasService";

function useGetPartyPendingMedias(partyId: string) {
  const mutation = useInfiniteQuery({
    queryKey: ["partyMediaPending", partyId],
    queryFn: async ({ pageParam }) =>
      await getPendingPartyMediasService(partyId, pageParam),
    initialPageParam: null as string | null,
    getNextPageParam: ({ nextCursor }) => nextCursor,
    staleTime: Infinity,
  });

  return mutation;
}

export default useGetPartyPendingMedias;
