import { createComment } from "@/utils";

export async function POST(request: Request) {
    return createComment(request);
}
