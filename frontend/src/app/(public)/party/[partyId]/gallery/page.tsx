import { Button } from "@/components/ui/button";
import { Camera, Heart } from "lucide-react";
import Image from "next/image";
import GalleryImage from "./GalleryImage";

const images = [
  {
    id: 1,
    src: "/slike/1.jpg",
    width: 6000,
    height: 4000,
  },
  {
    id: 2,
    src: "/slike/2.jpg",
    width: 3840,
    height: 2563,
  },
  {
    id: 3,
    src: "/slike/3.jpg",
    width: 3600,
    height: 2392,
  },
  {
    id: 4,
    src: "/slike/4.jpg",
    width: 6000,
    height: 4000,
  },
  {
    id: 5,
    src: "/slike/5.jpg",
    width: 6774,
    height: 4492,
  },
  {
    id: 6,
    src: "/slike/6.jpg",
    width: 4480,
    height: 6720,
  },
  {
    id: 7,
    src: "/slike/7.jpg",
    width: 4800,
    height: 3200,
  },
  {
    id: 8,
    src: "/slike/8.jpg",
    width: 2880,
    height: 4032,
  },
  {
    id: 9,
    src: "/slike/9.jpg",
    width: 5523,
    height: 3675,
  },
  {
    id: 10,
    src: "/slike/6.jpg",
    width: 4480,
    height: 6720,
  },
  {
    id: 11,
    src: "/slike/6.jpg",
    width: 4480,
    height: 6720,
  },
  {
    id: 12,
    src: "/slike/7.jpg",
    width: 4800,
    height: 3200,
  },
];

function page() {
  return (
    <div>
      <div className="relative h-96 bg-[url('/weddingBackgroundImage.jpg')] bg-cover bg-no-repeat">
        <div className="bg-black/30 h-full w-full absolute top-0 left-0" />
        <div className="relative flex flex-col items-center justify-center h-full gap-5">
          <div className="relative h-32 aspect-square">
            <Image
              src="/weddingMainImage.jpg"
              alt=""
              fill
              className="rounded-full border-2 border-white object-cover"
            />
          </div>
          <h1 className="text-2xl  text-white font-bold">
            Dusan & Ivana
            <Heart className="inline-block ml-1 fill-white" />
          </h1>
          <Button size="lg">
            <Camera />
            <p>Upload sliku / video</p>
          </Button>
        </div>
      </div>
      <div className="grid auto-rows-[10px] px-1 my-3 grid-cols-[repeat(auto-fit,minmax(170px,1fr))] sm:grid-cols-[repeat(auto-fit,minmax(250px,1fr))] lg:grid-cols-[repeat(auto-fit,minmax(350px,1fr))]">
        {images.map((image) => {
          return <GalleryImage key={image.id} photo={image} />;
        })}
      </div>
    </div>
  );
}

export default page;
