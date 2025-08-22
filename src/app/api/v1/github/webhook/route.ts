import { Thread } from "@/db/models";
import connectToDB from "@/lib/mongoose";
import crypto from "crypto";
import Comment from "@/db/models/comment";
import { GoogleGenAI } from "@google/genai";
import axios from "axios";

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY! });

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

async function fetchDiff(owner: string, repo: string, sha: string, token: string): Promise<string> {
    const url = `https://api.github.com/repos/${owner}/${repo}/commits/${sha}`;
    const res = await axios.get(url, {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/vnd.github.v3.diff",
        },
    });
    return res.data;
}

export async function POST(req: Request) {
    const raw = await req.text();
    const sig = req.headers.get("X-Hub-Signature-256");
    const event = req.headers.get("X-Github-Event");
    const secret = process.env.GITHUB_WEBHOOK_SECRET;
    const token = process.env.GITHUB_TOKEN;

    if (!sig || !secret || !token) return Response.json({ message: "Missing credentials" }, { status: 400 });

    const hmac = crypto.createHmac("sha256", secret).update(raw).digest("hex");
    if (!crypto.timingSafeEqual(Buffer.from(`sha256=${hmac}`), Buffer.from(sig))) {
        return Response.json({ message: "Invalid signature" }, { status: 400 });
    }

    const payload = JSON.parse(raw);
    await connectToDB();

    const [owner, repo] = payload.repository.full_name.split("/");

    if (event === "ping") return Response.json({ ok: true }, { status: 200 });

    if (event === "push") {
        for (const commit of payload.commits || []) {
            const diff = await fetchDiff(owner, repo, commit.id, token);

            const prompt = `
Commit Summary:
Message: ${commit.message}
Diff:
${diff}
      `;

            const summary = await streamSummarize(prompt);
            const thread = await Thread.findOne({ "integration.githubId": payload.repository.id });
            if (thread) {
                await Comment.create({
                    threadId: thread._id,
                    author: "AI",
                    authorAvatar: "https://example.com/ai-avatar.png",
                    content: summary,
                });
            }
        }
        return Response.json({ ok: true }, { status: 200 });
    }

    if (event === "pull_request") {
        const pr = payload.pull_request;
        const diff = await fetchDiff(owner, repo, pr.head.sha, token);

        const prompt = `
PR Summary (${payload.action}):
Title: ${pr.title}
Body: ${pr.body}
Diff:
${diff}
    `;

        const summary = await streamSummarize(prompt);
        const thread = await Thread.findOne({ "integration.githubId": payload.repository.id });
        if (thread) {
            const comment = await Comment.create({
                threadId: thread._id,
                author: "AI",
                authorAvatar: "https://example.com/ai-avatar.png",
                content: summary,
            });
            return Response.json(comment, { status: 200 });
        }
    }

    return Response.json({ ok: true }, { status: 204 });
}
