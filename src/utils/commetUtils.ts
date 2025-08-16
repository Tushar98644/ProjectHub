import { auth } from "@/config/auth/server";
import { Comment } from "@/db/models";
import connectToDB from "@/lib/mongoose";
import { headers } from "next/headers";

export const createComment = async (req: Request) => {
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
        const { content } = body;

        if (!author || !content)
            return Response.json(
                { message: "Please fill all fields" },
                { status: 400 }
            );

        const comment = await Comment.create({
            author,
        });
        return Response.json(comment, { status: 200 });
    } catch (err) {
        return Response.json(
            { message: "Error creating message" },
            { status: 400 }
        );
    }
};
