import { createMessage, getMessages } from "@/utils";
import { NextApiRequest, NextApiResponse } from "next";

const Messages = async (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req;

    switch (method) {
        case "GET":
            await getMessages(req, res);
            break;
        case "POST":
            await createMessage(req, res);
            break;
        default:
            res.status(500).json({ message: "Method not allowed" });
    }
};

export default Messages;
