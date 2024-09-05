import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials"

export default {
    providers: [
        Credentials({
          name: "Credentials",
          credentials: {
            username: {
              label: "Username",
              type: "text",
              placeholder: "email@gmail.com",
            },
            password: {
              label: "Password",
              type: "password",
              placeholder: "*******",
            },
         },
          authorize: async (credentials) => {
            if(!credentials) return null;
            
            const {username, password} = credentials;

            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, {
              method: "POST",
              body: JSON.stringify({
                username,
                password
              }),
              headers: { 'Content-Type': 'application/json' },
            });
            const user = await res.json();
            console.log(user);
            
      
            if (!user) {
              throw new Error("Usuario no válido");
            }
            return user;
          }
        })
      ],
} satisfies NextAuthConfig;