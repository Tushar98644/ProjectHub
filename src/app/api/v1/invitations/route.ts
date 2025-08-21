import connectToDB from "@/lib/mongoose";
import { requireAuth } from "@/lib/requireAuth";
import Invitation from "@/db/models/invitation";
import Member from "@/db/models/member";

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
        const { threadId, threadTitle, receiverEmail, role } = body;

        if (!threadId || !threadTitle || !receiverEmail || !role) {
            return Response.json({ message: "Missing fields" }, { status: 400 });
        }

        if (receiverEmail === session.user?.email) {
            return Response.json({ message: "Cannot invite yourself" }, { status: 400 });
        }
        await connectToDB();

        const invitation = await Invitation.create({
            threadId,
            threadTitle,
            senderEmail: session?.user?.email,
            receiverEmail,
            role,
        });
        return Response.json(invitation, { status: 200 });
    } catch (err) {
        return Response.json({ message: "Error creating invitation" }, { status: 400 });
    }
}

export async function PATCH(req: Request) {
    try {
        const session = await requireAuth(req);
        if (!session) return Response.json({ message: "Unauthorized" }, { status: 401 });

        const { invitationId, status } = await req.json();
        if (!invitationId || !status) {
            return Response.json({ message: "invitationId and status are required" }, { status: 400 });
        }
        if (!["ACCEPTED", "DECLINED"].includes(status)) {
            return Response.json({ message: "Invalid status" }, { status: 400 });
        }

        await connectToDB();

        const inv = await Invitation.findById(invitationId);
        if (!inv) return Response.json({ message: "Not found" }, { status: 404 });

        const user = session.user;
        if (inv.receiverEmail !== user.email) {
            return Response.json({ message: "Forbidden" }, { status: 403 });
        }

        if (inv.status && inv.status !== "PENDING") {
            return Response.json({ ok: true, status: inv.status }, { status: 200 });
        }

        await Invitation.updateOne({ _id: invitationId }, { $set: { status } });

        if (status === "ACCEPTED") {
            await Member.updateOne(
                { threadId: String(inv.threadId), email: user.email },
                {
                    $setOnInsert: {
                        authorEmail: inv.senderEmail || "",
                    },
                    $set: {
                        role: inv.role,
                        avatar: user.image || "",
                        threadTitle: inv.threadTitle || "",
                    },
                },
                { upsert: true }
            );
        }

        return Response.json({ ok: true, status }, { status: 200 });
    } catch {
        return Response.json({ message: "Failed to update invitation" }, { status: 400 });
    }
}
