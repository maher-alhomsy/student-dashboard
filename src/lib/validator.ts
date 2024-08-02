import { z } from "zod";

export const loginScheme = z.object({
  userName: z.string(),
  password: z.string(),
});

export type LoginData = z.infer<typeof loginScheme>;
