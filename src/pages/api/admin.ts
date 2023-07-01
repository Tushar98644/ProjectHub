import mongooseconnect from "@/lib/mongoose";
import {Project} from "@/models";
import { NextApiResponse, NextApiRequest } from "next";

const Admin = async (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req;
    await mongooseconnect();

    if (method === "GET") {
        res.json(await Project.find());
        console.log(await Project.find());
    }
};
export default Admin;
