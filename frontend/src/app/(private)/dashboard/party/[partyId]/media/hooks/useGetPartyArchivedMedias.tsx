import { useInfiniteQuery } from "@tanstack/react-query";
import getArchivedPartyMediasService from "../services/getArchivedPartyMediasService";

function useGetPartyArchivedMedias(partyId: string) {
  const mutation = useInfiniteQuery({
    queryKey: ["partyMediaArchived", partyId],
    queryFn: async ({ pageParam }) =>
      await getArchivedPartyMediasService(partyId, pageParam),
    initialPageParam: null as string | null,
    getNextPageParam: ({ nextCursor }) => nextCursor,
    staleTime: Infinity,
  });

  return mutation;
}

export default useGetPartyArchivedMedias;
