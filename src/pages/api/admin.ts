import { fetchProjects, updateProject } from "@/utils";
import { NextApiResponse, NextApiRequest } from "next";

const Admin = async (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req;

    switch (method) {
        case "GET":
            await fetchProjects(req, res);
            break;
        case "POST":
            await updateProject(req, res);
            break;
        default:
            return res
                .status(405)
                .json({ success: false, message: "Method Not Allowed" });
    }
};
export default Admin;
