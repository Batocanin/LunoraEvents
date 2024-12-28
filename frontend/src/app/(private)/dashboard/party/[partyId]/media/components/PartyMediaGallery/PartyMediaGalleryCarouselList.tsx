"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EmblaCarouselType, EmblaOptionsType } from "embla-carousel";
import PartyMediaGalleryCarouselImage from "./PartyMediaGalleryCarouselImage";
import { PartyMediaProp } from "@/lib/types";
import {
  InfiniteData,
  InfiniteQueryObserverResult,
} from "@tanstack/react-query";

interface PartyMediaGalleryCarouselListProps {
  images: PartyMediaProp[];
  onSlideChange: (width: number, height: number) => void;
  currentImageIndex: number;
  partyId: string;
  isFetching: boolean;
  hasNextPage: boolean;
  fetchNextPage: () => Promise<
    InfiniteQueryObserverResult<InfiniteData<any, unknown>, Error>
  >;
}

export function PartyMediaGalleryCarouselList({
  images,
  onSlideChange,
  currentImageIndex,
  partyId,
  isFetching,
  hasNextPage,
  fetchNextPage,
}: PartyMediaGalleryCarouselListProps) {
  const options: EmblaOptionsType = {
    loop: false,
    startIndex: currentImageIndex,
  };

  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const onSlideChangeRef = useRef(onSlideChange);

  const scrollPrev = useCallback(() => {
    emblaApi && emblaApi.scrollPrev();
  }, [emblaApi]);
  const scrollNext = useCallback(() => {
    if (isFetching) return;
    emblaApi && emblaApi.scrollNext();
    if (shouldLoadNextPage(emblaApi, hasNextPage)) fetchNextPage();
  }, [emblaApi]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        scrollPrev();
      } else if (event.key === "ArrowRight") {
        scrollNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [scrollPrev, scrollNext]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
    if (shouldLoadNextPage(emblaApi, hasNextPage)) fetchNextPage();
    const currentSlide = emblaApi.selectedScrollSnap();
    onSlideChangeRef.current(
      images[currentSlide]?.width,
      images[currentSlide]?.height
    );
  }, [emblaApi, images]);

  useEffect(() => {
    onSlideChangeRef.current = onSlideChange;
  }, [onSlideChange]);

  useEffect(() => {
    if (!emblaApi) return;
    if (isFetching) return;

    emblaApi.on("select", onSelect);
    emblaApi.on("init", onSelect);

    onSelect();

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("init", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {images.map((image) => (
            <PartyMediaGalleryCarouselImage
              key={image.id}
              image={image}
              partyId={partyId}
            />
          ))}
        </div>
      </div>
      <Button
        variant="outline"
        size="icon"
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/70"
        onClick={scrollPrev}
        disabled={!prevBtnEnabled}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/70"
        onClick={scrollNext}
        disabled={isFetching && hasNextPage}
      >
        {isFetching ? (
          <Loader2 className="aniamte-spin h-4 w-4" />
        ) : (
          <ChevronRight className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
}

const shouldLoadNextPage = (
  emblaApi: EmblaCarouselType | undefined,
  hasNextPage: boolean
) => {
  if (!emblaApi || !hasNextPage) return false;

  const isLastSlide =
    emblaApi.selectedScrollSnap() === emblaApi.scrollSnapList().length - 1;
  return isLastSlide;
};
