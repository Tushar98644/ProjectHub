import Comment from "@/db/models/comment";
import connectToDB from "@/lib/mongoose";
import { requireAuth } from "@/lib/requireAuth";

export async function GET(req: Request) {
    try {
        await requireAuth(req);

        const { searchParams } = new URL(req.url);
        const threadId = searchParams.get("threadId");

        await connectToDB();

        const comments = await Comment.find({ threadId });
        return Response.json(comments, { status: 200 });
    } catch (err) {
        return Response.json({ message: "Failed to fetch comments" }, { status: 400 });
    }
}

export async function POST(req: Request) {
    try {
        const session = await requireAuth(req);
        const author = session?.user?.email;
        const authorAvatar = session?.user?.image;

        await connectToDB();

        const { searchParams } = new URL(req.url);
        const threadId = searchParams.get("threadId");

        console.log(`threadId from api: ${threadId}`);

        const body = await req.json();
        const { content } = body;

        console.log(threadId, author, authorAvatar, content);

        if (!author || !content || !threadId || !authorAvatar)
            return Response.json({ message: "Please fill all fields" }, { status: 400 });

        const comment = await Comment.create({
            threadId,
            author,
            authorAvatar,
            content,
        });
        return Response.json(comment, { status: 200 });
    } catch (err) {
        return Response.json({ message: "Error creating message" }, { status: 400 });
    }
}
