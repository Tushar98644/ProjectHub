import { Project } from "@/models";

export const fetchProjects = async (req: Request) => {
    try {
        const projects = await Project.find().sort({ createdAt: -1 }).limit(50);
        return projects;
    } catch (err) {
        console.log(err);
        return Response.json(
            { message: "Error fetching projects" },
            { status: 400 }
        );
    }
};

export const updateProject = async (req: Request) => {
    const { projectId, approved } = await req.json();

    try {
        const updatedProject = await Project.findByIdAndUpdate(
            projectId,
            { approved: approved },
            { new: true }
        );

        if (!updatedProject) {
            console.log("Project not found");
            return Response.json(
                { success: false, message: "Project not found" },
                { status: 404 }
            );
        }

        console.log("aprroval granted", updatedProject);
        return Response.json(
            { success: true, data: updatedProject },
            { status: 201 }
        );
    } catch (err) {
        console.log(err);
        return Response.json(
            { message: "Error updating project" },
            { status: 400 }
        );
    }
};
