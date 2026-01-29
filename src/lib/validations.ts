// Datei: src/lib/validations.ts  <-- NEUER NAME!
import { z } from "zod";
import { useTranslations } from "next-intl";
const t = useTranslations("Auth");

export const emailSchema = z.string().email("Ungültige E-Mail-Adresse").min(5).max(255);
export const passwordSchema = z.string().min(8, "Passwort muss mind. 8 Zeichen haben").max(100);
export const nameSchema = z.string().min(2, "Name zu kurz").max(50, "Name zu lang").optional();

export const registerSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
});

export const updateProfileSchema = z.object({
  name: z.string().min(2, "Name zu kurz").max(50, "Name zu lang"),
});

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Passwort fehlt"),
});