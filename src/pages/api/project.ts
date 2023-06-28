import mongooseconnect from "@/lib/mongoose";
import {Project} from "@/models";
import { NextApiResponse, NextApiRequest } from "next";

const NewProject = async (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req;
    await mongooseconnect();

    if (method === "GET") {
        res.json(await Project.find());
        console.log(await Project.find());
    }

    if (method === "POST") {
        const { title, description ,image,github} = req.body;
        const NewProduct = await Project.create({
            title,
            description,
            image,
            github
        });
        console.log(NewProduct);
        return res.status(201).json({ success: true, data: NewProduct });    
    }    
};
export default NewProject;
