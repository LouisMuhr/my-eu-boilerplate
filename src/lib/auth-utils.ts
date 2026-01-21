// Datei: src/lib/auth-utils.ts
import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";

export function generateId(): string {
  return randomUUID();
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}