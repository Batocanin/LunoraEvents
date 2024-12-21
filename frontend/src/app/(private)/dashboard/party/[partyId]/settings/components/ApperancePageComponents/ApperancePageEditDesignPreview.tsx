import { Button } from "@/components/ui/button";
import { Party } from "@/lib/types";
import { ImageIcon, MessageCircleHeart } from "lucide-react";
import Image from "next/image";

interface ApperancePageEditDesignPreviewProps {
  partyData: Party;
  mainPhotoUrl: string | undefined;
  backgroundPhotoUrl: string | undefined;
}

function ApperancePageEditDesignPreview({
  partyData,
  mainPhotoUrl,
  backgroundPhotoUrl,
}: ApperancePageEditDesignPreviewProps) {
  return (
    <div>
      <div className="space-y-1.5 text-center">
        <h2 className="text-xl font-semiboold">
          Izgled dizajna stranice za proslavu
        </h2>
      </div>
      <div
        className="relative mx-auto my-4"
        style={{ width: `${375 * 0.6}px`, height: `${667 * 0.5}px` }}
      >
        <div className="border-8 border-black rounded-3xl overflow-hidden transform scale-[.6] origin-top-left w-[375px] h-[667px]">
          <div className="relative flex flex-col overflow-y-auto w-full h-full max-w-xl mx-auto shadow-lg">
            <div className="relative aspect-square">
              {!partyData?.backgroundPhoto ? (
                <Image
                  src={"/backgroundImage.jpg"}
                  fill
                  alt=""
                  className="object-cover brightness-50"
                />
              ) : (
                backgroundPhotoUrl && (
                  <Image
                    src={`${backgroundPhotoUrl}`}
                    fill
                    alt=""
                    className="object-cover brightness-50"
                  />
                )
              )}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
                <h1 className="text-4xl text-white drop-shadow-2xl font-bold w-full break-words text-center">
                  {partyData?.title}
                </h1>
                {mainPhotoUrl && (
                  <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-lg drop-shadow-lg">
                    <Image
                      src={`${mainPhotoUrl}`}
                      alt=""
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 items-center justify-between gap-3 p-2">
              <div className="drop-shadow-lg">
                <Button variant="outline" className="w-full" size="lg">
                  <MessageCircleHeart />
                  Ostavite poruku organizatoru
                </Button>
              </div>
              <div className="drop-shadow-lg">
                <Button
                  size="lg"
                  className="w-full"
                  style={{ backgroundColor: partyData.settings.themeColor }}
                >
                  <ImageIcon />
                  Dodajte slike u album
                </Button>
              </div>
            </div>
            {partyData?.message && (
              <div className="drop-shadow-lg p-3 space-y-2 pb-6">
                <h2 className="text-xl font-bold">Poruka od organizatora</h2>
                <p className="break-words">{partyData.message}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ApperancePageEditDesignPreview;
