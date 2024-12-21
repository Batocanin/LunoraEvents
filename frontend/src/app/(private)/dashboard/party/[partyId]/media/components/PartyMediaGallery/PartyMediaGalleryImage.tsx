"use client";

import { PartyMediaProp } from "@/lib/types";
import Image from "next/image";
import { useEffect, useState } from "react";

function PartyMediaGalleryImage({
  photo,
  onClick,
}: {
  photo: PartyMediaProp;
  onClick?: () => void;
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
    <div
      style={{ gridRow: `span ${photoSpans}`, width: `${imageWidth}px` }}
      onClick={onClick}
    >
      <div className="rounded-xl overflow-hidden group">
        {photo.type.includes("image") ? (
          <Image
            src={`${process.env.NEXT_PUBLIC_S3_URL}/${photo.url}`}
            alt=""
            width={photo.width}
            height={photo.height}
            className="group-hover:opacity-95 "
          />
        ) : (
          <div className="relative aspect-square">
            <video width={200} height={300} controls>
              <source
                src={`${process.env.NEXT_PUBLIC_S3_URL}/${photo.url}`}
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>
        )}
      </div>
    </div>
  );
}

export default PartyMediaGalleryImage;
