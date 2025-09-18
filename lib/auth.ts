import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from './db'
import { env } from "./env";


export const auth = betterAuth({
    database: prismaAdapter(prisma, {
    provider: "postgresql",}),

    socialProviders: {
        github: {
            clientId: env.AUTH_GITHUB_CILENT_ID,
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