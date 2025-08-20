import connectToDB from "@/lib/mongoose";
import { requireAuth } from "@/lib/requireAuth";
import Invitation from "@/db/models/invitation";

export async function GET(req: Request) {
    try {
        const session = await requireAuth(req);
        if (!session) return Response.json({ message: "Unauthorized" }, { status: 401 });

        const userEmail = session?.user?.email;
        await connectToDB();

        const [received, sent] = await Promise.all([
            Invitation.find({ receiverEmail: userEmail }).sort({ createdAt: -1 }),
            Invitation.find({ senderEmail: userEmail }).sort({ createdAt: -1 }),
        ]);

        const invitations = { received, sent };
        return Response.json(invitations, { status: 200 });
    } catch (err) {
        return Response.json({ message: "Failed to fetch invitations" }, { status: 400 });
    }
}

export async function POST(req: Request) {
    try {
        const session = await requireAuth(req);
        if (!session) return Response.json({ message: "Unauthorized" }, { status: 401 });

        const body = await req.json();
        const { threadId, receiverEmail, role } = body;

        if (!threadId || !receiverEmail || !role) {
            return Response.json({ message: "Missing fields" }, { status: 400 });
        }

        if (receiverEmail === session.user?.email) {
            return Response.json({ message: "Cannot invite yourself" }, { status: 400 });
        }
        await connectToDB();

        const invitation = await Invitation.create({
            threadId,
            senderEmail: session?.user?.email,
            receiverEmail,
            role,
        });
        return Response.json(invitation, { status: 200 });
    } catch (err) {
        return Response.json({ message: "Error creating invitation" }, { status: 400 });
    }
}
