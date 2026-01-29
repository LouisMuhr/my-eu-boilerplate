// Datei: src/lib/schema.ts
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";


export const users = sqliteTable("users", {
  id: text("id").primaryKey(), // Wir behalten deine UUIDs
  name: text("name"),
  email: text("email").notNull().unique(),
  password: text("password"),
  emailVerified: integer("emailVerified", { mode: "boolean" }).default(false), // NEU
  stripeCustomerId: text("stripeCustomerId"),
  subscriptionStatus: text("subscriptionStatus").default("free"),
  cancelAtPeriodEnd: integer("cancelAtPeriodEnd", { mode: "boolean" }).default(false),
  currentPeriodEnd: text("currentPeriodEnd"),
});

export const sessions = sqliteTable("sessions", {
  id: text("id").primaryKey(),
  sessionToken: text("sessionToken").notNull().unique(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: integer("expires", { mode: "timestamp_ms" }).notNull(), // NextAuth nutzt oft Date/Timestamp
});

export const passwordResetTokens = sqliteTable("password_reset_tokens", {
  id: text("id").primaryKey(),
  email: text("email").notNull(),
  token: text("token").notNull().unique(),
  expires: text("expires").notNull(), // ISO String
});

export const verificationTokens = sqliteTable("verification_tokens", {
  id: text("id").primaryKey(),
  email: text("email").notNull(),
  token: text("token").notNull().unique(),
  expires: text("expires").notNull(),
});