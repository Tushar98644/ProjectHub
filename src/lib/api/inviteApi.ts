import { Invitation } from "@/types/invitation";
import axios from "axios";

const api = axios.create({
    baseURL: "/api/v1",
    headers: { "Content-Type": "application/json" },
});

export const inviteApi = {
    getInvites: async (): Promise<{ received: Invitation[]; sent: Invitation[] }> => {
        const res = await api.get("/invitations");
        return res.data;
    },

    sendInvite: async (payload: {
        threadId: string;
        threadTitle: string;
        receiverEmail: string;
        role: "admin" | "member";
    }): Promise<Invitation> => {
        const res = await api.post("/invitations", payload);
        return res.data;
    },

    acceptInvite: async (invitationId: string): Promise<any> => {
        const res = await api.patch(`/invitations`, { invitationId, status: "ACCEPTED" });
        return res.data;
    },

    declineInvite: async (invitationId: string): Promise<any> => {
        const res = await api.patch(`/invitations`, { invitationId, status: "DECLINED" });
        return res.data;
    },
};
