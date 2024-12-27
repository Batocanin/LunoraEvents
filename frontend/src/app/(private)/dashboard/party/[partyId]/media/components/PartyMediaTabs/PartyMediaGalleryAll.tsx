import { Party } from "@/lib/types";
import useGetPartyMedias from "../../hooks/useGetPartyMedias";
import PartyMediaGallery from "../PartyMediaGallery/PartyMediaGallery";

function PartyMediaGalleryAll({ partyData }: { partyData: Party }) {
  const {
    data: media,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useGetPartyMedias(partyData.id);

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

export default PartyMediaGalleryAll;
