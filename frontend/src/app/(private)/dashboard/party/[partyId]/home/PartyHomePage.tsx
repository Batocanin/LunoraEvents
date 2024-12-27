import { Button } from "@/components/ui/button";
import { Party } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import useDownloadPartyPhoto from "../../shared/hooks/useDownloadPartyPhoto";

function PartyHomePage({ partyData }: { partyData: Party }) {
  const { id: partyId, title } = partyData;
  const partyPageUrl = `${process.env.NEXT_PUBLIC_BASE_APP_URL}/party/${partyId}`;

  const useDownloadPartyPhotoMutation = useDownloadPartyPhoto(partyId);

  return (
    <div className="space-y-8">
      <div className="space-y-1 mt-6">
        <h1 className="text-2xl font-bold">{title}</h1>
        <div className="w-fit px-2 py-0.5 rounded-2xl bg-primary text-primary-foreground font-semibold ">
          <p className="text-xs">Free plan</p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-primary/90 text-primary-foreground px-6 py-4 drop-shadow-lg rounded-lg space-y-4">
          <h2 className="font-bold text-2xl">Vaš Digitalni Album</h2>
          <p>
            Digitalni album omogućava vašim gostima da otpreme nove fotografije
            ili pregledaju postojeće. Podelite ga sa svojim gostima putem
            direktnog linka ili jedinstvenog QR koda (možete ga odštampati ili
            prikazati digitalno).
          </p>
          <div className="w-fit p-4 flex flex-wrap gap-3 items-center justify-center bg-primary rounded-lg">
            <Link
              className="font-medium bg-primary-foreground text-primary p-3 rounded-lg"
              href={partyPageUrl}
            >{`app.lunoraevents.com/${partyId}`}</Link>
            <div className="space-x-4">
              <Button
                variant="secondary"
                onClick={() => navigator.clipboard.writeText(partyPageUrl)}
              >
                Kopiraj
              </Button>
              <Button variant="ghost" asChild>
                <Link href={partyPageUrl} target="_blank">
                  Otvori
                </Link>
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 items-center">
            <div className="flex flex-col items-center gap-4">
              <div className="p-1.5 rounded-lg bg-white w-fit">
                <div className="relative aspect-square w-32">
                  <Image
                    unoptimized
                    src={`${process.env.NEXT_PUBLIC_S3_URL}/party/${partyId}/QRCode`}
                    fill
                    alt=""
                  />
                </div>
              </div>
              <Button
                className="shadow-lg"
                onClick={() =>
                  useDownloadPartyPhotoMutation.mutate({
                    key: `party/${partyId}/QRCode`,
                    type: "image/png",
                  })
                }
              >
                Skini QR kod
              </Button>
            </div>
            <div
              className="relative mx-auto my-4"
              style={{ width: `${325 * 0.6}px`, height: `${667 * 0.5}px` }}
            >
              <div className="rounded-3xl overflow-hidden transform scale-[.5] origin-top-left w-[375px] h-[667px]">
                <Image src="/phone.png" fill alt="" />
                <div className="relative flex flex-col overflow-y-auto w-full h-full max-w-xl mx-auto shadow-lg">
                  <iframe
                    src={partyPageUrl}
                    className="h-full w-full p-[17px] rounded-[49px]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-primary/90 text-primary-foreground px-6 py-4 drop-shadow-lg rounded-lg space-y-4">
          <h2 className="font-bold text-2xl">Vaš Digitalni Album</h2>
          <p>
            Digitalni album omogućava vašim gostima da otpreme nove fotografije
            ili pregledaju postojeće. Podelite ga sa svojim gostima putem
            direktnog linka ili jedinstvenog QR koda (možete ga odštampati ili
            prikazati digitalno).
          </p>
          <div className="w-fit p-4 flex flex-wrap gap-3 items-center justify-center bg-primary rounded-lg">
            <Link
              className="font-medium bg-primary-foreground text-primary p-3 rounded-lg"
              href={partyPageUrl}
            >{`app.lunoraevents.com/${partyId}`}</Link>
            <div className="space-x-4">
              <Button
                variant="secondary"
                onClick={() => navigator.clipboard.writeText(partyPageUrl)}
              >
                Kopiraj
              </Button>
              <Button variant="ghost" asChild>
                <Link href={partyPageUrl} target="_blank">
                  Otvori
                </Link>
              </Button>
            </div>
          </div>
          <div className="border-8 border-black rounded-3xl overflow-hidden transform  w-full max-w-[550px] h-[300px]">
            <div className="relative flex flex-col overflow-y-auto w-full h-full shadow-lg">
              <iframe
                src={partyPageUrl}
                className="h-full w-full rounded-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PartyHomePage;
