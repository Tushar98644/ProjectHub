import axios from "axios";

class InviteService {
    public async getInvites() {
        const res = await axios.get("/api/v1/invitations");
        return res.data;
    }

    public async sendInvite(payload: { threadId: string; receiverEmail: string; role: "admin" | "member" }) {
        const res = await axios.post("/api/v1/invitations", payload);
        return res.data;
    }
}

export default new InviteService();
