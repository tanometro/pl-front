import type { NextAuthConfig } from "next-auth";
import Credentials from "@auth/core/providers/credentials";

export default {
    providers: [
        Credentials({
          authorize: async (credentials) => {
            const res = await fetch(`${process.env.BASE_URL}/auth/login`,
            {
              method: "POST",
              body: JSON.stringify({
                username: credentials?.username,
                password: credentials?.password
              }),
              headers: {"Content-Type": "application/json"},
            });
            const user = await res.json();
      
              if (!user) {
                // No user found, so this is their first attempt to login
                // meaning this is also the place you could do registration
                throw new Error("Usuario no válido");
              }
              return user;
            }
        })
      ],
} satisfies NextAuthConfig;