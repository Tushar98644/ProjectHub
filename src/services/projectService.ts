import { Project } from "@/types/project";
import axios from "axios";

class ProjectService {
    public async getAllProjects(): Promise<Project[]> {
        const res = await axios.get("/api/v1/projects");
        return res.data;
    }

    public async getProject(id: string): Promise<Project> {
        const res = await axios.get("/api/v1/projects", {
            params: { projectId: id },
        });
        return res.data;
    }

    public async createProject(project: Project) {
        const res = await axios.post("/api/v1/projects", project);
        return res.data;
    }
}

export const projectService = new ProjectService();
