// Datei: src/env.ts
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

/**
 * Zentrale Umgebungsvariablen-Validierung.
 * 
 * Wenn eine Variable fehlt oder falsch formatiert ist,
 * crasht die App SOFORT beim Start mit einer klaren Fehlermeldung.
 * 
 * Das ist besser als ein kryptischer Fehler um 3 Uhr nachts in Production.
 */
export const env = createEnv({
  // ===================
  // SERVER-VARIABLEN
  // ===================
  // Diese sind NUR auf dem Server verfügbar (API Routes, Server Components)
  server: {
    // === DATABASE ===
    TURSO_DATABASE_URL: z
      .string()
      .url("TURSO_DATABASE_URL muss eine gültige URL sein"),
    TURSO_AUTH_TOKEN: z
      .string()
      .min(1, "TURSO_AUTH_TOKEN fehlt"),

    // === AUTH ===
    NEXTAUTH_SECRET: z
      .string()
      .min(32, "NEXTAUTH_SECRET muss mindestens 32 Zeichen haben"),
    NEXTAUTH_URL: z
      .string()
      .url("NEXTAUTH_URL muss eine gültige URL sein"),

    // === OAUTH (Optional - nur wenn aktiviert) ===
    GOOGLE_CLIENT_ID: z.string().optional(),
    GOOGLE_CLIENT_SECRET: z.string().optional(),
    GITHUB_CLIENT_ID: z.string().optional(),
    GITHUB_CLIENT_SECRET: z.string().optional(),

    // === STRIPE ===
    STRIPE_SECRET_KEY: z
      .string()
      .startsWith("sk_", "STRIPE_SECRET_KEY muss mit 'sk_' beginnen"),
    STRIPE_WEBHOOK_SECRET: z
      .string()
      .startsWith("whsec_", "STRIPE_WEBHOOK_SECRET muss mit 'whsec_' beginnen"),

    // === EMAIL ===
    RESEND_API_KEY: z
      .string()
      .startsWith("re_", "RESEND_API_KEY muss mit 're_' beginnen"),

    // === SENTRY (Optional) ===
    SENTRY_DSN: z.string().url().optional(),
  },

  // ===================
  // CLIENT-VARIABLEN
  // ===================
  // Diese sind im Browser sichtbar! Keine Secrets hier.
  client: {
    NEXT_PUBLIC_URL: z
      .string()
      .url("NEXT_PUBLIC_URL muss eine gültige URL sein"),
    
    // Stripe Public Keys
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z
      .string()
      .startsWith("pk_", "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY muss mit 'pk_' beginnen"),
    NEXT_PUBLIC_STRIPE_PRICE_MONTHLY: z
      .string()
      .startsWith("price_", "NEXT_PUBLIC_STRIPE_PRICE_MONTHLY muss mit 'price_' beginnen"),
    NEXT_PUBLIC_STRIPE_PRICE_YEARLY: z
      .string()
      .startsWith("price_", "NEXT_PUBLIC_STRIPE_PRICE_YEARLY muss mit 'price_' beginnen")
      .optional(),

    // === SENTRY (Optional) ===
    NEXT_PUBLIC_SENTRY_DSN: z.string().url().optional(),
  },

  // ===================
  // RUNTIME VALUES
  // ===================
  // Mapping für Next.js (notwendig wegen Tree Shaking)
  runtimeEnv: {
    // Server
    TURSO_DATABASE_URL: process.env.TURSO_DATABASE_URL,
    TURSO_AUTH_TOKEN: process.env.TURSO_AUTH_TOKEN,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    SENTRY_DSN: process.env.SENTRY_DSN,
    // Client
    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    NEXT_PUBLIC_STRIPE_PRICE_MONTHLY: process.env.NEXT_PUBLIC_STRIPE_PRICE_MONTHLY,
    NEXT_PUBLIC_STRIPE_PRICE_YEARLY: process.env.NEXT_PUBLIC_STRIPE_PRICE_YEARLY,
    NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
  },

  // ===================
  // OPTIONEN
  // ===================
  // Überspringt Validierung während des Builds (für CI/CD ohne echte Secrets)
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  
  // Erlaubt leere Strings für optionale Variablen
  emptyStringAsUndefined: true,
});
