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

    async createBasicThread(repoData: any, userEmail: string, tags: string[]) {
        const fullName = repoData.full_name;
        const [owner, name] = fullName.includes("/") ? fullName.split("/") : ["", fullName];
        const thread = new Thread({
            title: `${name} • GitHub`,
            author: userEmail,
            description: repoData.description,
            tags,
            integration: {
                provider: repoData.provider,
                githubOwner: owner || "",
                githubRepo: name || "",
                githubUrl: repoData.html_url,
                githubId: String(repoData.id),
            },
        });

        return await thread.save();
    }
}

export const threadService = new ThreadService();
