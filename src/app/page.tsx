"use client";
import { Card } from "@/components";
import { useMemo, useState } from "react";
import { Project } from "@/types/project";
import { useRouter } from "next/navigation";
import { FaSpinner, FaExclamationTriangle, FaFolderOpen } from "react-icons/fa";
import { useFetch } from "@/hooks/useFetch";
import SearchBar from "@/components/SearchBar/SearchBar";
import { useVoiceRecognition } from "@/hooks/useVoiceRecognition";
import { useSession } from "next-auth/react";

const Main = () => {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const { isListening, startListening } = useVoiceRecognition(setSearchQuery);
    const router = useRouter();
    const {
        data: projects,
        isLoading,
        error,
    } = useFetch<Project[]>("/api/v1/projects");

    const redirectToDiscussion = (id: string) => {
        router.push(`/discussion/${id}`);
    };

    const handleSearchInputChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setSearchQuery(e.target.value);
    };

    const filteredProjects = useMemo(() => {
        if (!searchQuery) return projects;
        return projects.filter(
            project =>
                project.title
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                (project.tags &&
                    project.tags.some(tag =>
                        tag.toLowerCase().includes(searchQuery.toLowerCase())
                    )) ||
                (project.description &&
                    project.description
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()))
        );
    }, [projects, searchQuery]);

    const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Searching for:", searchQuery);
    };

    return (
        <div className="min-h-screen pt-28 md:pt-36 pb-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header/Hero Section (Optional) */}
                <header className="text-center mb-12 md:mb-16">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
                        Discover Amazing{" "}
                        <span className="text-sky-400">Projects</span>
                    </h1>
                    <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto">
                        Explore a diverse collection of projects, share your
                        own, and connect with a vibrant community of innovators.
                    </p>
                </header>

                {/* Search Bar Section */}
                <SearchBar
                    searchQuery={searchQuery}
                    isListening={isListening}
                    handleSearchSubmit={handleSearchSubmit}
                    handleSearchInputChange={handleSearchInputChange}
                    startListening={startListening}
                />

                {/* Project Grid Section */}
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center text-center py-10">
                        <FaSpinner className="animate-spin text-sky-400 text-5xl mb-4" />
                        <p className="text-xl text-slate-300">
                            Loading Projects...
                        </p>
                    </div>
                ) : error ? (
                    <div className="flex flex-col items-center justify-center text-center py-10 bg-red-900/20 border border-red-700 rounded-lg p-6">
                        <FaExclamationTriangle className="text-red-400 text-5xl mb-4" />
                        <p className="text-xl text-red-300 mb-2">
                            Oops! Something went wrong.
                        </p>
                        <p className="text-slate-400">{error}</p>
                        <button className="mt-6 px-4 py-2 bg-sky-600 hover:bg-sky-700 rounded-md text-sm font-medium">
                            Try Again
                        </button>
                    </div>
                ) : filteredProjects.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProjects.map(project => (
                            <Card
                                key={project._id}
                                {...project}
                                discussion={() =>
                                    redirectToDiscussion(project._id)
                                }
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-10 bg-slate-800/70 rounded-lg shadow-xl">
                        <FaFolderOpen className="mx-auto text-5xl text-slate-500 mb-4" />
                        <h2 className="text-2xl font-semibold text-slate-300 mb-2">
                            No Projects Found
                        </h2>
                        <p className="text-slate-400">
                            {searchQuery
                                ? "Try adjusting your search or voice command."
                                : "There are no projects to display at the moment."}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Main;
