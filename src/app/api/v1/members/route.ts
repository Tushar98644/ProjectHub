import { memberService } from "@/services/memberService";
import { requireAuth } from "@/lib/requireAuth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const session = await requireAuth(req as any);
        if (!session) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const email = session?.user?.email;
        const searchParams = new URL(req.url).searchParams;
        const threadId = searchParams.get("threadId") ?? undefined;

        const members = await memberService.getMembers(threadId, email);

        if (!members || members.length === 0) {
            return NextResponse.json({ message: "No members found" }, { status: 200 });
        }

        return NextResponse.json(members, { status: 200 });
    } catch (error) {
        console.error("Failed to fetch members", error);
        return NextResponse.json({ message: "Failed to fetch members" }, { status: 500 });
    }
}
