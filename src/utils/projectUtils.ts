import { Project } from "@/db/models";

export const createProject = async (req: Request) => {
    const body = await req.json();
    const {
        author,
        authorAvatar,
        title,
        description,
        image,
        githubUrl,
        liveUrl = "",
        techStack,
        tags = [],
        status,
    } = body;

    if (!author || !authorAvatar || !title || !description || !image || !githubUrl || !techStack || !status) {
        return Response.json({ message: "Missing required fields" }, { status: 400 });
    }

    if (!Array.isArray(tags)) {
        return Response.json({ message: "Tags must be an array" }, { status: 400 });
    }

    try {
        const newProject = await Project.create({
            author,
            authorAvatar,
            title,
            description,
            image,
            githubUrl,
            liveUrl,
            techStack,
            tags,
            status,
        });

        console.log(`The project received is ${newProject._id}`);
        return Response.json({ message: "Project created successfully", id: newProject._id }, { status: 200 });
    } catch (err) {
        console.error(err);
        return Response.json({ err: "Unable to create project" }, { status: 500 });
    }
};

export const getProjects = async (req: Request) => {
    try {
        const { searchParams } = new URL(req.url);
        const projectId = searchParams.get("projectId");
        console.log(`The projectId received is ${projectId}`);

        if (projectId) {
            const project = await Project.findOne({ _id: projectId });
            return project;
        }

        const projects = await Project.find().sort({ createdAt: -1 });
        return projects;
    } catch (err) {
        console.error(err);
        return Response.json({ err: "Error in fetching projects" }, { status: 400 });
    }
};
