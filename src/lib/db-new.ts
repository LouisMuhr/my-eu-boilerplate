// Datei: src/lib/db-new.ts
import { db } from "./drizzle";
import { users, passwordResetTokens } from "./schema";
import { eq } from "drizzle-orm";

// Typen exportieren, damit der Rest der App nicht meckert
export type UserRow = typeof users.$inferSelect;

export const dbHelpersAsync = {
  // --- USER CORE ---
  async getUserByEmail(email: string) {
    const result = await db.select().from(users).where(eq(users.email, email)).limit(1);
    return result[0];
  },

  async getUserById(id: string) {
    const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0];
  },

  // WICHTIG: Drizzle nimmt ein Objekt, keine Parameter-Liste mehr!
  async createUser(data: typeof users.$inferInsert) {
    return await db.insert(users).values(data).returning();
  },

  async updateUserProfile(id: string, name: string) {
    return await db.update(users).set({ name }).where(eq(users.id, id));
  },
  
  // --- ADMIN ---
  async deleteUser(id: string) {
      return await db.delete(users).where(eq(users.id, id));
  },
  
  async getAllUsers() {
      return await db.select().from(users);
  },

  // --- STRIPE ---
  async updateUserStripe(stripeCustomerId: string, subscriptionStatus: string, id: string) {
     return await db.update(users)
       .set({ stripeCustomerId, subscriptionStatus })
       .where(eq(users.id, id));
  },

  async updateUserSubscription(status: string, cancelAtPeriodEnd: number, currentPeriodEnd: string, stripeCustomerId: string) {
    // Konvertiert 0/1 zu boolean für Drizzle
    return await db.update(users)
      .set({
        subscriptionStatus: status,
        cancelAtPeriodEnd: !!cancelAtPeriodEnd, 
        currentPeriodEnd: currentPeriodEnd
      })
      .where(eq(users.stripeCustomerId, stripeCustomerId));
  },

  // --- PASSWORD RESET ---
  async createResetToken(data: typeof passwordResetTokens.$inferInsert) {
    return await db.insert(passwordResetTokens).values(data);
  },

  async getResetTokenByToken(token: string) {
    const result = await db
      .select()
      .from(passwordResetTokens)
      .where(eq(passwordResetTokens.token, token))
      .limit(1);
    return result[0];
  },

  async deleteResetToken(id: string) {
    return await db.delete(passwordResetTokens).where(eq(passwordResetTokens.id, id));
  },
  
  async updateUserPassword(password: string, email: string) {
      return await db.update(users).set({ password }).where(eq(users.email, email));
  }
};