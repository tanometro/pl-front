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
        // session() se utiliza para agregar la información del token a la sesión del usuario, lo que hace que esté disponible en el cliente.
        session({ session, token }) {
          if (session.user) {
            session.user.role = token.role;
          }
          return session;
        },
      },
  });