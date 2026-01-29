import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import { dbHelpersAsync } from "@/lib/db-new";
import { verifyPassword, generateId } from "@/lib/auth-utils";
import { env } from "@/env";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  callbacks: {
    ...authConfig.callbacks,
    async signIn({ user, account }) {
      if (account?.provider === "credentials") {
        return true;
      }

      if (user.email) {
        const existingUser = await dbHelpersAsync.getUserByEmail(user.email);

        if (existingUser) {
          user.id = existingUser.id;
        } else {
          const newId = generateId();
          await dbHelpersAsync.createUser({
            id: newId,
            email: user.email,
            name: user.name || null,
            password: null,
            subscriptionStatus: "free",
          });
          user.id = newId;
        }
      }

      return true;
    },
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const row = (await dbHelpersAsync.getUserByEmail(
          credentials.email as string,
        )) as any;
        if (!row || !row.password) return null;

        if (!row.emailVerified) {
          throw new Error("E-Mail nicht bestätigt. Bitte prüfe dein Postfach.");
        }

        const valid = await verifyPassword(
          credentials.password as string,
          row.password,
        );
        if (!valid) return null;

        return { id: row.id, name: row.name, email: row.email };
      },
    }),
    ...(env.GOOGLE_CLIENT_ID && env.GOOGLE_CLIENT_SECRET
      ? [
          Google({
            clientId: env.GOOGLE_CLIENT_ID,
            clientSecret: env.GOOGLE_CLIENT_SECRET,
          }),
        ]
      : []),
    ...(env.GITHUB_CLIENT_ID && env.GITHUB_CLIENT_SECRET
      ? [
          GitHub({
            clientId: env.GITHUB_CLIENT_ID,
            clientSecret: env.GITHUB_CLIENT_SECRET,
          }),
        ]
      : []),
  ],
});
