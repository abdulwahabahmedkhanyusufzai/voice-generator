import type { NextAuthConfig } from "next-auth"

export const authConfig = {
  providers: [], // Providers are defined in src/auth.ts to avoid Edge Runtime issues
  pages: {
    signIn: "/sign-in",
    newUser: "/sign-up",
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id
        token.name = user.name
        token.image = user.image
      }
      
      // Handle session updates (e.g. after profile update)
      if (trigger === "update" && session) {
        token.name = session.name
        token.image = session.image
      }
      
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.name = token.name
        session.user.image = token.image as string
      }
      return session
    },
  },
} satisfies NextAuthConfig
