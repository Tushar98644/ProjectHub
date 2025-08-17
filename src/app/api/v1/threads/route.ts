import { Thread } from "@/db/models";
import connectToDB from "@/lib/mongoose";
import { requireAuth } from "@/lib/requireAuth";

export async function GET(req: Request) {
    try {
        await requireAuth(req);
        await connectToDB();

        const threads = await Thread.find().sort({ createdAt: -1 });
        return Response.json(threads, { status: 200 });
    } catch (err) {
        return Response.json(
            { message: "Failed to fetch threads" },
            { status: 401 }
        );
    }
}

export async function POST(req: Request) {
    try {
        const session = await requireAuth(req);
        const author = session?.user?.email;

        await connectToDB();

        const body = await req.json();
        const { title, description, projectId, tags } = body;

        if (!author || !title || !description || !projectId)
            return Response.json(
                { message: "Please fill all fields" },
                { status: 400 }
            );

        const data = { author, title, description, projectId, tags };
        const thread = await Thread.create(data);

        return Response.json(thread, { status: 200 });
    } catch (err) {
        return Response.json(
            { message: "Error creating discussion" },
            { status: 400 }
        );
    }
}
