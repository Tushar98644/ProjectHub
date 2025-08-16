import { auth } from "@/config/auth/server";
import { Thread } from "@/db/models";
import connectToDB from "@/lib/mongoose";
import { headers } from "next/headers";

export const createThread = async (req: Request) => {
    try {
        const session = await auth.api.getSession({
            headers: await headers(),
        });

        if (!session) {
            return Response.json({ message: "Unauthorized" }, { status: 401 });
        }

        const author = session?.user?.email;

        await connectToDB();

        const body = await req.json();
        const { title, description, projectId, tags } = body;

        if (!author || !title || !description || !projectId || !tags)
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
};

export const getThreads = async (req: Request) => {
    const { searchParams } = new URL(req.url);
    const projectId = searchParams.get("projectId");

    try {
        const threads = await Thread.find({ projectId }).sort({
            createdAt: -1,
        });
        return threads;
    } catch (err) {
        return Response.json({ message: "Error fetching discussion" });
    }
};
