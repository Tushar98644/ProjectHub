import axios from "axios";
import Member from "@/db/models/member";

export interface CreateMemberData {
    threadId: string;
    threadTitle: string;
    email: string;
    name: string;
    avatar?: string;
    authorEmail: string;
    role: string;
}

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

    public async createThreadAdmin(threadId: string, threadTitle: string, user: any): Promise<any> {
        const memberData: CreateMemberData = {
            threadId,
            threadTitle,
            email: user.email,
            name: user.name,
            avatar: user.image,
            authorEmail: user.email,
            role: "admin",
        };

        return await Member.create(memberData);
    }
}

export const memberService = new MemberService();
