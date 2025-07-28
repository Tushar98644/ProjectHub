import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";

export const runtime = "edge";

export async function POST(req: Request) {
    const { messages } = await req.json();

    const result = streamText({
        model: openai("gpt-3.5-turbo"),
        messages: messages,
        maxTokens: 4000,
    });

    return result.toDataStreamResponse();
}
