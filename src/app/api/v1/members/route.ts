import connectToDB from "@/lib/mongoose";
import { requireAuth } from "@/lib/requireAuth";
import Member from "@/db/models/member";

export async function GET(req: Request) {
    try {
        const session = await requireAuth(req);
        if (!session) return Response.json({ message: "Unauthorized" }, { status: 401 });

        const email = session?.user?.email;

        const threadId = new URL(req.url).searchParams.get("threadId");

        await connectToDB();

        if (email) {
            const member = await Member.find({ authorEmail: email });
            if (!member) return Response.json({ message: "Not found" }, { status: 404 });
            return Response.json(member, { status: 200 });
        }

        const member = await Member.find({ threadId });
        if (!member) return Response.json({ message: "Not found" }, { status: 404 });

        return Response.json(member, { status: 200 });
    } catch (err) {
        return Response.json({ message: "Failed to fetch member" }, { status: 400 });
    }
}
