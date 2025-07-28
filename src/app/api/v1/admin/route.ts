import { fetchProjects, updateProject } from "@/utils";

export async function GET(request: Request) {
    try {
        const projects = await fetchProjects(request);
        return Response.json(projects, { status: 200 });
    } catch (error) {
        return Response.json(
            { message: "Error fetching projects" },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    return updateProject(request);
}
