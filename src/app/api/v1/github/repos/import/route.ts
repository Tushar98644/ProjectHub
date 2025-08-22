import connectToDB from "@/lib/mongoose";
import { requireAuth } from "@/lib/requireAuth";
import Thread from "@/db/models/thread";
import Member from "@/db/models/member";
import { Octokit } from "@octokit/rest";
import { createAppAuth } from "@octokit/auth-app";

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

        const integration: any = { provider };

        if (provider === "github") {
            if (!data.full_name || !data.html_url) {
                return Response.json(
                    { message: "For GitHub, data.full_name and data.html_url are required" },
                    { status: 400 }
                );
            }
            const fullName = data.full_name;
            const [owner, name] = fullName.includes("/") ? fullName.split("/") : ["", fullName];

            const installationId = await getInstallationId(owner, name);
            // if (!installationId) {
            //     return Response.json(
            //         { message: `GitHub App is not installed on repository ${fullName}` },
            //         { status: 400 }
            //     );
            // }

            title = `${name} • GitHub`;

            integration.githubOwner = owner || "";
            integration.githubRepo = name || "";
            integration.githubUrl = data.html_url;
            integration.githubId = String(data.id);
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
        console.error("Error in import API:", err);
        return Response.json({ message: "Error creating thread" }, { status: 400 });
    }
}

async function getInstallationId(owner: string, repo: string): Promise<number | null> {
    try {
        const octokitApp = new Octokit({
            authStrategy: createAppAuth,
            auth: {
                appId: Number(process.env.GITHUB_APP_ID),
                privateKey: process.env.GITHUB_APP_PRIVATE_KEY?.replace(/\\n/g, "\n") || "",
            },
        });

        const resp = await octokitApp.request("GET /repos/{owner}/{repo}/installation", {
            owner,
            repo,
        });

        return resp.data?.id ?? null;
    } catch (err: any) {
        console.error("getInstallationId error:", {
            status: err.status || err.response?.status,
            message: err.message,
            data: err.response?.data,
        });
        return null;
    }
}
