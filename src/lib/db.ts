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

const db = new Database(dbPath, { verbose: console.log }); // verbose für Debugging (kann später entfernt werden)

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
    subscriptionStatus TEXT DEFAULT 'free'
  );

  CREATE TABLE IF NOT EXISTS sessions (
    id TEXT PRIMARY KEY,
    sessionToken TEXT UNIQUE NOT NULL,
    userId TEXT NOT NULL,
    expires DATETIME NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
  );
`);

// Sicherheits-Migration: Spalten nur hinzufügen, wenn sie fehlen
const addColumnIfNotExists = (table: string, column: string, type: string) => {
  try {
    db.exec(`ALTER TABLE ${table} ADD COLUMN ${column} ${type};`);
    console.log(`Spalte ${column} erfolgreich zu ${table} hinzugefügt.`);
  } catch (e: any) {
    if (e.message.includes("duplicate column name")) {
      // Spalte existiert bereits → ignorieren
    } else {
      throw e; // Andere Fehler weiterwerfen
    }
  }
};

addColumnIfNotExists("users", "stripeCustomerId", "TEXT");
addColumnIfNotExists("users", "subscriptionStatus", "TEXT DEFAULT 'free'");

// =============================================
// Prepared Statements (Helpers)
// =============================================
export const dbHelpers = {
  // User erstellen
  createUser: db.prepare(`
    INSERT INTO users (id, name, email, password, stripeCustomerId, subscriptionStatus)
    VALUES (?, ?, ?, ?, ?, ?)
  `),

  // User per E-Mail suchen
  getUserByEmail: db.prepare(`
    SELECT * FROM users WHERE email = ?
  `),

  // User per ID suchen
  getUserById: db.prepare(`
    SELECT * FROM users WHERE id = ?
  `),

  // User löschen
  deleteUser: db.prepare(`
    DELETE FROM users WHERE id = ?
  `),

  // Subscription-Status aktualisieren
  updateUserSubscription: db.prepare(`
    UPDATE users 
    SET stripeCustomerId = ?, subscriptionStatus = ? 
    WHERE id = ?
  `),

  // Session erstellen (wird von NextAuth intern genutzt)
  createSession: db.prepare(`
    INSERT INTO sessions (id, sessionToken, userId, expires)
    VALUES (?, ?, ?, ?)
  `),

  // Session suchen
  getSession: db.prepare(`
    SELECT * FROM sessions WHERE sessionToken = ?
  `),

  getUserByStripeCustomerId: db.prepare(`
  SELECT * FROM users WHERE stripeCustomerId = ?
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

export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

// =============================================
// Typen (für bessere TypeScript-Unterstützung)
// =============================================
export interface UserRow {
  id: string;
  name: string | null;
  email: string | null;
  password: string | null;
  stripeCustomerId: string | null;
  subscriptionStatus: string | null;
}

// =============================================
// Export der DB-Instanz (falls irgendwo direkt benötigt)
// =============================================
export default db;
