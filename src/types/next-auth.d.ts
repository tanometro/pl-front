import NextAuth, { DefaultSession } from "next-auth";
import ClientsInterface from '../types/ClientsTypes'
import { SellersInterface } from "./SellersTypes";

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
                client: ClientsInterface
                seller: SellersInterface
                profile_image: string
            }
        } & DefaultSession['user']
        accessToken: string
        exp: number;
        iat: number;
        jti: string;
        expires: string
    }
}