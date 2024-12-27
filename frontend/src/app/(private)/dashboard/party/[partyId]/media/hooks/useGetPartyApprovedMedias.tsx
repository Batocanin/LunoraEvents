import { useInfiniteQuery } from "@tanstack/react-query";
import getApprovedPartyMediasService from "../services/getApprovedPartyMediasService";

function useGetPartyApprovedMedias(partyId: string) {
  const mutation = useInfiniteQuery({
    queryKey: ["partyMediaApproved", partyId],
    queryFn: async ({ pageParam }) =>
      await getApprovedPartyMediasService(partyId, pageParam),
    initialPageParam: null as string | null,
    getNextPageParam: ({ nextCursor }) => nextCursor,
    staleTime: Infinity,
  });

  return mutation;
}

export default useGetPartyApprovedMedias;
