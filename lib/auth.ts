import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from './db'
import { env } from "./env";


export const auth = betterAuth({
    database: prismaAdapter(prisma, {
    provider: "postgresql",}),

    trustedOrigins: [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://192.168.1.151:3000",
    ],

    socialProviders: {
        github: {
            clientId: env.AUTH_GITHUB_CLIENT_ID,
            clientSecret: env.AUTH_GITHUB_SECRET
        },
        google: {
            clientId: env.AUTH_GOOGLE_CLIENT_ID,
            clientSecret: env.AUTH_GOOGLE_SECRET
        },
        facebook: {
            clientId: env.AUTH_FACEBOOK_CLIENT_ID,
            clientSecret: env.AUTH_FACEBOOK_SECRET
        }
    }
});