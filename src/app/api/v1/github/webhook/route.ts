import { Thread } from "@/db/models";
import connectToDB from "@/lib/mongoose";
import crypto from "crypto";
import Comment from "@/db/models/comment";
import { GoogleGenerativeAI } from "@google/generative-ai";

const gemini = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

const summarizeCommit = async (commit: any, repoFullName: string) => {
    const diffUrl = `https://api.github.com/repos/${repoFullName}/commits/${commit.id}`;
    const diffRes = await fetch(diffUrl, {
        headers: {
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
            Accept: "application/vnd.github.v3.diff",
        },
    });
    const diffText = await diffRes.text();

    const prompt = `
You are a helpful Git commit summarizer. 
Summarize the following commit including code changes.

Commit message:
${commit.message}

Diff:
${diffText}
  `;

    const model = gemini.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);

    return result.response.text();
};

const summarizePR = async (pr: any, action: string) => {
    const diffRes = await fetch(pr.diff_url, {
        headers: {
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
            Accept: "application/vnd.github.v3.diff",
        },
    });
    const diffText = await diffRes.text();

    const prompt = `
You are a helpful Pull Request summarizer. 
Summarize the PR including the changes.

PR Title: ${pr.title}
Action: ${action}
Description: ${pr.body || ""}

Diff:
${diffText}
  `;

    const model = gemini.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);

    return result.response.text();
};

export async function POST(req: Request) {
    const rawBody = await req.text();
    const sig = req.headers.get("X-Hub-Signature-256");
    const event = req.headers.get("X-Github-Event");
    const secret = process.env.GITHUB_WEBHOOK_SECRET;

    if (!sig || !secret) return Response.json({ message: "Invalid request" }, { status: 400 });

    const hmac = crypto.createHmac("sha256", secret).update(rawBody).digest("hex");
    const computed = `sha256=${hmac}`;
    if (!crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(computed))) {
        return Response.json({ message: "Invalid signature" }, { status: 400 });
    }

    const payload = JSON.parse(rawBody);
    await connectToDB();

    if (event === "ping") {
        return Response.json({ ok: true }, { status: 200 });
    }

    if (event === "push") {
        const commits = Array.isArray(payload?.commits) ? payload.commits : [];
        for (const commit of commits) {
            const summary = await summarizeCommit(commit, payload.repository.full_name);
            const thread = await Thread.findOne({
                "integration.githubId": payload.repository.id,
            });

            if (thread) {
                await Comment.create({
                    threadId: thread._id,
                    author: "AI",
                    authorAvatar:
                        "https://www.shutterstock.com/image-vector/chat-bot-icon-virtual-smart-600nw-2478937555.jpg",
                    content: summary,
                });
            }
        }
        return Response.json({ ok: true }, { status: 200 });
    }

    if (event === "pull_request") {
        const pr = payload.pull_request;
        const summary = await summarizePR(pr, payload.action);
        const thread = await Thread.findOne({
            "integration.githubId": payload.repository.id,
        });

        if (thread) {
            const comment = await Comment.create({
                threadId: thread._id,
                author: "AI",
                authorAvatar:
                    "https://www.shutterstock.com/image-vector/chat-bot-icon-virtual-smart-600nw-2478937555.jpg",
                content: summary,
            });
            return Response.json(comment, { status: 200 });
        }
    }

    return Response.json({ ok: true }, { status: 204 });
}
