import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { dbHelpers, verifyPassword } from "@/lib/db";

// Vollständige NextAuth-Konfiguration
export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.log("Authorize: Fehlende Credentials");
          return null;
        }

        const row = dbHelpers.getUserByEmail.get(credentials.email as string) as any;

        if (!row || !row.password) {
          console.log("Authorize: User nicht gefunden oder kein Passwort");
          return null;
        }

        const valid = await verifyPassword(credentials.password as string, row.password);

        if (!valid) {
          console.log("Authorize: Passwort falsch");
          return null;
        }

        console.log("Authorize erfolgreich – Return:", {
          id: row.id,
          name: row.name,
          email: row.email,
        });

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

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/auth/signin",
  },

  callbacks: {
    async jwt({ token, user }) {
      console.log("JWT Callback – user:", user);
      if (user) {
        token.id = user.id;
      }
      return token;
    },

    async session({ session, token }) {
      console.log("SESSION CALLBACK AUFGERUFEN – token:", token);
      console.log("SESSION CALLBACK – session vor:", session);
      if (token?.id) {
        session.user.id = token.id as string;
      }
      console.log("SESSION CALLBACK – session nach:", session);
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
});

export const GET = handlers.GET;
export const POST = handlers.POST;