import mongooseconnect from "@/lib/mongoose";
import { Project } from "@/models";
import { NextApiResponse, NextApiRequest } from "next";

const NewProject = async (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req;
    await mongooseconnect();

    if (method === "GET") {
        const approved_projects = res.json(
            await Project.find({ approved: true }).sort({ createdAt: -1 })
        );
        console.log(`The approved projects are ${approved_projects}`);
    }

    if (method === "POST") {
        const { title, description, image, github, name, tags } = req.body;
        const NewProduct = await Project.create({
            title,
            description,
            image,
            github,
            name,
            tags,
        });
        console.log(`The project sent for approval is ${NewProduct}`);
        return res.status(201).json({ success: true, data: NewProduct });
    }
};

export default NewProject;
