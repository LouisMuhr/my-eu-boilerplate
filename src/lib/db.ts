// Datei: src/lib/db.ts

import Database from "better-sqlite3";
import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";
import path from "path";
import fs from "fs";

// =============================================
// DB-Pfad und Initialisierung
// =============================================
const dbPath = path.join(process.cwd(), "dev.db");

// Datei erstellen, falls nicht vorhanden
if (!fs.existsSync(dbPath)) {
  fs.writeFileSync(dbPath, "");
}

const db = new Database(dbPath, { verbose: console.log });

// =============================================
// Tabellen + Spalten anlegen / migrieren
// =============================================
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT,
    email TEXT UNIQUE NOT NULL,
    password TEXT,
    stripeCustomerId TEXT,
    subscriptionStatus TEXT DEFAULT 'free',
    cancelAtPeriodEnd INTEGER DEFAULT 0,
    currentPeriodEnd TEXT
  );

  CREATE TABLE IF NOT EXISTS sessions (
    id TEXT PRIMARY KEY,
    sessionToken TEXT UNIQUE NOT NULL,
    userId TEXT NOT NULL,
    expires DATETIME NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS password_reset_tokens (
    id TEXT PRIMARY KEY,
    email TEXT NOT NULL,
    token TEXT UNIQUE NOT NULL,
    expires DATETIME NOT NULL
  );
`);

// Sicherheits-Migration: Fügt Spalten hinzu, falls sie in einer alten Version fehlen
const addColumnIfNotExists = (table: string, column: string, type: string) => {
  try {
    db.exec(`ALTER TABLE ${table} ADD COLUMN ${column} ${type};`);
    console.log(`Spalte ${column} erfolgreich zu ${table} hinzugefügt.`);
  } catch (e: any) {
    if (e.message.includes("duplicate column name")) {
      // Spalte existiert bereits → ignorieren
    } else {
      console.warn(`Hinweis bei Migration ${table}.${column}: ${e.message}`);
    }
  }
};

addColumnIfNotExists("users", "stripeCustomerId", "TEXT");
addColumnIfNotExists("users", "subscriptionStatus", "TEXT DEFAULT 'free'");
addColumnIfNotExists("users", "cancelAtPeriodEnd", "INTEGER DEFAULT 0");
addColumnIfNotExists("users", "currentPeriodEnd", "TEXT");

// =============================================
// Prepared Statements (Helpers)
// =============================================
export const dbHelpers = {
  
  // --- USER CORE ---
  createUser: db.prepare(`
    INSERT INTO users (id, name, email, password, stripeCustomerId, subscriptionStatus)
    VALUES (?, ?, ?, ?, ?, ?)
  `),

  getUserByEmail: db.prepare(`SELECT * FROM users WHERE email = ?`),
  getUserById: db.prepare(`SELECT * FROM users WHERE id = ?`),
  deleteUser: db.prepare(`DELETE FROM users WHERE id = ?`),
  getAllUsers: db.prepare(`SELECT * FROM users`),
  
  updateUserProfile: db.prepare(`
    UPDATE users SET name = ? WHERE id = ?
  `),

  // --- STRIPE & SUBSCRIPTIONS ---
  
  // Initiales Setzen nach Checkout
  updateUserStripe: db.prepare(`
    UPDATE users 
    SET stripeCustomerId = ?, subscriptionStatus = ? 
    WHERE id = ?
  `),

  // Detailliertes Update für Webhooks (inkl. Kündigungs-Status)
  updateUserSubscription: db.prepare(`
    UPDATE users 
    SET subscriptionStatus = ?, 
        cancelAtPeriodEnd = ?, 
        currentPeriodEnd = ? 
    WHERE stripeCustomerId = ?
  `),

  getUserByStripeCustomerId: db.prepare(`
    SELECT * FROM users WHERE stripeCustomerId = ?
  `),

  // --- NEXTAUTH SESSIONS ---
  createSession: db.prepare(`
    INSERT INTO sessions (id, sessionToken, userId, expires)
    VALUES (?, ?, ?, ?)
  `),

  getSession: db.prepare(`SELECT * FROM sessions WHERE sessionToken = ?`),

  // --- PASSWORD RESET ---
  createResetToken: db.prepare(`
    INSERT INTO password_reset_tokens (id, email, token, expires)
    VALUES (?, ?, ?, ?)
  `),
  
  getResetTokenByToken: db.prepare(`
    SELECT * FROM password_reset_tokens WHERE token = ?
  `),
  
  deleteResetToken: db.prepare(`
    DELETE FROM password_reset_tokens WHERE id = ?
  `),
  
  updateUserPassword: db.prepare(`
    UPDATE users SET password = ? WHERE email = ?
  `),
};

// =============================================
// Hilfsfunktionen
// =============================================
export function generateId(): string {
  return randomUUID();
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

// =============================================
// Typen
// =============================================
export interface UserRow {
  id: string;
  name: string | null;
  email: string | null;
  password: string | null;
  stripeCustomerId: string | null;
  subscriptionStatus: string | null;
  cancelAtPeriodEnd: number;
  currentPeriodEnd: string | null;
}

export default db;