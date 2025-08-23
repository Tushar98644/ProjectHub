import { User } from "@/types/user";
import axios from "axios";

const api = axios.create({
    baseURL: "/api/auth",
    headers: { "Content-Type": "application/json" },
});

export const userApi = {
    getUsers: async (q: string): Promise<User[]> => {
        const res = await api.get("/users", { params: { query: q } });
        return res.data;
    },
};
