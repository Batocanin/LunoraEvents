"use server";

import { Button } from "@/components/ui/button";
import { ImageIcon, MessageCircleHeart } from "lucide-react";
import Image from "next/image";

async function page({ params }: { params: Promise<{ partyId: string }> }) {
  const { partyId } = await params;
  return (
    <div className="md:py-12 h-full min-h-dvh">
      <div className="relative flex flex-col w-full h-full max-w-xl mx-auto shadow-lg">
        <div className="relative aspect-square">
          <Image
            src="/backgroundImage.jpg"
            fill
            alt=""
            className="object-cover brightness-75"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
            <h1 className="text-4xl text-white drop-shadow-2xl font-bold w-full break-words text-center">
              Dobrodošli na rodjendan kod Nikoline
            </h1>
            <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-lg drop-shadow-lg">
              <Image src="/person.jpg" alt="" fill className="object-cover" />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-between gap-3 p-2">
          <div className="drop-shadow-lg">
            <Button variant="outline" className="w-full" size="lg">
              <MessageCircleHeart />
              Ostavite poruku organizatoru
            </Button>
          </div>
          <div className="drop-shadow-lg">
            <Button size="lg" className="w-full">
              <ImageIcon />
              Dodajte slike u album
            </Button>
          </div>
        </div>
        <div className="drop-shadow-lg p-3 space-y-2 pb-6">
          <h2 className="text-xl font-bold">Poruka od organizatora</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore
            quod esse corporis vero officiis numquam blanditiis dolorum? Dicta
            sunt corporis voluptate similique iusto velit, dolor atque nemo,
            odio eius quod.
          </p>
        </div>
      </div>
    </div>
  );
}

export default page;
