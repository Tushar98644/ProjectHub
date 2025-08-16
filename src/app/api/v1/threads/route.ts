import { createThread, getThreads } from "@/utils";

export async function GET(req: Request) {
    try {
        const threads = await getThreads(req);
        return Response.json(threads, { status: 200 });
    } catch (error) {
        return Response.json(
            { message: "Error fetching messages" },
            { status: 500 }
        );
    }
}

export async function POST(req: Request) {
    return createThread(req);
}
