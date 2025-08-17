import { auth } from "@/config/auth/server";
import { headers } from "next/headers";

export async function requireAuth(req: Request) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        throw new Error("Unauthorized");
    }

    return session;
}
