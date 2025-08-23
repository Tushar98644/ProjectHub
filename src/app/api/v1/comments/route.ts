import { commentService } from "@/services/commentService";
import { requireAuth } from "@/lib/requireAuth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        await requireAuth(req as any);

        const { searchParams } = new URL(req.url);
        const threadId = searchParams.get("threadId");

        if (!threadId) {
            return NextResponse.json({ message: "threadId is required" }, { status: 400 });
        }

        const comments = await commentService.getComments(threadId);
        return NextResponse.json(comments, { status: 200 });
    } catch (err) {
        console.error("Failed to fetch comments", err);
        return NextResponse.json({ message: "Failed to fetch comments" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const session = await requireAuth(req as any);
        const author = session?.user?.email;
        const authorAvatar = session?.user?.image;

        if (!author || !authorAvatar) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const threadId = searchParams.get("threadId");
        if (!threadId) {
            return NextResponse.json({ message: "threadId is required" }, { status: 400 });
        }

        const body = await req.json();
        const { content } = body;

        if (!content) {
            return NextResponse.json({ message: "Content is required" }, { status: 400 });
        }

        const comment = await commentService.createComment({
            threadId,
            author,
            authorAvatar,
            content,
        });
        return NextResponse.json(comment, { status: 201 });
    } catch (err) {
        console.error("Error creating message", err);
        return NextResponse.json({ message: "Error creating message" }, { status: 500 });
    }
}
