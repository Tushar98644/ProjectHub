import { Message } from "@/db/models";

export const createMessage = async (req: Request) => {
    const body = await req.json();
    const { name, email, message } = body;

    if (!name || !email || !message)
        return Response.json(
            { message: "Please fill all fields" },
            { status: 400 }
        );

    try {
        const NewMessage = await Message.create({
            name,
            email,
            message,
        });
        return Response.json(
            { success: true, data: NewMessage },
            { status: 201 }
        );
    } catch (err) {
        return Response.json(
            { message: "Error creating message" },
            { status: 400 }
        );
    }
};

export const getMessages = async (req: Request) => {
    try {
        const messages = await Message.find().sort({ createdAt: -1 });
        return messages;
    } catch (err) {
        return Response.json(
            { message: "Error fetching message" },
            { status: 400 }
        );
    }
};
