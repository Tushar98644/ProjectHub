import axios from "axios";

class ThreadService {
    public getAllThreads = async () => {
        const res = await axios.get("/api/v1/threads");
        return res.data;
    };

    public getThread = async (id: string) => {
        const res = await axios.get("/api/v1/discussions", {
            params: { id },
        });
        return res.data;
    };

    public createThread = async (thread: any) => {
        const res = await axios.post("/api/v1/discussions", thread);
        return res.data;
    };
}

export const threadService = new ThreadService();
