import axios from "axios";
import { IntegrationData } from "./integrationService";
import { Thread } from "@/db/models";

export interface CreateThreadData {
    title: string;
    author: string;
    description: string;
    tags: string[];
    integration: Record<string, any>;
}

class ThreadService {
    public async getAllThreads() {
        const res = await axios.get("/api/v1/threads");
        return res.data;
    }

    public async getThreadsByEmail(email: string) {
        const res = await axios.get("/api/v1/threads", {
            params: { email },
        });
        return res.data;
    }

    public async getThread(id: string) {
        const res = await axios.get(`/api/v1/threads/${id}`);
        return res.data;
    }

    public async createThread(projectId: string, title: string, description: string, tags: string[]) {
        const res = await axios.post("/api/v1/threads", {
            projectId,
            title,
            description,
            tags,
        });
        return res.data;
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
