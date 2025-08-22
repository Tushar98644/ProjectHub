import { Thread } from "@/db/models";
import connectToDB from "@/lib/mongoose";
import crypto from "crypto";
import Comment from "@/db/models/comment";
import { GoogleGenAI } from "@google/genai";
import axios from "axios";

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_API_KEY,
});

async function streamSummarize(prompt: string): Promise<string> {
    const stream = await ai.models.generateContentStream({
        model: "gemini-2.5-flash",
        contents: prompt,
    });

    let result = "";
    for await (const chunk of stream) {
        if (chunk.text) result += chunk.text;
    }
    return result;
}

async function fetchDiff(url: string, token: string): Promise<string> {
    try {
        const res = await axios.get(url, {
            headers: {
                Authorization: `token ${token}`,
                Accept: "application/vnd.github.v3.diff",
            },
        });
        return res.data;
    } catch (error) {
        console.error("Error fetching diff:", error);
        return "Could not fetch diff";
    }
}

export async function POST(req: Request) {
    const raw = await req.text();
    const sig = req.headers.get("X-Hub-Signature-256");
    const event = req.headers.get("X-Github-Event");
    const secret = process.env.GITHUB_WEBHOOK_SECRET;
    const token = process.env.GITHUB_TOKEN;

    if (!sig || !secret || !token) {
        return Response.json({ message: "Missing credentials" }, { status: 400 });
    }

    const hmac = crypto.createHmac("sha256", secret).update(raw).digest("hex");
    if (!crypto.timingSafeEqual(Buffer.from(`sha256=${hmac}`), Buffer.from(sig))) {
        return Response.json({ message: "Invalid signature" }, { status: 400 });
    }

    const payload = JSON.parse(raw);
    await connectToDB();

    if (event === "ping") {
        return Response.json({ ok: true }, { status: 200 });
    }

    const repoFullName = payload.repository?.full_name;

    if (event === "push") {
        for (const commit of payload.commits || []) {
            const diffUrl = `${commit.url}.diff`;
            const diff = await fetchDiff(diffUrl, token);

            const prompt = `
Commit Summary:
Repository: ${repoFullName}
Message: ${commit.message}
Author: ${commit.author?.name}
Files changed: ${(commit.added || [])
                .concat(commit.modified || [])
                .concat(commit.removed || [])
                .join(", ")}

Diff:
${diff}

Please provide a concise summary of what changed in this commit.`;

            const summary = await streamSummarize(prompt);

            const thread = await Thread.findOne({
                "integration.githubId": payload.repository.id,
            });

            if (thread) {
                await Comment.create({
                    threadId: String(thread._id),
                    author: "AI Assistant",
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

        const diff = await fetchDiff(pr.diff_url, token);

        const prompt = `
Pull Request Summary (${payload.action}):
Repository: ${repoFullName}
Title: ${pr.title}
Author: ${pr.user?.login}
From: ${pr.head?.ref} into ${pr.base?.ref}
Body: ${pr.body || "No description"}

Diff:
${diff}

Please provide a concise summary of what this pull request changes.`;

        const summary = await streamSummarize(prompt);

        const thread = await Thread.findOne({
            "integration.provider": "github",
            "integration.githubFullName": repoFullName,
        });

        if (thread) {
            const comment = await Comment.create({
                threadId: String(thread._id),
                author: "AI Assistant",
                authorAvatar:
                    "https://www.shutterstock.com/image-vector/chat-bot-icon-virtual-smart-600nw-2478937555.jpg",
                content: summary,
            });
            return Response.json(comment, { status: 200 });
        }
    }

    return Response.json({ ok: true }, { status: 204 });
}
