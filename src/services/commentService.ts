import axios from "axios";

class CommentService {
    async getComments(threadId: string) {
        const res = await axios.get("/api/v1/comments", {
            params: { threadId },
        });
        return res.data;
    }

    async createComment(content: string, threadId: string) {
        const res = await axios.post("/api/v1/comments", { content }, { params: { threadId } });
        return res.data;
    }
}

export const commentService = new CommentService();
