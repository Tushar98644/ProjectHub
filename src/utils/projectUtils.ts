import { NextApiRequest, NextApiResponse } from "next";
import { Project } from "@/models";
import project from "@/models/project";

export const createProject = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    const { title, description, image, github, name, tags } = req.body;

    if (!title || !description || !image || !github || !name)
        res.status(400).json({ message: "Missing required fields" });

    try {
        const NewProject = await Project.create({
            title,
            description,
            image,
            github,
            name,
            tags,
        });
        return res
            .status(200)
            .json({ message: "Project created successfully" });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ err: "Unable to create project" });
    }
};

export const getProjects = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    try {
        // const approved_projects = res.json(
        //     await Project.find({ approved: true }).sort({ createdAt: -1 })
        // );
        const approved_projects = await Project.find({ approved: "true" }).sort(
            { createdAt: -1 }
        );
        return res.status(200).json(approved_projects);
    } catch (err) {
        console.log(err);
        return res.status(400).json({ err: "Error in fetching projects" });
    }
};
