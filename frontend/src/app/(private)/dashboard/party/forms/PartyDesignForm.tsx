import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useEffect, useState } from "react";
import { PartyInfoSchema, PartyInfoValues } from "@/lib/validation";
import { PartyPropsForm } from "@/lib/types";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CalendarIcon, ImageIcon, MessageCircleHeart } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { AutosizeTextarea } from "@/components/ui/autosize-textarea";

function PartyDesignForm({ partyData, setPartyData }: PartyPropsForm) {
  const form = useForm<PartyInfoValues>({
    resolver: zodResolver(PartyInfoSchema),
    defaultValues: {
      title: partyData?.title || "",
      dateEndTime: partyData?.dateEndTime || "",
      message: partyData.message || "",
    },
  });
  const [mainPhotoSrc, setMainPhotoSrc] = useState(
    partyData?.mainPhoto instanceof File ? "" : partyData?.mainPhoto
  );
  const [backgroundPhotoSrc, setBackgroundPhotoSrc] = useState(
    partyData?.backgroundPhoto instanceof File ? "" : partyData?.backgroundPhoto
  );

  useEffect(() => {
    const objectUrl =
      partyData?.mainPhoto instanceof File
        ? URL.createObjectURL(partyData?.mainPhoto)
        : "";
    if (objectUrl) setMainPhotoSrc(objectUrl);
    if (partyData?.mainPhoto === null) setMainPhotoSrc("");
    return () => URL.revokeObjectURL(objectUrl);
  }, [partyData?.mainPhoto]);

  useEffect(() => {
    const objectUrl =
      partyData?.backgroundPhoto instanceof File
        ? URL.createObjectURL(partyData?.backgroundPhoto)
        : "";
    if (objectUrl) setBackgroundPhotoSrc(objectUrl);
    if (partyData?.backgroundPhoto === null) setBackgroundPhotoSrc("");
    return () => URL.revokeObjectURL(objectUrl);
  }, [partyData?.backgroundPhoto]);

  useEffect(() => {
    const { unsubscribe } = form.watch(async (values) => {
      const isValid = await form.trigger();
      if (!isValid) return;
      setPartyData({ ...partyData, ...values });
    });
    return unsubscribe;
  }, [form, partyData, setPartyData]);

  return (
    <div className="overflow-y-auto h-full space-y-6">
      <div className="space-y-1.5 text-center">
        <h2 className="text-2xl font-semiboold">Dizajn stranice za proslavu</h2>
        <p className="text-sm text-muted-foreground">
          Stranica ce biti prikazana kada korisnik skenira QR kod
        </p>
      </div>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <Form {...form}>
          <form className="flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="space-y-0">
                    <FormLabel>Naziv proslave</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dateEndTime"
                render={({ field }) => (
                  <FormItem className="flex flex-col self-end space-y-1">
                    <FormLabel>Datum pocetka proslave</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={
                            field.value ? new Date(field.value) : undefined
                          }
                          onSelect={(date) =>
                            field.onChange(date ? date.toISOString() : null)
                          }
                          disabled={(date) =>
                            date < new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <FormField
                control={form.control}
                name="backgroundPhoto"
                render={({ field: { value, ...fieldValues } }) => (
                  <FormItem className="space-y-0">
                    <FormLabel>Pozadinska slika</FormLabel>
                    <FormControl>
                      <Input
                        {...fieldValues}
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          fieldValues.onChange(file);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="mainPhoto"
                render={({ field: { value, ...fieldValues } }) => (
                  <FormItem className="space-y-0">
                    <FormLabel>Slika</FormLabel>
                    <FormControl>
                      <Input
                        {...fieldValues}
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          fieldValues.onChange(file);
                        }}
                      />
                    </FormControl>
                    <FormDescription>
                      <span className="text-red-500">*</span>
                      Slika nije obavezna
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem className="space-y-0">
                  <FormLabel>Poruka gostima</FormLabel>
                  <FormControl>
                    <AutosizeTextarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
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
                  <Image
                    src={backgroundPhotoSrc || "/backgroundImage.jpg"}
                    fill
                    alt=""
                    className="object-cover brightness-50"
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
                    <h1 className="text-4xl text-white drop-shadow-2xl font-bold w-full break-words text-center">
                      {partyData?.title === "" ? "" : partyData?.title}
                    </h1>
                    {mainPhotoSrc && (
                      <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-lg drop-shadow-lg">
                        <Image
                          src={mainPhotoSrc}
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
                    <Button size="lg" className="w-full">
                      <ImageIcon />
                      Dodajte slike u album
                    </Button>
                  </div>
                </div>
                {partyData?.message && (
                  <div className="drop-shadow-lg p-3 space-y-2 pb-6">
                    <h2 className="text-xl font-bold">
                      Poruka od organizatora
                    </h2>
                    <p>{partyData?.message}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* <div className="w-full space-y-3">
          <div className="space-y-1.5 text-center">
            <h2 className="text-2xl font-semiboold">Prikaz dizajna stranice</h2>
            <p className="text-sm text-muted-foreground">
              Dizajn koji ce biti prikazan nakon skeniranja QR koda
            </p>
          </div>
          <div className="relative">
            <div className="relative aspect-square">
              <Image
                src="/backgroundImage.jpg"
                fill
                alt=""
                className="object-cover brightness-90"
              />
              <div className="absolute top-8 right-5">
                <Button variant="outline" size="lg">
                  <ImageIcon />
                  Album
                </Button>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <h1 className="text-4xl text-white drop-shadow-2xl font-bold w-full break-words text-center">
                  Dobrodošli na novogodišnju žurku
                </h1>
              </div>
            </div>
            <div className="grid grid-cols-1 items-center justify-between gap-3 p-2">
              <div className="drop-shadow-lg">
                <Button variant="secondary" className="w-full" size="lg">
                  <MessageCircleHeart />
                  Ostavite poruku organizatoru
                </Button>
              </div>
              <div className="drop-shadow-lg">
                <Button variant="secondary" size="lg" className="w-full">
                  <ImageIcon />
                  Dodajte slike u album
                </Button>
              </div>
            </div>
            <div className="drop-shadow-lg p-2 space-y-2 pb-6">
              <h2 className="text-xl font-bold">Poruka od organizatora</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Inventore quod esse corporis vero officiis numquam blanditiis
                dolorum? Dicta sunt corporis voluptate similique iusto velit,
                dolor atque nemo, odio eius quod.
              </p>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default PartyDesignForm;
