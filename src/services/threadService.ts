import axios from "axios";

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
}

export const threadService = new ThreadService();
