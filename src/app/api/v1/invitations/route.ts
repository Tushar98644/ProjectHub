import inviteService from "@/services/inviteService";
import { requireAuth } from "@/lib/requireAuth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const session = await requireAuth(req as any);
        if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

        const userEmail = session?.user?.email;
        if (!userEmail) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

        const invitations = await inviteService.getInvites(userEmail);
        return NextResponse.json(invitations, { status: 200 });
    } catch (err) {
        console.error("Failed to fetch invitations", err);
        return NextResponse.json({ message: "Failed to fetch invitations" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const session = await requireAuth(req as any);
        if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

        const body = await req.json();
        const { threadId, threadTitle, receiverEmail, role } = body;

        if (!threadId || !threadTitle || !receiverEmail || !role) {
            return NextResponse.json({ message: "Missing fields" }, { status: 400 });
        }
        if (receiverEmail === session.user?.email) {
            return NextResponse.json({ message: "Cannot invite yourself" }, { status: 400 });
        }

        const invitation = await inviteService.sendInvite({
            ...body,
            senderEmail: session.user?.email,
        });
        return NextResponse.json(invitation, { status: 200 });
    } catch (err) {
        console.error("Error creating invitation", err);
        return NextResponse.json({ message: "Error creating invitation" }, { status: 500 });
    }
}

export async function PATCH(req: NextRequest) {
    try {
        const session = await requireAuth(req as any);
        if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

        const { invitationId, status } = await req.json();
        if (!invitationId || !status) {
            return NextResponse.json({ message: "invitationId and status are required" }, { status: 400 });
        }

        if (!["ACCEPTED", "DECLINED"].includes(status)) {
            return NextResponse.json({ message: "Invalid status" }, { status: 400 });
        }

        const result = await inviteService.updateInviteStatus(invitationId, status, session.user);
        return NextResponse.json(result, { status: 200 });
    } catch (err: any) {
        console.error("Failed to update invitation", err);
        if (err.message === "Invitation not found") {
            return NextResponse.json({ message: err.message }, { status: 404 });
        }
        if (err.message === "Forbidden") {
            return NextResponse.json({ message: err.message }, { status: 403 });
        }
        return NextResponse.json({ message: "Failed to update invitation" }, { status: 500 });
    }
}
