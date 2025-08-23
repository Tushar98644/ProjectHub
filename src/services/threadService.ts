import Thread from "@/db/models/thread";
import { Thread as ThreadType } from "@/types/thread";
import connectToDB from "@/lib/mongoose";
import { IntegrationData } from "./integrationService";

export interface CreateThreadData {
    title: string;
    author: string;
    description: string;
    tags: string[];
    integration: Record<string, any>;
}

class ThreadService {
    public async getThreads(email?: string): Promise<ThreadType[]> {
        await connectToDB();
        const query = email ? { author: email } : {};
        return await Thread.find(query).sort({ createdAt: -1 });
    }

    public async getThread(id: string): Promise<ThreadType | null> {
        await connectToDB();
        return await Thread.findById(id);
    }

    public async createThread(threadData: { title: string; description: string; tags: string[]; author: string }) {
        await connectToDB();
        const thread = new Thread(threadData);
        return await thread.save();
    }

    public async createThreadWithIntegration(
        integrationData: IntegrationData,
        author: string,
        tags: string[] = []
    ): Promise<any> {
        const threadDoc: CreateThreadData = {
            title: integrationData.title || "Untitled",
            author,
            description: integrationData.description,
            tags: Array.isArray(tags) ? tags : [],
            integration: integrationData.integration,
        };

        const thread = await Thread.create(threadDoc);
        return thread;
    }
}

export const threadService = new ThreadService();
