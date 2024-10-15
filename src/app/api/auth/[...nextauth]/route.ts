process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
     }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "email or DNI", type: "text", placeholder: "test@test.com or 23564789" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, {
            method: "POST",
            body: JSON.stringify({
              username: credentials?.username,
              password: credentials?.password,
            }),
            headers: { "Content-Type": "application/json" },
          });
      
          if (!res.ok) {
            console.error("Error en la solicitud:", res.status, res.statusText);
            return null;
          }
      
          const user = await res.json();
          if (user.error) {
            throw new Error(user.error);
          }
      
          return user;
        } catch (error) {
          console.error("Error en authorize:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});

  export { handler as GET, handler as POST };