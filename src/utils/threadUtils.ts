import { auth } from "@/config/auth/server";
import { Thread } from "@/db/models";
import connectToDB from "@/lib/mongoose";
import { headers } from "next/headers";

export const createThread = async (req: Request) => {};

export const getThreads = async (req: Request) => {
    try {
        const threads = await Thread.find().sort({
            createdAt: -1,
        });
        return threads;
    } catch (err) {
        return Response.json({ message: "Error fetching discussion" });
    }
};
