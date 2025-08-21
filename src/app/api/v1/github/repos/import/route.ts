import connectToDB from "@/lib/mongoose";
import { requireAuth } from "@/lib/requireAuth";
import Thread from "@/db/models/thread";
import { Integration } from "@/types/integration";
import Member from "@/db/models/member";

export async function POST(req: Request) {
    try {
        const session = await requireAuth(req);
        if (!session) {
            return Response.json({ message: "Unauthorized" }, { status: 401 });
        }

        await connectToDB();

        const body = await req.json();
        const { data, provider } = body || {};

        if (!data || !provider) {
            return Response.json({ message: "provider and data are required" }, { status: 400 });
        }

        const author = session.user?.email as string;
        if (!author) {
            return Response.json({ message: "Invalid session" }, { status: 401 });
        }

        let title = "";
        let description = data.description || "";
        const tags = Array.isArray(data.tags) ? data.tags : [];

        const integration: Integration = { provider };

        if (provider === "github") {
            if (!data.full_name || !data.html_url) {
                return Response.json(
                    { message: "For GitHub, data.name and data.html_url are required" },
                    { status: 400 }
                );
            }
            const fullName = data.full_name;
            const [owner, name] = fullName.includes("/") ? fullName.split("/") : ["", fullName];

            title = `${name} • GitHub`;

            integration.githubOwner = owner || "";
            integration.githubRepo = name || "";
            integration.githubUrl = data.html_url;
            if (data.id) integration.githubId = String(data.id);
        } else if (provider === "slack") {
            integration.slackTeamId = data.teamId || "";
            integration.slackChannelId = data.channelId || "";
            integration.slackChannelName = data.channelName || data.name || "";
            title = title || `${integration.slackChannelName || "Slack Channel"} • Slack`;
        } else {
            return Response.json({ message: "Unsupported provider" }, { status: 400 });
        }

        const threadDoc = {
            title: title || "Untitled",
            author,
            description,
            tags,
            integration,
        };

        const thread = await Thread.create(threadDoc);

        await Member.create({
            threadId: String(thread._id),
            threadTitle: thread.title,
            email: session.user.email,
            name: session.user.name,
            avatar: session.user.image,
            authorEmail: session.user.email,
            role: "admin",
        });

        return Response.json({ ok: true, threadId: String(thread._id), title: thread.title }, { status: 201 });
    } catch (err) {
        return Response.json({ message: "Error creating thread" }, { status: 400 });
    }
}
