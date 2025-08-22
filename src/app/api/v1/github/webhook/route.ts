import { Thread } from "@/db/models";
import connectToDB from "@/lib/mongoose";
import crypto from "crypto";
import Comment from "@/db/models/comment";
import { GoogleGenAI } from "@google/genai";

const gemini = new GoogleGenAI({
    apiKey: process.env.GOOGLE_API_KEY as string,
});

const summarizeCommit = async (commit: any) => {
    const prompt = `You are a helpful git commit summarizer. Summarize: ${commit.message}`;

    const response = await gemini.models.generateContentStream({
        model: "gemini-2.5-flash",
        contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    let commitSummary = "";
    for await (const chunk of response) {
        const chunkText = chunk.text;
        commitSummary += chunkText;
    }
    return commitSummary;
};

const summarizePR = async (pr: any, action: any) => {
    const prompt = `You are a helpful pull request summarizer. Summarize: ${pr.title}`;

    const response = await gemini.models.generateContentStream({
        model: "gemini-2.5-flash",
        contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    let prSummary = "";
    for await (const chunk of response) {
        const chunkText = chunk.text;
        prSummary += chunkText;
    }
    return prSummary;
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
            const summary = await summarizeCommit(commit);
            const thread = await Thread.findOne({ "integration.githubId": payload.repository.id });
            await Comment.create({
                threadId: thread?._id,
                author: "AI",
                authorAvatar:
                    "https://www.shutterstock.com/image-vector/chat-bot-icon-virtual-smart-600nw-2478937555.jpg",
                content: summary,
            });
        }
        return Response.json({ ok: true }, { status: 200 });
    }

    if (event === "pull_request") {
        const pr = payload.pull_request;
        const summary = await summarizePR(pr, payload.action);
        const thread = await Thread.findOne({ "integration.githubId": payload.repository.id });

        const comment = await Comment.create({
            threadId: thread?._id,
            author: "AI",
            authorAvatar: "https://www.shutterstock.com/image-vector/chat-bot-icon-virtual-smart-600nw-2478937555.jpg",
            content: summary,
        });
        return Response.json(comment, { status: 200 });
    }

    return Response.json({ ok: true }, { status: 204 });
}
