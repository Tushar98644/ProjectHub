import { Thread } from "@/db/models";
import connectToDB from "@/lib/mongoose";
import { requireAuth } from "@/lib/requireAuth";

type RouteParams = { params: Promise<{ id: string }> };

export async function GET(req: Request, { params }: RouteParams) {
    try {
        await requireAuth(req);
        await connectToDB();

        const { id } = await params;
        const thread = await Thread.findById(id);
        return Response.json(thread, { status: 200 });
    } catch (err) {
        return Response.json(
            { message: "Failed to fetch thread" },
            { status: 400 }
        );
    }
}

export async function DELETE(req: Request, { params }: RouteParams) {
    try {
        const session = await requireAuth(req);
        await connectToDB();

        const user = session?.user?.email;
        const { id } = await params;
        const thread = await Thread.findById(id);

        if (!thread)
            return Response.json(
                { message: "Thread not found" },
                { status: 404 }
            );

        if (thread.author !== user)
            return Response.json({ message: "Unauthorized" }, { status: 401 });

        await Thread.findByIdAndDelete(id);
        return Response.json({ message: "Thread deleted" }, { status: 200 });
    } catch (err) {
        return Response.json(
            { message: "Failed to delete thread" },
            { status: 400 }
        );
    }
}
