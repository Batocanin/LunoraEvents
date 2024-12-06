import {
  Cake,
  Gift,
  Camera,
  MessageCircle,
  Heart,
  Droplets,
  Image as ImageIcon,
} from "lucide-react";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { FloatingHearts } from "./Hearts";
import { Confetti } from "./Confetti";
import { FloatingBubbles } from "./Bubbles";
import { PartyValues } from "@/lib/validation";

export function BirthdayPartyDesign1({
  partyData,
}: {
  partyData: PartyValues;
}) {
  const {
    title,
    message,
    organizer,
    photo,
    titleColorHex,
    buttonBackgroundHex,
    backgroundColorHex,
  } = partyData;
  const [showHearts, setShowHearts] = useState(false);
  const [photoSrc, setPhotoSrc] = useState(photo instanceof File ? "" : photo);

  useEffect(() => {
    const objectUrl = photo instanceof File ? URL.createObjectURL(photo) : "";
    if (objectUrl) setPhotoSrc(objectUrl);
    if (photo === null) setPhotoSrc("");
    return () => URL.revokeObjectURL(objectUrl);
  }, [photo]);

  useEffect(() => {
    setShowHearts(true);
    const timeout = setTimeout(() => setShowHearts(false), 5000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      className="relative overflow-hidden select-none p-3 h-full"
      style={{ background: backgroundColorHex }}
    >
      <Card className="max-w-md mx-auto overflow-hidden backdrop-blur-sm">
        {showHearts && <FloatingHearts />}
        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center -translate-y-10 z-10">
            <motion.div
              className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-lg"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Image
                src="/weddingMainImage.jpg"
                alt="Bride and Groom"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
          <div className="relative">
            <Image
              src={photoSrc || "/weddingBackgroundImage.jpg"}
              alt="Wedding celebration"
              width={400}
              height={300}
              className="w-full h-80 filter blur-sm"
            />
          </div>
          <div className="absolute inset-0 flex items-end justify-center p-4">
            <motion.h1
              className="text-3xl font-bold text-center"
              style={{ color: partyData?.titleColorHex }}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{
                y: 0,
                opacity: 1,
                transition: { duration: 0.5 },
              }}
            >
              {title || "Dobrodošli na naše venčanje!"}
            </motion.h1>
          </div>
        </div>
        <CardContent className="space-y-4 p-6">
          <div className="grid grid-cols-2 gap-2">
            <Button
              className="flex-1"
              variant="outline"
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              <MessageCircle className="mr-2" size={18} />
              <span className="hidden md:flex">Ostavi poruku</span>
            </Button>
            <Button
              className="flex-1"
              style={{
                background: partyData?.buttonBackgroundHex,
              }}
              onClick={(e) => e.preventDefault()}
            >
              <ImageIcon className="mr-2" size={18} />
              <span className="hidden md:flex">Galerija</span>
            </Button>
          </div>
          <Card className="p-4">
            <p>
              {message ||
                "Dragi gosti, presrećni smo što ćete biti deo našeg posebnog dana. Vaša ljubav i podrška znače nam sve. Jedva čekamo da proslavimo našu ljubav sa vama!"}
            </p>
            <p className="text-right text-sm text-muted-foreground mt-2">
              {(organizer && `- ${organizer}`) || "- Dusan & Ivana"}
            </p>
          </Card>
        </CardContent>
        <motion.div
          className="absolute top-4 left-4"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        >
          <Heart size={32} className="text-rose-500 fill-rose-500" />
        </motion.div>
      </Card>
    </div>
  );
}

export function BirthdayPartyDesign2({
  partyData,
}: {
  partyData: PartyValues;
}) {
  const [showConfetti, setShowConfetti] = useState(false);
  const {
    title,
    message,
    organizer,
    photo,
    titleColorHex,
    buttonBackgroundHex,
    backgroundColorHex,
  } = partyData;
  const [photoSrc, setPhotoSrc] = useState(photo instanceof File ? "" : photo);

  useEffect(() => {
    const objectUrl = photo instanceof File ? URL.createObjectURL(photo) : "";
    if (objectUrl) setPhotoSrc(objectUrl);
    if (photo === null) setPhotoSrc("");
    return () => URL.revokeObjectURL(objectUrl);
  }, [photo]);

  useEffect(() => {
    setShowConfetti(true);
    const timeout = setTimeout(() => setShowConfetti(false), 5000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      className="relative overflow-hidden select-none p-3 h-full"
      style={{ background: backgroundColorHex }}
    >
      <Card className="relative max-w-md mx-auto overflow-hidden">
        {showConfetti && <Confetti />}
        <div className="relative">
          <div className="relative">
            <Image
              src={photoSrc || "/weddingBackgroundImage.jpg"}
              alt="Wedding celebration"
              width={400}
              height={300}
              className="w-full h-80 filter blur-sm"
            />
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 left-0 flex w-full items-end justify-center p-4">
            <motion.h1
              className="text-3xl font-bold text-center break-words"
              style={{ color: partyData?.titleColorHex }}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{
                y: 0,
                opacity: 1,
                transition: { duration: 0.5 },
              }}
            >
              {title || " Dobrodošli na moj rodjendan!"}
            </motion.h1>
          </div>
        </div>
        <CardContent className="space-y-4 p-6">
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              className="flex-1"
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              <Gift className="mr-2" size={18} />
              <span className="hidden md:flex">Ostavi poruku</span>
            </Button>
            <Button
              className="flex-1"
              style={{
                background: partyData?.buttonBackgroundHex,
              }}
              onClick={(e) => e.preventDefault()}
            >
              <ImageIcon className="mr-2" size={18} />
              <span className="hidden md:flex">Galerija</span>
            </Button>
          </div>
          <Card className="p-4">
            <p>
              {message ||
                "Dragi prijatelji, uzbuđen sam što ćemo zajedno proslaviti moj poseban dan! Vaše prisustvo je najbolji poklon. Jedva čekam da stvorimo nezaboravne uspomene!"}
            </p>
            <p className="text-right text-sm text-muted-foreground mt-2">
              {(organizer && `- ${partyData.organizer}`) || "- Dusan"}
            </p>
          </Card>
        </CardContent>
        <motion.div
          className="absolute bottom-4 left-4"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        >
          <Cake size={48} className="stroke-primary" />
        </motion.div>
      </Card>
    </div>
  );
}

export function BirthdayPartyDesign3({
  partyData,
}: {
  partyData: PartyValues;
}) {
  const {
    title,
    message,
    organizer,
    photo,
    titleColorHex,
    buttonBackgroundHex,
    backgroundColorHex,
  } = partyData;
  const [showBubbles, setShowBubbles] = useState(false);
  const [photoSrc, setPhotoSrc] = useState(photo instanceof File ? "" : photo);

  useEffect(() => {
    const objectUrl = photo instanceof File ? URL.createObjectURL(photo) : "";
    if (objectUrl) setPhotoSrc(objectUrl);
    if (photo === null) setPhotoSrc("");
    return () => URL.revokeObjectURL(objectUrl);
  }, [photo]);

  useEffect(() => {
    setShowBubbles(true);
    const timeout = setTimeout(() => setShowBubbles(false), 5000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      className="relative overflow-hidden select-none p-3 h-full"
      style={{ background: backgroundColorHex }}
    >
      <Card className="max-w-md mx-auto overflow-hidden backdrop-blur-sm">
        {showBubbles && <FloatingBubbles />}
        <div className="relative">
          <Image
            src={photoSrc || "/weddingBackgroundImage.jpg"}
            alt="Wedding celebration"
            width={400}
            height={300}
            className="w-full h-80 filter"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white/30 backdrop-blur-sm to-transparent flex items-center justify-center">
            <motion.h1
              className="text-3xl font-bold text-center drop-shadow-lg"
              style={{ color: partyData?.titleColorHex }}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{
                y: 0,
                opacity: 1,
                transition: { duration: 0.5 },
              }}
            >
              {title || "Dobrodošli na krštenje!"}
            </motion.h1>
          </div>
        </div>
        <CardContent className="space-y-4 p-6">
          <div className="flex justify-center -mt-32 mb-4">
            <motion.div
              className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-lg"
              initial={{ scale: 0 }}
              whileInView={{
                scale: 1,
                transition: { duration: 0.5 },
              }}
            >
              <Image
                src="/weddingMainImage.jpg"
                alt="Baby"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
          <div className="flex space-x-2">
            <Button
              className="flex-1"
              variant="outline"
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              <MessageCircle className="mr-2" size={18} />
              <span className="hidden md:flex">Ostavi poruku</span>
            </Button>
            <Button
              className="flex-1"
              style={{
                background: partyData?.buttonBackgroundHex,
              }}
              onClick={(e) => e.preventDefault()}
            >
              <Camera className="mr-2" size={18} />
              <span className="hidden md:flex">Galerija</span>
            </Button>
          </div>
          <Card className="p-4">
            <p>
              {message ||
                "Dragi prijatelji i porodico, radosni smo što ćete biti uz nas na ovom posebnom danu kada naše dete prima blagoslov krštenja. Vaše prisustvo čini ovaj dan još značajnijim."}
            </p>
            <p className="text-right text-sm text-muted-foreground mt-2">
              {(organizer && `- ${partyData.organizer}`) || "- Dusan & Ivana"}
            </p>
          </Card>
        </CardContent>
        <motion.div
          className="absolute bottom-4 left-4"
          animate={{
            y: [0, -10, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Droplets size={48} className="text-sky-400" />
        </motion.div>
      </Card>
    </div>
  );
}
