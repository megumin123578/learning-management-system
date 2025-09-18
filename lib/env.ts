import { createEnv } from "@t3-oss/env-nextjs";
import { z } from 'zod';

export const env = createEnv({
    server: {
        DATABASE_URL: z.url(),
        BETTER_AUTH_SECRET: z.string().min(1),
        BETTER_AUTH_URL: z.url(),
        AUTH_GITHUB_CILENT_ID: z.string().min(1),
        AUTH_GITHUB_SECRET: z.string().min(1),
        AUTH_GOOGLE_CLIENT_ID:z.string().min(1),
        AUTH_GOOGLE_SECRET: z.string().min(1),
        AUTH_FACEBOOK_CLIENT_ID: z.string().min(1),
        AUTH_FACEBOOK_SECRET: z.string().min(1),
        RESEND_API_KEY: z.string().min(1),
    },
    experimental__runtimeEnv: {}
});