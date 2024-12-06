import { z } from "zod";

export const optionalString = z.string().trim().optional().or(z.literal(""));

export const PartyInfoSchema = z.object({
  mainPhoto: z.custom<File>().refine((file) => {
    return (
      !file || (file instanceof File && file.type.startsWith("image/")),
      "Must be an image file"
    );
  }),
  backgroundPhoto: z
    .custom<File>()
    .refine(
      (file) =>
        !file || (file instanceof File && file.type.startsWith("image/")),
      "Slika je obavezna."
    ),
  title: z.string().trim(),
  message: z.string().trim(),
  dateEndTime: z.string().trim(),
});

export type PartyInfoValues = z.infer<typeof PartyInfoSchema>;

export const PartySchema = z.object({
  ...PartyInfoSchema.shape,
});

export type PartyValues = Partial<
  Omit<z.infer<typeof PartySchema>, "mainPhoto, backgroundPhoto">
> & {
  mainPhoto?: File | string | null;
  backgroundPhoto?: File | string | null;
  id?: string;
  dateEndTime: string;
  title: string;
};
