import { NextApiRequest, NextApiResponse } from "next";
import { createDiscussion, getDiscussions } from "@/utils";

const handleDiscussions = async (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req;

    switch (method) {
        case "GET":
            await getDiscussions(req, res);
            break;

        case "POST":
            await createDiscussion(req, res);
            break;

        default:
            res.status(500).json({ message: "Method not allowed" });
    }
};

export default handleDiscussions;
