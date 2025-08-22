import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import clientPromise from "@/db/client";
import { nextCookies } from "better-auth/next-js";
import { createAuthMiddleware } from "better-auth/api";
import { userSearchPlugin } from "./plugins/user-search";

const dbPromise = clientPromise.then(client => client.db("main"));

export const auth = betterAuth({
    database: mongodbAdapter(await dbPromise),
    secret: process.env.BETTER_AUTH_SECRET as string,
    baseURL: process.env.BETTER_AUTH_URL as string,
    user: {
        modelName: "users",
    },
    account: {
        accountLinking: {
            enabled: true,
            allowDifferentEmails: true,
            trustedProviders: ["github"],
        },
    },
    hooks: {
        after: createAuthMiddleware(async ctx => {
            if (ctx.path === "/oauth/github/callback") {
                const newSession = ctx.context.newSession;
                if (newSession?.user) {
                    const db = (await clientPromise).db();
                    await db
                        .collection("users")
                        .updateOne({ id: newSession.user.id }, { $set: { "integrations.github": true } });
                }
            }
        }),
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
            scope: ["read:user", "user:email", "repo"],
        },
    },
    plugins: [nextCookies(), userSearchPlugin()],
});
