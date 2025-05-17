/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/no-img-element */
"use client";
import { Card } from "@/components";
import { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Project } from "@/types/project";
import { useRouter } from "next/navigation";
import { FaSearch, FaMicrophone, FaSpinner, FaExclamationTriangle, FaFolderOpen } from "react-icons/fa"; // Added FaSpinner

const Main = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [isListening, setIsListening] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
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
        if (!searchQuery) return projects;
        return projects.filter(project =>
            project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (project.tags && project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))) ||
            (project.description && project.description.toLowerCase().includes(searchQuery.toLowerCase()))
        );
    }, [projects, searchQuery]);

    const startListening = () => {
        if (!('webkitSpeechRecognition' in window)) {
            alert("Speech recognition not supported in this browser. Try Chrome.");
            return;
        }
        setIsListening(true);
        const recognition = new window.webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.onresult = (event: { results: { transcript: any; }[][] }) => { 
            const transcript = event.results[0][0].transcript;
            setSearchQuery(transcript);
            setIsListening(false);
        };
        recognition.onerror = (event: { error: any }) => {
            console.error("Speech recognition error:", event.error);
            alert(`Speech recognition error: ${event.error}`);
            setIsListening(false);
        };
        recognition.onend = () => {
            setIsListening(false); // Ensure listening stops
        };
        recognition.start();
    };

    const fetchProjects = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        try {
            const res = await axios.get("/api/project", config);
            // console.log(`The final projects to be displayed are ${res.data}`);
            setProjects(res.data);
        } catch (err) {
            console.error("Error fetching projects:", err);
            setError("Failed to load projects. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchProjects();
    }, [fetchProjects]);

    const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // The filtering is already happening via useMemo, so direct submission might not be needed
        // unless you want to trigger a new API call with the search query.
        console.log("Searching for:", searchQuery);
    };

    return (
        <div className="min-h-screen pt-28 md:pt-36 pb-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header/Hero Section (Optional) */}
                <header className="text-center mb-12 md:mb-16">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
                        Discover Amazing <span className="text-sky-400">Projects</span>
                    </h1>
                    <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto">
                        Explore a diverse collection of projects, share your own, and connect with a vibrant community of innovators.
                    </p>
                </header>

                {/* Search Bar Section */}
                <div className="mb-10 md:mb-12 max-w-2xl mx-auto opacity-80">
                    <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 p-1.5 bg-slate-700/50 rounded-xl shadow-lg focus-within:ring-2 focus-within:ring-sky-500 transition-all">
                        <div className="pl-3 text-slate-400">
                            <FaSearch className="w-5 h-5" />
                        </div>
                        <input
                            type="text"
                            id="project-search"
                            value={searchQuery}
                            onChange={handleSearchInputChange}
                            className="flex-grow bg-transparent text-slate-100 text-sm placeholder-slate-400 focus:outline-none py-2.5 px-2"
                            placeholder="Search projects by title, tag, or keyword..."
                            required={false} // Typically search isn't strictly required
                        />
                        <button
                            type="button"
                            onClick={startListening}
                            disabled={isListening}
                            className={`p-2.5 rounded-lg transition-colors ${isListening
                                    ? "bg-red-500 text-white animate-pulse"
                                    : "text-slate-400 hover:text-sky-400 hover:bg-slate-600"
                                }`}
                            aria-label="Search by voice"
                        >
                            {isListening ? <FaSpinner className="w-5 h-5 animate-spin" /> : <FaMicrophone className="w-5 h-5" />}
                        </button>
                        <button
                            type="submit" // Can be kept if you want explicit search submission
                            className="px-4 py-2.5 text-sm font-semibold text-white bg-sky-600 rounded-lg hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-slate-800 transition-colors"
                        >
                            Search
                        </button>
                    </form>
                    {/* {recognizedSpeech && <p className="text-xs text-slate-400 mt-1 text-center">Recognized: "{recognizedSpeech}"</p>} */}
                </div>

                {/* Project Grid Section */}
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center text-center py-10">
                        <FaSpinner className="animate-spin text-sky-400 text-5xl mb-4" />
                        <p className="text-xl text-slate-300">Loading Projects...</p>
                    </div>
                ) : error ? (
                    <div className="flex flex-col items-center justify-center text-center py-10 bg-red-900/20 border border-red-700 rounded-lg p-6">
                        <FaExclamationTriangle className="text-red-400 text-5xl mb-4" />
                        <p className="text-xl text-red-300 mb-2">Oops! Something went wrong.</p>
                        <p className="text-slate-400">{error}</p>
                        <button onClick={fetchProjects} className="mt-6 px-4 py-2 bg-sky-600 hover:bg-sky-700 rounded-md text-sm font-medium">
                            Try Again
                        </button>
                    </div>
                ) : filteredProjects.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProjects.map(project => (
                            <Card
                                key={project._id}
                                {...project}
                                discussion={() => redirectToDiscussion(project._id)}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-10 bg-slate-800/70 rounded-lg shadow-xl">
                        <FaFolderOpen className="mx-auto text-5xl text-slate-500 mb-4" />
                        <h2 className="text-2xl font-semibold text-slate-300 mb-2">No Projects Found</h2>
                        <p className="text-slate-400">
                            {searchQuery ? "Try adjusting your search or voice command." : "There are no projects to display at the moment."}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Main;
