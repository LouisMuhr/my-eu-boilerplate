import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { dbHelpers, verifyPassword } from "@/lib/db";

// Diese Datei ist die ZENTRALE für alle Auth-Logik (Node.js Runtime)
export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        
        const row = dbHelpers.getUserByEmail.get(credentials.email as string) as any;
        if (!row || !row.password) return null;

        const valid = await verifyPassword(credentials.password as string, row.password);
        if (!valid) return null;

        return { id: row.id, name: row.name, email: row.email };
      },
    }),
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ? [
          Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          }),
        ]
      : []),
  ],
});