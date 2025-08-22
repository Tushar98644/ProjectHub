import { Thread } from "@/db/models";
import connectToDB from "@/lib/mongoose";
import { verifyWebhookSignature } from "@/utils/webhookUtils";
import { handlePushEvent, handlePullRequestEvent } from "@/services/webhookHandlers";

export async function POST(req: Request) {
    try {
        const raw = await req.text();
        const sigHeader = req.headers.get("x-hub-signature-256") || req.headers.get("x-hub-signature");
        const event = (req.headers.get("x-github-event") || "").toLowerCase();
        const secret = process.env.GITHUB_WEBHOOK_SECRET;

        if (!sigHeader || !secret) {
            return new Response(JSON.stringify({ message: "Missing credentials" }), { status: 400 });
        }

        if (!verifyWebhookSignature(raw, sigHeader, secret)) {
            return new Response(JSON.stringify({ message: "Invalid signature" }), { status: 400 });
        }

        const payload = JSON.parse(raw);
        await connectToDB();

        if (event === "ping") {
            return new Response(JSON.stringify({ ok: true }), { status: 200 });
        }

        const installationId = payload.installation?.id;
        const repoId = payload.repository?.id;

        if (!installationId || !repoId) {
            return new Response(JSON.stringify({ message: "Missing installation or repository info" }), {
                status: 400,
            });
        }

        const thread = await Thread.findOne({ "integration.githubId": repoId });
        if (!thread) {
            return new Response(JSON.stringify({ ok: true, message: "Thread not tracked" }), { status: 204 });
        }

        try {
            switch (event) {
                case "push":
                    await handlePushEvent(payload, thread);
                    break;
                case "pull_request":
                    await handlePullRequestEvent(payload, thread);
                    break;
                default:
                    return new Response(JSON.stringify({ ok: true }), { status: 204 });
            }

            return new Response(JSON.stringify({ ok: true }), { status: 200 });
        } catch (err: any) {
            console.error(`Error handling ${event} event:`, err);
            return new Response(JSON.stringify({ message: "Failed to process event" }), { status: 500 });
        }
    } catch (err: any) {
        console.error("Webhook handler error:", err);
        return new Response(JSON.stringify({ message: "Internal error", error: err?.message }), { status: 500 });
    }
}
