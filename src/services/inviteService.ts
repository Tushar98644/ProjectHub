import Invitation from "@/db/models/invitation";
import Member from "@/db/models/member";
import { Invitation as InvitationType } from "@/types/invitation";
import connectToDB from "@/lib/mongoose";
import { Session } from "better-auth";

class InviteService {
    public async getInvites(userEmail: string): Promise<{ received: InvitationType[]; sent: InvitationType[] }> {
        await connectToDB();
        const [received, sent] = await Promise.all([
            Invitation.find({ receiverEmail: userEmail }).sort({ createdAt: -1 }),
            Invitation.find({ senderEmail: userEmail }).sort({ createdAt: -1 }),
        ]);
        return { received, sent };
    }

    public async sendInvite(payload: {
        threadId: string;
        threadTitle: string;
        receiverEmail: string;
        role: "admin" | "member";
        senderEmail: string;
    }): Promise<InvitationType> {
        await connectToDB();
        return await Invitation.create(payload);
    }

    public async updateInviteStatus(
        invitationId: string,
        status: "ACCEPTED" | "DECLINED",
        user: any
    ): Promise<{ ok: boolean; status: string }> {
        await connectToDB();
        const inv = await Invitation.findById(invitationId);
        if (!inv) {
            throw new Error("Invitation not found");
        }
        if (inv.receiverEmail !== user.email) {
            throw new Error("Forbidden");
        }
        if (inv.status && inv.status !== "PENDING") {
            return { ok: true, status: inv.status };
        }

        await Invitation.updateOne({ _id: invitationId }, { $set: { status } });
        if (status === "ACCEPTED") {
            await Member.updateOne(
                { threadId: String(inv.threadId), email: user.email as string },
                {
                    $setOnInsert: {
                        authorEmail: inv.senderEmail || "",
                    },
                    $set: {
                        role: inv.role,
                        avatar: user.image || "",
                        threadTitle: inv.threadTitle || "",
                    },
                },
                { upsert: true }
            );
        }
        return { ok: true, status };
    }
}

export default new InviteService();
