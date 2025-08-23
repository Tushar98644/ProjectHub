import Member from "@/db/models/member";
import { Member as MemberType } from "@/types/member";
import connectToDB from "@/lib/mongoose";

interface CreateMemberData {
    threadId: string;
    threadTitle: string;
    email: string;
    name: string;
    avatar?: string;
    authorEmail: string;
    role: string;
}

class MemberService {
    public async getMembers(threadId?: string, email?: string): Promise<MemberType[]> {
        await connectToDB();
        if (threadId) {
            return await Member.find({ threadId });
        }
        if (email) {
            return await Member.find({ authorEmail: email });
        }
        return [];
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
