import { AutosizeTextarea } from "@/components/ui/autosize-textarea";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import usePhotoUrl from "@/hooks/usePhotoUrl";
import { cn } from "@/lib/utils";
import {
  PartyInfoSchema,
  PartyInfoValues,
  PartyValues,
} from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

interface PartyCreateDesignFormProps {
  form: ReturnType<typeof useForm<PartyInfoValues>>;
  formData: PartyValues;
  setFormData: React.Dispatch<React.SetStateAction<PartyValues>>;
  setMainPhotoUrl: React.Dispatch<React.SetStateAction<string | undefined>>;
  setBackgroundPhotoUrl: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
}

function PartyCreateDesignForm({
  form,
  formData,
  setFormData,
  setMainPhotoUrl,
  setBackgroundPhotoUrl,
}: PartyCreateDesignFormProps) {
  useEffect(() => {
    const subscription = form.watch((values) =>
      setFormData({ ...values, dateEndTime: values?.dateEndTime || "" })
    );
    return () => subscription.unsubscribe();
  }, [form]);

  usePhotoUrl(formData?.mainPhoto, setMainPhotoUrl);
  usePhotoUrl(formData?.backgroundPhoto, setBackgroundPhotoUrl);

  return (
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
                <Popover modal={true}>
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
                      selected={field.value ? new Date(field.value) : undefined}
                      onSelect={(date) =>
                        field.onChange(date && date.toISOString())
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
  );
}

export default PartyCreateDesignForm;
