import { projectService } from "@/services/projectService";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        const projects = await projectService.getAllProjects();
        return NextResponse.json(projects);
    } catch (error) {
        console.error("Failed to fetch projects", error);
        return NextResponse.json({ message: "Failed to fetch projects" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const projectData = await req.json();
        const project = await projectService.createProject(projectData);
        return NextResponse.json(project, { status: 201 });
    } catch (error) {
        console.error("Failed to create project", error);
        return NextResponse.json({ message: "Failed to create project" }, { status: 500 });
    }
}
