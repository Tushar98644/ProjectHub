import { createDiscussion, getDiscussions } from "@/utils";

export async function GET(req: Request) {
    try {
        const messages = await getDiscussions(req);
        return Response.json(messages, { status: 200 });
    } catch (error) {
        return Response.json(
            { message: "Error fetching messages" },
            { status: 500 }
        );
    }
}

export async function POST(req: Request) {
    return createDiscussion(req);
}
