import InfiniteScrollContainer from "@/components/InfiniteScrollContainer";
import { PartyMediaProp } from "@/lib/types";
import {
  InfiniteData,
  InfiniteQueryObserverResult,
} from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { PartyMediaGalleryCarousel } from "./PartyMediaGalleryCarousel";
import PartyMediaGalleryImage from "./PartyMediaGalleryImage";

interface PartyMediaGalleryProps {
  media: PartyMediaProp[];
  isFetching: boolean;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  status: string;
  imageVideoLength: number;
  fetchNextPage: () => Promise<
    InfiniteQueryObserverResult<InfiniteData<any, unknown>, Error>
  >;
  partyId: string;
}

function PartyMediaGallery({
  media,
  isFetching,
  hasNextPage,
  isFetchingNextPage,
  status,
  imageVideoLength,
  fetchNextPage,
  partyId,
}: PartyMediaGalleryProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openDialog = (index: number) => {
    setCurrentImageIndex(index);
    setIsDialogOpen(true);
  };

  // Dodati loading skeleton
  if (status === "pending")
    return (
      <Loader2 className="mx-auto animate-spin stroke-primary size-6 min-h-96" />
    );

  if (status === "success" && !imageVideoLength && !hasNextPage) {
    return (
      <p className="text-center text-muted-foreground py-6 min-h-96">
        Nema pronadjenih slika ili snimaka.
      </p>
    );
  }

  if (status === "error") {
    return (
      <p className="text-center text-destructive  min-h-96">
        Dogodila se greska, pokusajte ponovo kasnije ili nas kontaktirajte!
      </p>
    );
  }

  return (
    <>
      <InfiniteScrollContainer
        onBottomReached={() => hasNextPage && !isFetching && fetchNextPage()}
      >
        <div className="grid auto-rows-[10px] mb-3 mt-6 grid-cols-[repeat(auto-fit,minmax(170px,1fr))] sm:grid-cols-[repeat(auto-fit,minmax(250px,1fr))] lg:grid-cols-[repeat(auto-fit,minmax(350px,1fr))]">
          {media.map((image, index) => {
            return (
              <PartyMediaGalleryImage
                key={image.id}
                photo={image}
                partyId={partyId}
                onClick={() => openDialog(index)}
              />
            );
          })}
        </div>
        {isFetchingNextPage && (
          <Loader2 className="mx-auto my-3 animate-spin size-8 stroke-primary" />
        )}
        {!hasNextPage && (
          <p className="text-center text-muted-foreground py-6">
            Stigli ste do kraja, nadamo se da su Vam se svidele slike 😊
          </p>
        )}
      </InfiniteScrollContainer>
      <div className="flex flex-col items-center justify-center">
        <PartyMediaGalleryCarousel
          media={media}
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={setIsDialogOpen}
          currentImageIndex={currentImageIndex}
          isFetching={isFetching}
          hasNextPage={hasNextPage}
          fetchNextPage={fetchNextPage}
          partyId={partyId}
        />
      </div>
    </>
  );
}

export default PartyMediaGallery;
