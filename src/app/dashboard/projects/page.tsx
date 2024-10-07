'use client'
import { DashLayout } from "@/components/Layout/Layout";

const MyProjects = () => {
    const projects = [
        { name: "Project A", description: "A web application for task management", status: "In Progress" },
        { name: "Project B", description: "A mobile app for finance tracking", status: "Completed" },
        { name: "Project C", description: "A machine learning model for image recognition", status: "In Progress" },
    ];

    return (
        <DashLayout>
            <div className="space-y-6">
                <h2 className="text-3xl font-bold">My Projects</h2>
                <div className="space-y-4">
                    {projects.map((project, index) => (
                        <div key={index} className="bg-white p-6 shadow-lg rounded-lg">
                            <h3 className="text-xl font-semibold">{project.name}</h3>
                            <p>{project.description}</p>
                            <span className={`text-sm ${project.status === "In Progress" ? "text-yellow-500" : "text-green-500"}`}>
                                {project.status}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </DashLayout>
    );
};

export default MyProjects;