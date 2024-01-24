/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/no-img-element */
"use client";

import { Card } from "@/components";
import { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Project } from "@/types/project";
import { useRouter } from "next/navigation";

const Main = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [recognizedSpeech, setRecognizedSpeech] = useState<string>("");
    const [isListening, setIsListening] = useState(false);
    const router = useRouter();

    const redirectToDiscussion = (id: string) => {
        router.push(`/discussion/${id}`);
    };

    const handleSearchInputChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setSearchQuery(e.target.value);
    };

    const filteredProjects = useMemo(() => {
        return projects.filter(project =>
            project.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [projects, searchQuery]);

    const startListening = () => {
        setIsListening(true);

        const recognition = new window.webkitSpeechRecognition();

        recognition.onresult = (event: {
            results: { transcript: any }[][];
        }) => {
            const transcript = event.results[0][0].transcript;
            setSearchQuery(transcript);
            setRecognizedSpeech(transcript);
            setIsListening(false);
        };
        recognition.start();
    };

    const fetchprojects = useCallback(async () => {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        await axios
            .get("/api/project", config)
            .then(res => {
                console.log(
                    `The final projects to be displayed are ${res.data}`
                );
                setProjects(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        fetchprojects();
    }, [fetchprojects]);

    return (
        <div className="py-28 md:py-36 flex flex-col gap-8">
            <div className="mt-0 w-full sm:px-16 px-8">
                <form className="flex items-center">
                    <label htmlFor="voice-search" className="sr-only">
                        Search
                    </label>
                    <div className="relative w-full">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg
                                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 21 21"
                            >
                                <path
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M11.15 5.6h.01m3.337 1.913h.01m-6.979 0h.01M5.541 11h.01M15 15h2.706a1.957 1.957 0 0 0 1.883-1.325A9 9 0 1 0 2.043 11.89 9.1 9.1 0 0 0 7.2 19.1a8.62 8.62 0 0 0 3.769.9A2.013 2.013 0 0 0 13 18v-.857A2.034 2.034 0 0 1 15 15Z"
                                />
                            </svg>
                        </div>
                        <input
                            type="text"
                            id="voice-search"
                            value={searchQuery}
                            onChange={handleSearchInputChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Search for projects"
                            required
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 flex items-center pr-3"
                            onClick={startListening}
                        >
                            <svg
                                className="w-4 h-4 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 16 20"
                            >
                                <path
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M15 7v3a5.006 5.006 0 0 1-5 5H6a5.006 5.006 0 0 1-5-5V7m7 9v3m-3 0h6M7 1h2a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V4a3 3 0 0 1 3-3Z"
                                />
                            </svg>
                        </button>
                    </div>
                    <button
                        type="submit"
                        className="inline-flex items-center py-2.5 px-3 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        <svg
                            className="w-4 h-4 mr-2"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 20"
                        >
                            <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                            />
                        </svg>
                        Search
                    </button>
                </form>
            </div>
            <div className="grid lg:grid-cols-3 sm:grid-cols-2 justify-items-center items-center grid-cols-1 gap-12 auto-rows-max sm:mx-16 mx-6">
                {filteredProjects.map(project => (
                    <Card
                        key={project._id}
                        {...project}
                        discussion={() => redirectToDiscussion(project._id)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Main;
