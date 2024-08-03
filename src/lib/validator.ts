import { z } from "zod";

export const loginScheme = z.object({
  userName: z.string(),
  password: z.string(),
});

export type LoginData = z.infer<typeof loginScheme>;

export const studentScheme = z.object({
  firstName: z.string().min(3, { message: "Enter at least 3 letters" }),
  lastName: z.string().min(3, { message: "Enter at least 3 letters" }),
  birthDate: z.string(),
  city: z.string(),
  country: z.string(),
  phone: z.string(),
  grade: z.string(),
  gender: z.string(),
  remarks: z.string().optional(),
});

export type StudentSchemeData = z.infer<typeof studentScheme>;
