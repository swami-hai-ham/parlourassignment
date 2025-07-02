import z from "zod";
import { Role } from "@prisma/client";
import { email } from "zod/v4";

export const loginInput = z.object({
  email: z.string().email().max(50),
  password: z.string().min(6).max(20)
});
