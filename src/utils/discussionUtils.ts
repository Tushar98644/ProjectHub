import { Discussion } from "@/models";

export const createDiscussion = async (req: Request) => {
    const body = await req.json();
    const { name, profile, message, page_id } = body;

    if (!name || !profile || !message)
        return Response.json(
            { message: "Please fill all fields" },
            { status: 400 }
        );

    try {
        const NewDiscussion = await Discussion.create({
            name,
            profile,
            message,
            page_id,
        });
        return Response.json(
            { success: true, data: NewDiscussion },
            { status: 201 }
        );
    } catch (err) {
        return Response.json(
            { message: "Error creating discussion" },
            { status: 400 }
        );
    }
};

export const getDiscussions = async (req: Request) => {
    const { searchParams } = new URL(req.url);
    const page_id = searchParams.get("id");

    try {
        const discussions = await Discussion.find({ page_id }).sort({
            createdAt: -1,
        });
        return discussions;
    } catch (err) {
        return Response.json({ message: "Error fetching discussion" });
    }
};
