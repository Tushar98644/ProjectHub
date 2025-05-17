/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
'use client'
import { HI } from "@/shared";
import { Project } from "@/types/project";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import dynamic from "next/dynamic";
import { FaSearch, FaCheckCircle, FaTimesCircle, FaSpinner, FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const Lottie = dynamic(() => import('lottie-react'), {
    ssr: false,
});

const AdminClient = () => {
    const { data: session } = useSession();
    const [projects, setProjects] = useState<Project[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [approvalStatus, setApprovalStatus] = useState<{ [key: string]: string | undefined; }>({});
    const [isLoading, setIsLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState<string | null>(null); // For individual card actions

    const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const filteredProjects = useMemo(() => {
        return projects.filter(project =>
            project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (project.name && project.name.toLowerCase().includes(searchQuery.toLowerCase()))
        );
    }, [projects, searchQuery]);

    const handleApprovalAction = async (projectId: string, newApprovedStatus: boolean) => {
        setActionLoading(projectId);
        const config = { headers: { "Content-Type": "application/json" } };
        try {
            await axios.post("/api/admin", { projectId, approved: newApprovedStatus }, config);
            setApprovalStatus(prevState => ({
                ...prevState,
                [projectId]: newApprovedStatus ? "Approved" : "Rejected",
            }));
            toast.success(`Project ${newApprovedStatus ? "Approved" : "Rejected"}!`, { theme: "dark" });
        } catch (err) {
            console.error(`Error ${newApprovedStatus ? "approving" : "rejecting"} project:`, err);
            toast.error("Action failed. Please try again.", { theme: "dark" });
        } finally {
            setActionLoading(null);
        }
    };

    useEffect(() => {
        const fetchProjects = async () => {
            setIsLoading(true);
            const config = { headers: { "Content-Type": "application/json" } };
            try {
                const res = await axios.get("/api/admin", config);
                setProjects(res.data);
                const initialStatus = res.data.reduce((acc: any, project: Project) => {
                    acc[project._id] = project.approved === undefined ? undefined : (project.approved ? "Approved" : "Rejected");
                    return acc;
                }, {});
                setApprovalStatus(initialStatus);
            } catch (err) {
                console.error("Error fetching projects:", err);
                toast.error("Failed to fetch projects.", { theme: "dark" });
            } finally {
                setIsLoading(false);
            }
        };
        fetchProjects();
    }, []);

    const cardVariants = {
        hidden: { opacity: 0, y: 20, scale: 0.98 },
        visible: (i: number) => ({
            opacity: 1, y: 0, scale: 1,
            transition: { delay: i * 0.05, duration: 0.4, ease: "easeOut" }
        }),
        exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } }
    };
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100 pt-24 sm:pt-32 pb-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <motion.header
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="mb-10 md:mb-12 text-center sm:text-left sm:flex sm:items-center sm:justify-between"
                >
                    <div>
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
                            Admin <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-purple-500">Dashboard</span>
                        </h1>
                        <p className="mt-2 text-lg text-slate-400">
                            Welcome, <span className="font-semibold text-sky-300">{session?.user?.name || "Admin"}</span>! Manage pending project approvals.
                        </p>
                    </div>
                    <div className="mt-6 sm:mt-0 w-24 h-24 sm:w-32 sm:h-32 mx-auto sm:mx-0">
                        <Lottie animationData={HI} loop={true} />
                    </div>
                </motion.header>

                {/* Search and Filter Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="mb-8 md:mb-10 opacity-70"
                >
                    <div className="relative max-w-xl mx-auto">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                            <FaSearch className="w-5 h-5" />
                        </div>
                        <input
                            type="text"
                            id="admin-project-search"
                            className="block w-full pl-12 pr-4 py-3 text-sm text-slate-100 bg-slate-700/70 backdrop-blur-sm border border-slate-600 rounded-xl placeholder-slate-400 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all"
                            placeholder="Search projects by title or contributor..."
                            value={searchQuery}
                            onChange={handleSearchInputChange}
                        />
                    </div>
                </motion.div>

                {/* Projects Grid / List */}
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center text-center py-20">
                        <FaSpinner className="animate-spin text-sky-400 text-6xl mb-4" />
                        <p className="text-xl text-slate-300">Loading Projects...</p>
                    </div>
                ) : filteredProjects.length === 0 && !searchQuery ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                        className="text-center py-20 bg-slate-800/50 rounded-xl shadow-lg"
                    >
                        <FaCheckCircle className="mx-auto text-6xl text-green-500 mb-6" />
                        <h2 className="text-2xl font-semibold text-slate-100 mb-3">All Clear!</h2>
                        <p className="text-slate-400">There are no projects pending approval right now.</p>
                    </motion.div>
                ) : filteredProjects.length === 0 && searchQuery ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                        className="text-center py-20 bg-slate-800/50 rounded-xl shadow-lg"
                    >
                        <FaSearch className="mx-auto text-6xl text-slate-500 mb-6" />
                        <h2 className="text-2xl font-semibold text-slate-100 mb-3">No Matches Found</h2>
                        <p className="text-slate-400">Try adjusting your search query.</p>
                    </motion.div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        <AnimatePresence>
                            {filteredProjects.map((project, index) => (
                                <motion.div
                                    key={project._id}
                                    custom={index}
                                    variants={cardVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    layout
                                    className="bg-slate-800/70 backdrop-blur-md shadow-xl rounded-xl border border-slate-700/60 overflow-hidden flex flex-col h-full hover:border-sky-500/70 transition-all duration-300"
                                >
                                    <div className="relative w-full h-40 sm:h-48">
                                        <img
                                            className="w-full h-full object-cover"
                                            src={project.image || '/alternate.jpeg'}
                                            alt={`${project.title} preview`}
                                            onError={(e: any) => { e.target.onerror = null; e.target.src = '/alternate.jpeg'; }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                                    </div>

                                    <div className="p-5 flex flex-col flex-grow">
                                        <h3 className="text-lg font-semibold text-sky-300 mb-1 line-clamp-2">{project.title}</h3>
                                        <p className="text-xs text-slate-400 mb-3">
                                            By: <span className="font-medium text-slate-300">{project.name}</span>
                                        </p>
                                        <p className="text-sm text-slate-300 mb-4 line-clamp-3 flex-grow">{project.description}</p>

                                        {project.github && (
                                            <a
                                                href={project.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center text-xs text-sky-400 hover:text-sky-300 mb-4 group"
                                            >
                                                <FaGithub className="mr-1.5 group-hover:text-sky-300" /> View on GitHub <FaExternalLinkAlt className="ml-1.5 opacity-70 group-hover:opacity-100" />
                                            </a>
                                        )}

                                        <div className="mt-auto pt-4 border-t border-slate-700/50">
                                            {approvalStatus[project._id] ? (
                                                <div className={`flex items-center justify-center px-3 py-2 rounded-md text-sm font-medium
                                                    ${approvalStatus[project._id] === "Approved" ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                                                    {approvalStatus[project._id] === "Approved" ? <FaCheckCircle className="mr-2" /> : <FaTimesCircle className="mr-2" />}
                                                    {approvalStatus[project._id]}
                                                </div>
                                            ) : (
                                                <div className="flex gap-3">
                                                    <button
                                                        onClick={() => handleApprovalAction(project._id, true)}
                                                        disabled={actionLoading === project._id}
                                                        className="flex-1 inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-slate-800 transition-colors disabled:opacity-50"
                                                    >
                                                        {actionLoading === project._id ? <FaSpinner className="animate-spin mr-2" /> : <FaCheckCircle className="mr-2" />}
                                                        Approve
                                                    </button>
                                                    <button
                                                        onClick={() => handleApprovalAction(project._id, false)}
                                                        disabled={actionLoading === project._id}
                                                        className="flex-1 inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-slate-800 transition-colors disabled:opacity-50"
                                                    >
                                                        {actionLoading === project._id ? <FaSpinner className="animate-spin mr-2" /> : <FaTimesCircle className="mr-2" />}
                                                        Reject
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminClient;