import Database from "better-sqlite3";
import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";
import path from "path";
import fs from "fs";

// Pfad zur DB-Datei (im Root, neben package.json)
const dbPath = path.join(process.cwd(), "dev.db");

// Sicherstellen, dass die Datei existiert
if (!fs.existsSync(dbPath)) {
  fs.writeFileSync(dbPath, "");
}

const db = new Database(dbPath);

// Tabellen anlegen, falls nicht vorhanden
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT,
    email TEXT UNIQUE,
    password TEXT
  );

  CREATE TABLE IF NOT EXISTS sessions (
    id TEXT PRIMARY KEY,
    sessionToken TEXT UNIQUE,
    userId TEXT,
    expires DATETIME,
    FOREIGN KEY (userId) REFERENCES users (id)
  );
`);

export type User = {
  id: string;
  name: string | null;
  email: string | null;
};

export const dbHelpers = {
  // User anlegen (Register)
  createUser: db.prepare(`
    INSERT INTO users (id, name, email, password)
    VALUES (@id, @name, @email, @password)
  `),

  // User per E-Mail finden
  getUserByEmail: db.prepare(`SELECT * FROM users WHERE email = ?`),

  // User per ID finden (für Export)
  getUserById: db.prepare(`SELECT * FROM users WHERE id = ?`),

  // User löschen
  deleteUser: db.prepare(`DELETE FROM users WHERE id = ?`),

  // Session anlegen (NextAuth nutzt das intern)
  createSession: db.prepare(`
    INSERT INTO sessions (id, sessionToken, userId, expires)
    VALUES (@id, @sessionToken, @userId, @expires)
  `),

  // Session finden
  getSession: db.prepare(`SELECT * FROM sessions WHERE sessionToken = ?`),
};

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export function generateId() {
  return randomUUID();
}