import { Message } from "@/models";
import { NextApiRequest, NextApiResponse } from "next";

const Messages = async (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req;

    if (method === "GET") {
        const messages = res.json(await Message.find().sort({ createdAt: -1 }));
        console.log(messages);
    }

    if (method === "POST") {
        const { name, email, message } = req.body;

        const newMessage = await Message.create({
            name,
            email,
            message,
        });

        console.log("new message", newMessage);
        return res.status(201).json({ success: true, data: newMessage });
    }
};

export default Messages;

    