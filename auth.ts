import NextAuth from "next-auth";
import authConfig from "./auth.config";

export const { handlers, auth, signIn, signOut } = NextAuth({
    ...authConfig,
    session: {strategy: 'jwt'},
    callbacks: {
        jwt({ token, user }) {
          if (user) {
            token.role = user.role;
          }
          return token;
        },
        session({ session, token }) {
          if (session.user) {
            session.user.role = token.role;
          }
          return session;
        },
      },
  });