import Project from "@/db/models/project";
import { Project as ProjectType } from "@/types/project";
import connectToDB from "@/lib/mongoose";

class ProjectService {
    public async getAllProjects(): Promise<ProjectType[]> {
        await connectToDB();
        return await Project.find({});
    }

    public async getProject(id: string): Promise<ProjectType | null> {
        await connectToDB();
        return await Project.findById(id);
    }

    public async createProject(projectData: ProjectType): Promise<ProjectType> {
        await connectToDB();
        const project = new Project(projectData);
        return await project.save();
    }
}

export const projectService = new ProjectService();
