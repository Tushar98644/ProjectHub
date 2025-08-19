import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import clientPromise from "@/db/client";
import { nextCookies } from "better-auth/next-js";

const dbPromise = clientPromise.then(client => client.db());

export const auth = betterAuth({
    database: mongodbAdapter(await dbPromise),
    secret: process.env.BETTER_AUTH_SECRET as string,
    baseURL: process.env.BETTER_AUTH_URL as string,
    account: {
        accountLinking: {
            enabled: true,
            allowDifferentEmails: true,
        },
    },
    socialProviders: {
        google: {
            prompt: "select_account",
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        },
        github: {
            prompt: "select_account",
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
            scope: ["read:user", "user:email", "repo:read"],
        },
    },
    plugins: [nextCookies()],
});
