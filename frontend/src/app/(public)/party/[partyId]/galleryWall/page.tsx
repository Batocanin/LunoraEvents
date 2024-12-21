import Image from "next/image";

function page() {
  return (
    <div className="grid place-items-center h-dvh overflow-hidden">
      <div className="relative aspect-square h-95">
        <Image
          src="/backgroundImage.jpg"
          fill
          alt=""
          className="object-contain"
        />
      </div>
    </div>
  );
}

export default page;
