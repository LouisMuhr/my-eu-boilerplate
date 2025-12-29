// src/middleware.ts
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

// Wir extrahieren die 'auth' Funktion aus der NextAuth-Initialisierung
const { auth } = NextAuth(authConfig);

// Wir exportieren 'auth' als default export (wie von Auth.js empfohlen)
export default auth;

// Optional: Falls der Fehler bleibt, kannst du zusätzlich diesen Export hinzufügen:
// export const middleware = auth;

export const config = {
  // Schützt alle Pfade außer statische Dateien, API-Routen und Bilder
  // Das stellt sicher, dass die Middleware für das Dashboard greift
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};