import { NextResponse } from "next/server";
import clientPromise from "@/db/client";
import { auth } from "@/config/auth/server";
import { headers } from "next/headers";

const TEMPLATES = [
    {
        id: "github",
        name: "GitHub",
        description: "Repository events, PRs, issues and CI status",
        category: "Development",
        events: ["push", "pull_request", "issues"],
    },
    {
        id: "slack",
        name: "Slack",
        description: "Messages, channel events and app interactions",
        category: "Communication",
        events: ["message_posted", "channel_created"],
    },
];

export async function GET(req: Request) {
    try {
        const session = await auth.api.getSession({ headers: await headers() });
        const user = session?.user;
        if (!user) return NextResponse.json({ error: "unauthenticated" }, { status: 401 });

        const client = await clientPromise;
        const db = client.db();

        const userConns = await db.collection("user_connections").find({ userId: user.id }).toArray();

        const merged = TEMPLATES.map(t => {
            const conn = userConns.find(c => c.providerId === t.id);
            return {
                ...t,
                connected: !!conn,
                connectedAt: conn?.connectedAt ?? null,
                account: conn ? { accountId: conn.accountId, accountName: conn.accountName } : null,
            };
        });

        return Response.json(merged);
    } catch (err: any) {
        console.error("GET /api/integrations error:", err?.message ?? err);
        return NextResponse.json({ error: "server_error" }, { status: 500 });
    }
}
