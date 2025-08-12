import { createAuthClient } from "better-auth/react";

const authClient = createAuthClient({
    baseURL: process.env.BETTER_AUTH_URL,
});

export const { signIn, signOut, useSession } = authClient;
