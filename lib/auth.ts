import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from './db'
import { env } from "./env";
import {emailOTP} from 'better-auth/plugins';
import { resend } from "./resend";

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
    provider: "postgresql",}),

    socialProviders: {
        github: {
            clientId: env.AUTH_GITHUB_CILENT_ID,
            clientSecret: env.AUTH_GITHUB_SECRET
        }
    },
    plugins: [
        emailOTP({
            async sendVerificationOTP({email, otp}) {
                const {data, error} = await resend.emails.send({
                    from: 'Funtime Media Corp <onboarding@resend.dev>',
                    to: [email],
                    subject: "Funtime Media - Verify your email",
                    html: `<p>Your OTP is <strong>${otp}</strong>!</p>`,
                })
            }
        })
    ]
});