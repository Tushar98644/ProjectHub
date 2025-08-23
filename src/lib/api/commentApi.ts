import axios from "axios";
import { Comment } from "@/types/comment";

const api = axios.create({
    baseURL: "/api/v1",
    headers: { "Content-Type": "application/json" },
});

export const commentApi = {
    getComments: async (threadId: string): Promise<Comment[]> => {
        const res = await api.get("/comments", { params: { threadId } });
        return res.data;
    },

    createComment: async (content: string, threadId: string): Promise<Comment> => {
        const res = await api.post("/comments", { content }, { params: { threadId } });
        return res.data;
    },
};
