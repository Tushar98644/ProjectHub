import { Member } from "@/types/member";
import axios from "axios";

const api = axios.create({
    baseURL: "/api/v1",
    headers: { "Content-Type": "application/json" },
});

export const memberApi = {
    getMembers: async (threadId?: string): Promise<Member[]> => {
        const res = await api.get("/members", { params: { threadId } });
        return res.data;
    },
};
