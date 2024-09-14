import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username",type: "text", placeholder: "email@gmail.com"},
        password: { label: "Password", type: "password", placeholder: "*******",
        },
     },
      async authorize(credentials) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        }
      );
      const user = await res.json();  
      return user;
      }
    })
  ],
    session: {strategy: 'jwt'},
    callbacks: {
        jwt({ token, user }) {
          if (user) {
            token.role = user.role;
          }
          console.log(token, user);
          
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