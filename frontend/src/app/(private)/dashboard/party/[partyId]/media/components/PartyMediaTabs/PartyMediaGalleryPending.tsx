import { Party } from "@/lib/types";
import useGetPartyPendingMedias from "../../hooks/useGetPartyPendingMedias";
import PartyMediaGallery from "../PartyMediaGallery/PartyMediaGallery";

function PartyMediaGalleryPending({ partyData }: { partyData: Party }) {
  const {
    data: media,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useGetPartyPendingMedias(partyData.id);

  const partyMedia = media?.pages.flatMap((page) => page.partyMedias) || [];
  return (
    <PartyMediaGallery
      media={partyMedia}
      isFetching={isFetching}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
      fetchNextPage={fetchNextPage}
      status={status}
      imageVideoLength={partyMedia.length}
      partyId={partyData.id}
    />
  );
}

export default PartyMediaGalleryPending;
