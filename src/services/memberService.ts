import axios from "axios";

class MemberService {
    public async getMembers(threadId: string) {
        const res = await axios.get(`/api/v1/members`, {
            params: { threadId },
        });
        return res.data;
    }

    public async getTeamMembers() {
        const res = await axios.get("/api/v1/members");
        return res.data;
    }
}

export const memberService = new MemberService();
