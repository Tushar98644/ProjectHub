import { Message } from "@/models";
import { NextApiRequest, NextApiResponse } from "next";

export const createMessage = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message)
        return res.status(400).json({ message: "Please fill all fields" });

    try {
        const NewMessage = await Message.create({
            name,
            email,
            message,
        });
        console.log(`The message recieved is ${NewMessage}`);
        return res.status(201).json({ success: true, data: NewMessage });
    } catch (err) {
        console.log(err);
        return res.status(400).json({ messge: "Error creating message" });
    }
};

export const getMessages = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    try {
        const messages = await Message.find().sort({ createdAt: -1 });
        console.log(`The message data the api sending is ${messages}`);
        return res.status(200).json(messages);
    } catch (err) {
        console.log(err);
        return res.status(400).json({ message: "Error fetching message" });
    }
};
