import { PartyMediaProp } from "@/lib/types";
import Image from "next/image";
import PartyMediaDeleteButton from "../PartyMediaDeleteButton";
import PartyMediaDownloadButton from "../PartyMediaDownloadButton";
import PartyMediaArchiveButton from "../PartyMediaArchiveButton";
import PartyMediaActiveButton from "../PartyMediaActiveButton";
import PartyMediaUnarchiveButton from "../PartyMediaUnarchiveButton";

interface PartyMediaGalleryCarouselImageProps {
  image: PartyMediaProp;
  partyId: string;
}

function PartyMediaGalleryCarouselImage({
  image,
  partyId,
}: PartyMediaGalleryCarouselImageProps) {
  return (
    <div className="flex-[0_0_100%] flex items-center justify-center">
      <div className="relative">
        <Image
          src={`${process.env.NEXT_PUBLIC_S3_URL}/${image.url}`}
          alt=""
          width={image.width}
          height={image.height}
        />
        <div className="rounded-lg absolute flex gap-3 text-primary top-3 left-3">
          <PartyMediaDownloadButton
            partyId={partyId}
            image={image}
            className="w-auto rounded-lg"
          >
            Preuzmi
          </PartyMediaDownloadButton>
          {image.pending ? (
            <PartyMediaActiveButton
              partyId={partyId}
              image={image}
              className="w-auto rounded-lg"
            >
              Objavi
            </PartyMediaActiveButton>
          ) : (
            <>
              {image.archived ? (
                <PartyMediaUnarchiveButton
                  partyId={partyId}
                  image={image}
                  className="w-auto rounded-lg"
                >
                  Vrati
                </PartyMediaUnarchiveButton>
              ) : (
                <PartyMediaArchiveButton
                  partyId={partyId}
                  image={image}
                  className="w-auto rounded-lg"
                >
                  Arhiviraj
                </PartyMediaArchiveButton>
              )}
            </>
          )}
          <PartyMediaDeleteButton
            partyId={partyId}
            url={image.url}
            mediaId={image.id}
            className="w-auto rounded-lg"
          >
            <span className="text-xs">Obriši</span>
          </PartyMediaDeleteButton>
        </div>
      </div>
    </div>
  );
}

export default PartyMediaGalleryCarouselImage;
