"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Party } from "@/lib/types";
import PartyMediaUploadDialog from "./components/PartyMediaUploadDialog";
import PartyMediaUploadChart from "./components/PartyMediaUploadChart";
import usePartyMediaListMutation from "./mutations/usePartyMediaListMutation";
import PartyMediaGallery from "./components/PartyMediaGallery/PartyMediaGallery";

function PartyMediaPage({ partyData }: { partyData: Party }) {
  const {
    data: media,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = usePartyMediaListMutation(partyData.id);

  const partyMedia = media?.pages.flatMap((page) => page.partyMedias) || [];

  return (
    <>
      <Card className="bg-primary/90 text-primary-foreground w-full max-w-[644px] mt-6 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl">
            Vaše fotografije & video snimci
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-sm">
            Ovde možete pronaći sve fotografije i video snimke vašeg događaja.
            Takođe možete dodati svoje fotografije, koje će se prikazati na
            vašem Zidu Fotografija i u Digitalnom Albumu.
          </p>
          <PartyMediaUploadDialog partyData={partyData} />
        </CardContent>
      </Card>
      <PartyMediaUploadChart />
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
    </>
  );
}

export default PartyMediaPage;
