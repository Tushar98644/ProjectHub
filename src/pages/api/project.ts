// import mongooseconnect from "@/lib/mongoose";
import { createProject, getProjects } from "@/utils";
import { NextApiResponse, NextApiRequest } from "next";

export const projectHandler = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    const { method } = req;

    switch (method) {
        case "GET":
            await getProjects(req, res);
            break;
        case "POST":
            await createProject(req, res);
            break;
        default:
            res.status(405).json({ message: "Method Not Allowed" });
    }
};

export default projectHandler;
