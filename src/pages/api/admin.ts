import mongooseconnect from "@/lib/mongoose";
import {Project} from "@/models";
import { NextApiResponse, NextApiRequest } from "next";

const Admin = async (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req;
    await mongooseconnect();

    if (method === "GET") {
        const projects = res.json(await Project.find().sort({createdAt: -1}).limit(10));
        console.log(projects);
    } 
    
    if (method === "POST") {
        const { projectId , approved} = req.body;

        const updatedProject = await Project.findByIdAndUpdate(projectId, {approved: approved}, {new: true });

        if (!updatedProject) {
            console.log("Project not found");
            return res.status(404).json({ success: false, message: 'Project not found' });
        }

        console.log("aprroval granted",updatedProject);
        return res.status(201).json({ success: true, data: updatedProject });
    }
};
export default Admin;
