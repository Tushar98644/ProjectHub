import { Discussion } from "@/models";
import { NextApiRequest, NextApiResponse } from "next";

export const createDiscussion = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    const { name, profile, message } = req.body;
    const { id: page_id } = req.query;

    if (!name || !profile || !message)
        return res.status(400).json({ message: "Please fill all fields" });

    try {
        const NewDiscussion = await Discussion.create({
            name,
            profile,
            message,
            page_id,
        });
        console.log(`The discussion recieved is ${NewDiscussion}`);
        return res.status(201).json({ success: true, data: NewDiscussion });
    } catch (err) {
        console.log(err);
        return res.status(400).json({ messge: "Error creating discussion" });
    }
};

export const getDiscussions = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    const { id: page_id } = req.query;

    try {
        const discussions = await Discussion.find({ page_id }).sort({
            createdAt: -1,
        });
        console.log(`The discussion data the api sending is ${discussions}`);
        return res.status(200).json(discussions);
    } catch (err) {
        console.log(err);
        return res.status(400).json({ message: "Error fetching discussion" });
    }
};
