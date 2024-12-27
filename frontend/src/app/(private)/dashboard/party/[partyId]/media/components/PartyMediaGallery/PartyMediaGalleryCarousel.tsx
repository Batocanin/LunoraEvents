"use client";

import { useState, useCallback, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { PartyMediaProp } from "@/lib/types";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { PartyMediaGalleryCarouselList } from "./PartyMediaGalleryCarouselList";
import {
  InfiniteData,
  InfiniteQueryObserverResult,
} from "@tanstack/react-query";

export function PartyMediaGalleryCarousel({
  media,
  isDialogOpen,
  setIsDialogOpen,
  currentImageIndex,
  partyId,
  isFetching,
  hasNextPage,
  fetchNextPage,
}: {
  media: PartyMediaProp[];
  isDialogOpen: boolean;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  currentImageIndex: number;
  partyId: string;
  isFetching: boolean;
  hasNextPage: boolean;
  fetchNextPage: () => Promise<
    InfiniteQueryObserverResult<InfiniteData<any, unknown>, Error>
  >;
}) {
  const [currentSize, setCurrentSize] = useState({
    width: media[currentImageIndex]?.width,
    height: media[currentImageIndex]?.height,
  });

  const handleSlideChange = useCallback((width: number, height: number) => {
    setCurrentSize({ width, height });
  }, []);

  useEffect(() => {
    if (isDialogOpen) {
      setCurrentSize({
        width: media[currentImageIndex]?.width,
        height: media[currentImageIndex]?.height,
      });
    }
  }, [isDialogOpen, currentImageIndex, media]);

  const calculateDialogSize = () => {
    const maxWidth = window.innerWidth * 0.9;
    const maxHeight = window.innerHeight * 0.9;
    const aspectRatio = currentSize.width / currentSize.height;

    let width = currentSize.width;
    let height = currentSize.height;

    if (width > maxWidth) {
      width = maxWidth;
      height = width / aspectRatio;
    }

    if (height > maxHeight) {
      height = maxHeight;
      width = height * aspectRatio;
    }

    return { width, height };
  };

  const dialogSize = calculateDialogSize();

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent
        className="p-0 flex items-center justify-center border-0 bg-transparent overflow-hidden"
        style={{
          width: `${dialogSize.width}px`,
          height: `${dialogSize.height}px`,
          maxWidth: "90vw",
          maxHeight: "90vh",
        }}
      >
        <VisuallyHidden>
          <DialogTitle />
        </VisuallyHidden>
        <PartyMediaGalleryCarouselList
          images={media}
          currentImageIndex={currentImageIndex}
          onSlideChange={handleSlideChange}
          partyId={partyId}
          isFetching={isFetching}
          hasNextPage={hasNextPage}
          fetchNextPage={fetchNextPage}
        />
      </DialogContent>
    </Dialog>
  );
}
