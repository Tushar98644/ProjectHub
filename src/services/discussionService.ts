import axios from "axios";

class DiscussionService {
    public getDiscussion = async (id: string) => {
        const res = await axios.get("/api/v1/discussions", {
            params: { id },
        });
        return res.data;
    };
}

export const discussionService = new DiscussionService();
