import axios from "axios";

class ThreadService {
    public getAllThreads = async () => {
        const res = await axios.get("/api/v1/threads");
        return res.data;
    };

    public getThread = async (id: string) => {
        const res = await axios.get(`/api/v1/threads/${id}`);
        return res.data;
    };

    public createThread = async (
        projectId: string,
        title: string,
        description: string,
        tags: string[]
    ) => {
        const res = await axios.post("/api/v1/threads", {
            projectId,
            title,
            description,
            tags,
        });
        return res.data;
    };
}

export const threadService = new ThreadService();
