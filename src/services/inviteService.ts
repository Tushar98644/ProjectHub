import axios from "axios";

class InviteService {
    public async getInvites() {
        const res = await axios.get("/api/v1/invitations");
        return res.data;
    }

    public async sendInvite(payload: {
        threadId: string;
        threadTitle: string;
        receiverEmail: string;
        role: "admin" | "member";
    }) {
        const res = await axios.post("/api/v1/invitations", payload);
        return res.data;
    }

    public async acceptInvite(invitationId: string) {
        const res = await axios.patch(`/api/v1/invitations`, {
            invitationId,
            status: "ACCEPTED",
        });
        return res.data;
    }

    public async declineInvite(invitationId: string) {
        const res = await axios.patch(`/api/v1/invitations`, {
            invitationId,
            status: "DECLINED",
        });
        return res.data;
    }
}

export default new InviteService();
