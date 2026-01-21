// Datei: src/lib/schema.ts
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const users = sqliteTable("users", {
  id: text("id").primaryKey(), // Wir behalten deine UUIDs
  name: text("name"),
  email: text("email").notNull().unique(),
  password: text("password"),
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