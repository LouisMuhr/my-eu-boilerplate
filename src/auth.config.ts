import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/auth/signin",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    // 1. Zugriffschutz für Dashboard (Middleware Logic)
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");

      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect zum Login
      }
      return true;
    },

    // 2. ID ins Token schreiben (CRITICAL FOR 401 FIX)
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },

    // 3. ID vom Token in die Session holen (CRITICAL FOR 401 FIX)
    async session({ session, token }) {
      if (token?.id && session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  providers: [], // Hier leer lassen, Provider sind in auth.ts
} satisfies NextAuthConfig;