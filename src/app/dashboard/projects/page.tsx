/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { DashLayout } from "@/components/Layout/Layout";
import { Project } from "@/types/project";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState, useCallback } from "react";
import {
    FaGlobe,
    FaLock,
    FaCheckCircle,
    FaTimesCircle,
    FaExternalLinkAlt,
    FaTag,
    FaSpinner,
    FaFolderOpen,
} from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyProjects = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [updatingProjectId, setUpdatingProjectId] = useState<string | null>(
        null
    );
    const { data: session } = useSession();
    console.log(session?.user?.email || "No user email found");
    const fetchProjects = useCallback(async () => {
        if (!session?.user?.name) {
            setIsLoading(false);
            return;
        }
        setIsLoading(true);
        try {
            const response = await axios.get("/api/v1/projects", {
                params: {
                    email: session.user.email,
                },
            });
            setProjects(
                response.data.map((p: Project) => ({
                    ...p,
                    isPublic: p.isPublic === undefined ? true : p.isPublic,
                }))
            );
        } catch (error) {
            console.error("Error fetching projects:", error);
            toast.error("Failed to fetch projects.");
        } finally {
            setIsLoading(false);
        }
    }, [session?.user?.name]);

    useEffect(() => {
        fetchProjects();
    }, [fetchProjects]);

    const handleToggleVisibility = async (
        projectId: string,
        currentIsPublic: boolean | undefined
    ) => {
        setUpdatingProjectId(projectId);
        const newIsPublic = !(currentIsPublic === undefined
            ? true
            : currentIsPublic); // Handle undefined case
        try {
            await axios.patch(`/api/project/${projectId}/visibility`, {
                isPublic: newIsPublic,
            });
            setProjects(prevProjects =>
                prevProjects.map(p =>
                    p._id === projectId ? { ...p, isPublic: newIsPublic } : p
                )
            );
            toast.success(
                `Project visibility updated to ${
                    newIsPublic ? "Public" : "Private"
                }.`
            );
        } catch (error) {
            console.error("Error updating project visibility:", error);
            toast.error("Failed to update project visibility.");
        } finally {
            setUpdatingProjectId(null);
        }
    };

    if (isLoading) {
        return (
            <DashLayout>
                <div className="flex justify-center items-center h-full">
                    <FaSpinner className="animate-spin text-sky-400 text-4xl" />
                    <p className="ml-3 text-slate-300">
                        Loading your projects...
                    </p>
                </div>
            </DashLayout>
        );
    }

    return (
        <DashLayout>
            <ToastContainer theme="dark" position="bottom-right" />
            <div className="container mx-auto px-4 py-2 md:px-6 md:py-4 text-slate-200 opacity-80">
                <header className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-sky-400">
                        My Projects
                    </h1>
                    <p className="text-slate-400 mt-1">
                        Manage and view the projects you have contributed.
                    </p>
                </header>

                {projects.length === 0 ? (
                    <div className="text-center py-10 bg-slate-800 rounded-lg shadow-xl">
                        <FaFolderOpen className="mx-auto text-5xl text-slate-500 mb-4" />
                        <h2 className="text-2xl font-semibold text-slate-300 mb-2">
                            No Projects Yet
                        </h2>
                        <p className="text-slate-400">
                            Looks like you have not added any projects. Start by
                            creating a new one!
                        </p>
                        {/* Optional: Add a Link to /project/new here */}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {projects.map(project => (
                            <div
                                key={project._id}
                                className="bg-slate-800 shadow-xl rounded-lg overflow-hidden flex flex-col"
                            >
                                <div className="p-6 flex-grow">
                                    <div className="flex items-start mb-4">
                                        <img
                                            src={
                                                project.image ||
                                                `https://ui-avatars.com/api/?name=${project.title.replace(
                                                    " ",
                                                    "+"
                                                )}&background=1E293B&color=94A3B8&size=128`
                                            }
                                            alt={`${project.title} avatar`}
                                            className="w-16 h-16 rounded-md object-cover mr-4 border-2 border-slate-700"
                                            onError={(e: any) => {
                                                e.target.onerror = null;
                                                e.target.src =
                                                    "/alternate.jpeg";
                                            }}
                                        />
                                        <div className="flex-1">
                                            <h2 className="text-xl font-semibold text-sky-400 hover:text-sky-300 transition-colors">
                                                <a
                                                    href={project.github}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center"
                                                >
                                                    {project.title}
                                                    <FaExternalLinkAlt className="ml-2 text-xs text-slate-500" />
                                                </a>
                                            </h2>
                                            <p className="text-xs text-slate-500">
                                                By: {project.name}
                                            </p>
                                        </div>
                                    </div>

                                    <p className="text-sm text-slate-300 mb-4 leading-relaxed line-clamp-3">
                                        {project.description}
                                    </p>

                                    {project.tags &&
                                        project.tags.length > 0 && (
                                            <div className="mb-4">
                                                <h4 className="text-xs font-semibold text-slate-500 uppercase mb-1.5 flex items-center">
                                                    <FaTag className="mr-1.5" />{" "}
                                                    Tags
                                                </h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {project.tags.map(tag => (
                                                        <span
                                                            key={tag}
                                                            className="px-2.5 py-0.5 text-xs bg-sky-500/20 text-sky-300 rounded-full"
                                                        >
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                </div>

                                <div className="bg-slate-700/50 px-6 py-4 border-t border-slate-700 flex flex-col sm:flex-row justify-between items-center gap-4">
                                    <div className="flex items-center space-x-4">
                                        <span
                                            className={`flex items-center text-xs px-2.5 py-1 rounded-full font-medium
                                            ${
                                                project.approved === true
                                                    ? "bg-green-500/20 text-green-400"
                                                    : project.approved === false
                                                    ? "bg-red-500/20 text-red-400"
                                                    : "bg-yellow-500/20 text-yellow-400"
                                            }`}
                                        >
                                            {project.approved === true ? (
                                                <FaCheckCircle className="mr-1.5" />
                                            ) : project.approved === false ? (
                                                <FaTimesCircle className="mr-1.5" />
                                            ) : (
                                                <FaSpinner className="mr-1.5 animate-spin" />
                                            )}
                                            {project.approved === true
                                                ? "Approved"
                                                : project.approved === false
                                                ? "Rejected"
                                                : "Pending"}
                                        </span>
                                        {/* The "Verified" status seems redundant if you have "Approved". Removed for clarity. */}
                                    </div>
                                    <button
                                        onClick={() =>
                                            handleToggleVisibility(
                                                project._id,
                                                project.isPublic
                                            )
                                        }
                                        disabled={
                                            updatingProjectId === project._id
                                        }
                                        className={`flex items-center text-xs px-3 py-1.5 rounded-md font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800
                                            ${
                                                project.isPublic
                                                    ? "bg-sky-600 hover:bg-sky-700 text-white focus:ring-sky-500"
                                                    : "bg-slate-600 hover:bg-slate-500 text-slate-200 focus:ring-slate-400"
                                            }
                                            ${
                                                updatingProjectId ===
                                                project._id
                                                    ? "opacity-50 cursor-not-allowed"
                                                    : ""
                                            }`}
                                    >
                                        {updatingProjectId === project._id ? (
                                            <FaSpinner className="animate-spin mr-1.5" />
                                        ) : project.isPublic ? (
                                            <FaGlobe className="mr-1.5" />
                                        ) : (
                                            <FaLock className="mr-1.5" />
                                        )}
                                        {updatingProjectId === project._id
                                            ? "Updating..."
                                            : project.isPublic
                                            ? "Public"
                                            : "Private"}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </DashLayout>
    );
};

export default MyProjects;
