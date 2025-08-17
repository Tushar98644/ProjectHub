import connectToDB from "@/lib/mongoose";
import { createProject, getProjects } from "@/utils";

export async function GET(request: Request) {
    await connectToDB();

    try {
        const projects = await getProjects(request);
        return Response.json(projects);
    } catch (err) {
        return Response.json({ err: "Failed to fetch projects" }, { status: 400 });
    }
}

export async function POST(request: Request) {
    return createProject(request);
}
