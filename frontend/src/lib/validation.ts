import { z } from "zod";

export const optionalString = z.string().trim().optional().or(z.literal(""));

export const PartyInfoSchema = z.object({
  mainPhoto: z.custom<File | string | undefined>(),
  backgroundPhoto: z.custom<File | string | undefined>(),
  title: z.string().trim().optional(),
  message: z.string().trim().optional(),
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
  dateEndTime: string;
  id?: string;
};
