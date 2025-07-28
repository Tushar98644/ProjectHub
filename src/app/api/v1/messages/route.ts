import { getMessages, createMessage } from "@/utils";

export async function GET(request: Request) {
    try {
        const messages = await getMessages(request);
        return Response.json(messages, { status: 200 });
    } catch (error) {
        return Response.json(
            { message: "Error fetching messages" },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    return createMessage(request);
}
