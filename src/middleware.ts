// Datei: src/middleware.ts
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

// 1. Next-Intl Middleware initialisieren
const intlMiddleware = createMiddleware(routing);

// 2. Next-Auth initialisieren
const { auth } = NextAuth(authConfig);

export default auth((req) => {
  // Wenn es eine API-Route oder eine statische Datei ist (z.B. image.png), nichts tun
  if (req.nextUrl.pathname.startsWith('/api') || req.nextUrl.pathname.includes('.')) {
    return;
  }

  // Für alle anderen Routen: Erst i18n anwenden
  return intlMiddleware(req);
});

export const config = {
  // Matcher ignoriert statische Files und API-Routen
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};