"use client";

import { ImageIcon, Loader2, MessageCircleHeart } from "lucide-react";
import useGetAllParties from "../hooks/useGetAllParties";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function PartyList() {
  const { data, isPending, isError } = useGetAllParties();

  if (isPending) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-full">
        <p>
          Dogodila se greška, pokušajte ponovo kasnije ili nas kontaktirajte!
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 place-items-center gap-2">
        {data.map((party) => {
          return (
            <Link
              href={`/dashboard/party/${party.id}`}
              key={party.id}
              className="relative my-4 select-none"
              style={{ width: `${375 * 0.7}px`, height: `${667 * 0.75}px` }}
            >
              <div className="border-8 border-black dark:border-white rounded-3xl overflow-hidden transform scale-[.7] origin-top-left w-[375px] h-[667px] pointer-events-none">
                <div className="relative flex flex-col overflow-y-auto w-full h-full max-w-xl mx-auto shadow-lg">
                  <div className="relative aspect-square">
                    {party.backgroundPhoto && (
                      <Image
                        unoptimized
                        src={`${process.env.NEXT_PUBLIC_S3_URL}/${party.backgroundPhoto}`}
                        fill
                        alt=""
                        className="object-cover brightness-50"
                      />
                    )}
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
                      <h1 className="text-4xl text-white drop-shadow-2xl font-bold w-full break-words text-center">
                        {party?.title}
                      </h1>
                      {party.mainPhoto && (
                        <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-lg drop-shadow-lg">
                          <Image
                            src={`${process.env.NEXT_PUBLIC_S3_URL}/${party.mainPhoto}`}
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
                        style={{ backgroundColor: party?.settings?.themeColor }}
                      >
                        <ImageIcon />
                        Dodajte slike u album
                      </Button>
                    </div>
                  </div>
                  {party?.message && (
                    <div className="drop-shadow-lg p-3 space-y-2 pb-6">
                      <h2 className="text-xl font-bold">
                        Poruka od organizatora
                      </h2>
                      <p className="break-words">{party.message}</p>
                    </div>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}

export default PartyList;
