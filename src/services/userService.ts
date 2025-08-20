import axios from "axios";

class UserService {
    public async getUsers(q: string) {
        const res = await axios.get("/api/auth/users", {
            params: { query: q },
        });
        return res.data;
    }
}

export const userService = new UserService();
