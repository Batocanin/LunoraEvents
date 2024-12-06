"use client";

import { GalleryPhoto } from "@/lib/types";
import Image from "next/image";
import { useEffect, useState } from "react";

function GalleryImage({ photo }: { photo: GalleryPhoto }) {
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

    handleResize(); // Inicijalno postavljanje
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const widthHeightRatio = photo.height / photo.width;
  const galleryHeight = Math.ceil(imageWidth * widthHeightRatio);
  const photoSpans = Math.ceil(galleryHeight / 10) + 1;

  return (
    <div
      className="justify-self-center"
      style={{ gridRow: `span ${photoSpans}`, width: `${imageWidth}px` }}
    >
      <div className="rounded-xl overflow-hidden group">
        <Image
          src={photo.src}
          alt=""
          width={photo.width}
          height={photo.height}
          sizes={`${imageWidth}px`}
          className="group-hover:opacity-75"
        />
      </div>
    </div>
  );
}

export default GalleryImage;
