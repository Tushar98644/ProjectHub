import { Project } from "@/types/project";
import axios from "axios";

const api = axios.create({
    baseURL: "/api/v1",
    headers: { "Content-Type": "application/json" },
});

export const projectApi = {
    getProjects: async (): Promise<Project[]> => {
        const res = await api.get("/projects");
        return res.data;
    },

    getProject: async (id: string): Promise<Project> => {
        const res = await api.get(`/projects/${id}`);
        return res.data;
    },

    createProject: async (project: Project): Promise<Project> => {
        const res = await api.post("/projects", project);
        return res.data;
    },
};
