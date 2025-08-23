import { threadService } from "@/services/threadService";
import { requireAuth } from "@/lib/requireAuth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        await requireAuth(req as any);
        const { searchParams } = new URL(req.url);
        const email = searchParams.get("email") ?? undefined;

        const threads = await threadService.getThreads(email);
        return NextResponse.json(threads, { status: 200 });
    } catch (error) {
        console.error("Failed to fetch threads", error);
        return NextResponse.json({ message: "Failed to fetch threads" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const session = await requireAuth(req as any);
        const author = session?.user?.email;

        if (!author) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const { title, description, tags } = body;

        if (!title || !description) {
            return NextResponse.json({ message: "Please fill all fields" }, { status: 400 });
        }

        const thread = await threadService.createThread({ author, title, description, tags });
        return NextResponse.json(thread, { status: 201 });
    } catch (error) {
        console.error("Error creating discussion", error);
        return NextResponse.json({ message: "Error creating discussion" }, { status: 500 });
    }
}
