import { NextApiRequest, NextApiResponse } from "next";
import { Project } from "@/models";

export const fetchProjects = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    try {
        const projects = await Project.find().sort({ createdAt: -1 }).limit(10);
        console.log(projects);
        return res.status(200).json(projects);
    } catch (err) {
        console.log(err);
        return res.status(400).json({ message: "Error fetching projects" });
    }
};

export const updateProject = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    const { projectId, approved } = req.body;

    try {
        const updatedProject = await Project.findByIdAndUpdate(
            projectId,
            { approved: approved },
            { new: true }
        );

        if (!updatedProject) {
            console.log("Project not found");
            return res
                .status(404)
                .json({ success: false, message: "Project not found" });
        }

        console.log("aprroval granted", updatedProject);
        return res.status(201).json({ success: true, data: updatedProject });
    } catch (err) {
        console.log(err);
        return res.status(400).json({ message: "Error updating project" });
    }
};
