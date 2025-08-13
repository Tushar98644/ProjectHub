import { Project } from "@/types/project";
import axios from "axios";

class ProjectService {
    public async fetchProjects(): Promise<Project[]> {
        const res = await axios.get("/api/v1/projects");
        return res.data;
    }

    public async createProject() {}
}

export const projectService = new ProjectService();
