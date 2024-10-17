import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            user: {
                accessToken: string;
                activation_token?: string;
                active: boolean;
                createdAt: string;
                deletedAt: string | null;
                dni: string;
                email: string
                id: string;
                role: string;
                updatedAt: string;
            }
        } & DefaultSession['user']
        accessToken: string
        exp: number;
        iat: number;
        jti: string;
        expires: string
    }
}