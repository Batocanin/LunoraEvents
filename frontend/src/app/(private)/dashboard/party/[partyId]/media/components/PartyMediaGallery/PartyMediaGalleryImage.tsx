"use client";

import { PartyMediaProp } from "@/lib/types";
import Image from "next/image";
import { useEffect, useState } from "react";
import PartyMediaDeleteButton from "../PartyMediaDeleteButton";
import PartyMediaDownloadButton from "../PartyMediaDownloadButton";
import PartyMediaArchiveButton from "../PartyMediaArchiveButton";
import PartyMediaActiveButton from "../PartyMediaActiveButton";
import PartyMediaUnarchiveButton from "../PartyMediaUnarchiveButton";

function PartyMediaGalleryImage({
  photo,
  onClick,
  partyId,
}: {
  photo: PartyMediaProp;
  onClick?: () => void;
  partyId: string;
}) {
  const [imageWidth, setImageWidth] = useState(350);

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;

      if (screenWidth < 640) {
        setImageWidth(170);
      } else if (screenWidth >= 640 && screenWidth <= 1024) {
        setImageWidth(250);
      } else {
        setImageWidth(350);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const widthHeightRatio = photo.height / photo.width;
  const galleryHeight = Math.ceil(imageWidth * widthHeightRatio);
  const photoSpans = Math.ceil(galleryHeight / 10) + 1;

  return (
    <div style={{ gridRow: `span ${photoSpans}`, width: `${imageWidth}px` }}>
      <div className="relative rounded-xl overflow-hidden group">
        {photo.type.includes("image") && (
          <Image
            src={`${process.env.NEXT_PUBLIC_S3_URL}/${photo.url}`}
            alt=""
            width={photo.width}
            height={photo.height}
            className="group-hover:opacity-95"
            onClick={onClick}
          />
        )}
        {photo.type.includes("video") && (
          <div className="relative aspect-square" onClick={onClick}>
            <video width={200} height={300} controls>
              <source
                src={`${process.env.NEXT_PUBLIC_S3_URL}/${photo.url}`}
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>
        )}
        <div className="absolute flex items-center gap-4 bottom-3 left-1/2 -translate-x-1/2">
          <PartyMediaDownloadButton
            partyId={partyId}
            image={photo}
            className="opacity-0 transition-opacity duration-200 group-hover:opacity-80"
          />
          {photo.pending ? (
            <PartyMediaActiveButton
              partyId={partyId}
              image={photo}
              className="opacity-0 transition-opacity duration-200 group-hover:opacity-80"
            />
          ) : (
            <>
              {photo.archived ? (
                <PartyMediaUnarchiveButton
                  partyId={partyId}
                  image={photo}
                  className="opacity-0 transition-opacity duration-200 group-hover:opacity-80"
                />
              ) : (
                <PartyMediaArchiveButton
                  partyId={partyId}
                  image={photo}
                  className="opacity-0 transition-opacity duration-200 group-hover:opacity-80"
                />
              )}
            </>
          )}
          <PartyMediaDeleteButton
            className="opacity-0 transition-opacity duration-200 group-hover:opacity-80"
            partyId={partyId}
            url={photo.url}
            mediaId={photo.id}
          />
        </div>
      </div>
    </div>
  );
}

export default PartyMediaGalleryImage;
