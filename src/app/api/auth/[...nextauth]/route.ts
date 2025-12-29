// src/app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import { authConfig } from "@/auth.config"; // <-- Import der neuen Config
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { dbHelpers, verifyPassword } from "@/lib/db";

// Wir mergen die Config mit den Providern
export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const row = dbHelpers.getUserByEmail.get(credentials.email as string) as any;
        if (!row || !row.password) return null;

        const valid = await verifyPassword(credentials.password as string, row.password);
        if (!valid) return null;

        return {
          id: row.id,
          name: row.name,
          email: row.email,
        };
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

export const GET = handlers.GET;
export const POST = handlers.POST;