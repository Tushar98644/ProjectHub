import { Thread } from "@/types/thread";
import axios from "axios";

const api = axios.create({
    baseURL: "/api/v1",
    headers: { "Content-Type": "application/json" },
});

export const threadApi = {
    getThreads: async (email?: string): Promise<Thread[]> => {
        const res = await api.get("/threads", { params: { email } });
        return res.data;
    },

    getThread: async (id: string): Promise<Thread> => {
        const res = await api.get(`/threads/${id}`);
        return res.data;
    },

    createThread: async (data: { title: string; description: string; tags: string[] }): Promise<Thread> => {
        const res = await api.post("/threads", data);
        return res.data;
    },
};
