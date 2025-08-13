import { Project } from "@/types/project";
import axios from "axios";

class UserService {
    async fetchProjects(): Promise<Project[]> {
        const res = await axios.get("/api/v1/projects");
        return res.data;
    }
}

export const userService = new UserService();
