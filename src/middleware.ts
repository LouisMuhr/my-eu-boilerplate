// Datei: src/middleware.ts
import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';
import { auth } from "./auth";

const intlMiddleware = createMiddleware(routing);

export default auth((req) => {
  // 1. Wenn es eine API oder statische Datei ist, ignorieren
  if (req.nextUrl.pathname.startsWith('/api') || req.nextUrl.pathname.includes('.')) {
    return;
  }

  // 2. Internationalisierung anwenden
  return intlMiddleware(req);
});

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
};