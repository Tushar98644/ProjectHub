/* eslint-disable react-hooks/rules-of-hooks */
import { NextApiRequest, NextApiResponse } from "next";
import { Discussion } from "@/models";

const Discussions = async (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req;
    const { id: page_id } = req.query;
    console.log(`The id is ${page_id}`);

    if (method == "GET") {
        const discussion = res.json(
            await Discussion.find({ page_id }).sort({ createdAt: -1 })
        );
        console.log(`The discussion data the api sending is ${discussion}`);
    }

    if (method == "POST") {
        const { name, profile, message } = req.body;

        const NewDiscussion = await Discussion.create({
            name,
            profile,
            message,
            page_id,
        });

        console.log(`The discussion recieved is ${NewDiscussion}`);
        return res.status(201).json({ success: true, data: NewDiscussion });
    }
};

export default Discussions;
