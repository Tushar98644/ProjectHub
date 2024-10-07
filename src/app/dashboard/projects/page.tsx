/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { DashLayout } from "@/components/Layout/Layout";
import project from "@/models/project";
import { Project } from "@/types/project";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const MyProjects = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const { data: session } = useSession();

    useEffect(() => {
        if (session?.user?.email) {
            fetchProjects();
        }
    }, []);

    const fetchProjects = async () => {
        try {
            const response = await axios.get("/api/project", {
                params: {
                    name: session?.user?.name,
                },
            });
            setProjects(response.data);
        } catch (error) {
            console.error("Error fetching projects:", error);
        }
    };

    return (
        <DashLayout>
            <div className="space-y-6">
                <h1 className="text-3xl font-semibold text-gray-800 dark:text-white">
                    My Projects
                </h1>
                {projects.map((project: Project, index: number) => (
                    <div key={index} className="grid md:grid-cols-2 grid-cols-1 focus:outline-none card rounded-2xl p-6 shadow">
                        <div className="flex flex-col">
                            <div className="flex items-center dark:border-gray-700  pb-6">
                                <img
                                    src={project?.image}
                                    alt="coin avatar"
                                    className="w-12 h-12 rounded-full"
                                />
                                <div className="flex items-start justify-between w-full">
                                    <div className="pl-3 w-full">
                                        <p
                                            tabIndex={0}
                                            className="focus:outline-none text-2xl font-medium leading-5 text-gray-800 dark:text-white "
                                        >
                                            {project?.title}
                                        </p>
                                        <p
                                            tabIndex={0}
                                            className="focus:outline-none text-sm leading-normal pt-2 text-gray-500 dark:text-gray-500 "
                                        >
                                            {project?.name}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="px-2">
                                <p className="focus:outline-none text-sm leading-5 py-4 text-gray-500 dark:text-gray-400 ">
                                    {project?.description}
                                </p>
                            </div>
                            <div className="mt-4 flex items-center gap-5">
                                <div className="flex items-center gap-1">
                                    <span className="h-3 w-3 rounded-full bg-blue-400"></span>
                                    <p className="block font-sans text-xs font-normal text-gray-700 antialiased">
                                        {project?.tags?.join(", ")}
                                    </p>
                                </div>
                                <div className="flex items-center gap-1">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        aria-hidden="true"
                                        className="-mt-0.5 h-4 w-4 text-yellow-400"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                            clip-rule="evenodd"
                                        ></path>
                                    </svg>
                                    <p className="block font-sans text-xs font-normal text-gray-700 antialiased">
                                        {project?.approved ? "Approved" : "Rejected"}
                                    </p>
                                </div>
                                <div className="flex items-center gap-1">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        aria-hidden="true"
                                        className="-mt-px h-4 w-4 text-green-300"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                                            clip-rule="evenodd"
                                        ></path>
                                    </svg>
                                    <p className="block font-sans text-xs font-normal text-gray-700 antialiased">
                                        Veritied
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
                }
            </div>

        </DashLayout>
    );
};

export default MyProjects;
