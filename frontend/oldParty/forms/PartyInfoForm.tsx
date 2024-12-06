import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PartyPropsForm } from "@/lib/types";
import { PartyInfoSchema, PartyInfoValues } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

function PartyInfoForm({ partyData, setPartyData }: PartyPropsForm) {
  const form = useForm<PartyInfoValues>({
    resolver: zodResolver(PartyInfoSchema),
    defaultValues: {
      title: partyData?.title || "",
      message: partyData?.message || "",
      organizer: partyData?.organizer || "",
    },
  });

  useEffect(() => {
    const { unsubscribe } = form.watch(async (values) => {
      const isValid = await form.trigger();
      if (!isValid) return;
      setPartyData({ ...partyData, ...values });
    });
    return unsubscribe;
  }, [form, partyData, setPartyData]);

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="space-y-1.5 text-center">
        <h2 className="text-2xl font-semiboold">
          Glavne informacije za proslavu
        </h2>
        <p className="text-sm text-muted-foreground">
          Popunite sva polja. Ovi podaci ce biti prikazani na vasoj stranici
          proslave
        </p>
      </div>
      <Form {...form}>
        <form className="space-y-3">
          <FormField
            control={form.control}
            name="photo"
            render={({ field: { value, ...fieldValues } }) => (
              <FormItem>
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
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-2">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Naslov</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Dobrodosli na rodjendan kod Luke"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="organizer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Organizator</FormLabel>
                  <FormControl>
                    <Input placeholder="Dusan & Ivana" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Poruka</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Hvala Vam sto ste dosli..."
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}

export default PartyInfoForm;
