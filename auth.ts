import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      async authorize(credentials) {   
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        }
      );
      if(res.status === 401) return null;
      const user = await res.json();  
      if(!user) return null;
      return user;
    }
    })
  ],
    session: {strategy: 'jwt'},
    callbacks: {
        jwt({session, token, user }) {
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