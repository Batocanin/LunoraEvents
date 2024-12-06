import { z } from "zod";

export const authSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export type authValues = z.infer<typeof authSchema>;
