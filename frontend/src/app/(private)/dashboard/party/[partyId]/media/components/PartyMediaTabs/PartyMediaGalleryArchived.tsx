import { Party } from "@/lib/types";
import useGetPartyArchivedMedias from "../../hooks/useGetPartyArchivedMedias";
import PartyMediaGallery from "../PartyMediaGallery/PartyMediaGallery";

function PartyMediaGalleryArchived({ partyData }: { partyData: Party }) {
  const {
    data: media,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useGetPartyArchivedMedias(partyData.id);

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

export default PartyMediaGalleryArchived;
