import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

// Initialisierung nur mit Config (Edge Runtime kompatibel)
const { auth } = NextAuth(authConfig);

// Default Export ist zwingend für Next.js Middleware
export default auth;

export const config = {
  // Matcher ignoriert statische Files und API-Routen (damit Webhooks durchkommen!)
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};