/* eslint-disable react-hooks/rules-of-hooks */
import { NextApiRequest, NextApiResponse } from "next";

const Discussions = async (req: NextApiRequest, res: NextApiResponse) => {
    const { method, query } = req;

    if (method == "POST") {
        const { id } = query;
        console.log(`The page should be redirected to /discussion/${id}`);

        if (!id) {
            return res.status(400).json({ message: "Missing project ID" });
        } else {
            res.status(200).redirect(`/discussion/${id}`);
        }
    } else {
        return res.status(400).json({ message: "Wrong request method" });
    }
};

export default Discussions;
