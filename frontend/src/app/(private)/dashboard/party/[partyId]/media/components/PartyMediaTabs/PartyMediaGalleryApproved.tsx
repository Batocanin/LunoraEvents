import { Party } from "@/lib/types";
import PartyMediaGallery from "../PartyMediaGallery/PartyMediaGallery";
import useGetPartyApprovedMedias from "../../hooks/useGetPartyApprovedMedias";

function PartyMediaGalleryApproved({ partyData }: { partyData: Party }) {
  const {
    data: media,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useGetPartyApprovedMedias(partyData.id);

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

export default PartyMediaGalleryApproved;
