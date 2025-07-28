"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { Discussion } from "@/types/discussion";
import {
    FaComments,
    FaPaperPlane,
    FaSpinner,
    FaExclamationTriangle,
    FaUserCircle,
    FaEllipsisH,
    FaPlus,
} from "react-icons/fa";
import { formatDistanceToNow } from "date-fns";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion, AnimatePresence } from "framer-motion";
import { useFetch } from "@/hooks/useFetch";

/* eslint-disable @next/next/no-img-element */
const Discussion_page = ({ params }: { params: { id: string } }) => {
    const [showDiscussion, setShowDiscussion] = useState(false);
    const [message, setMessage] = useState("");
    const { data: session } = useSession();
    const [isPosting, setIsPosting] = useState(false);
    const { id } = params;
    const {
        data: discussionData,
        isLoading,
        error,
    } = useFetch<Discussion[]>(`/api/v1/discussions?id=${id}`);

    const startDiscussionFlow = () => {
        setShowDiscussion(true);
        localStorage.setItem(`started_discussion_${id}`, "true");
    };

    useEffect(() => {
        const started_discussion = localStorage.getItem(
            `started_discussion_${id}`
        );
        if (started_discussion === "true") {
            setShowDiscussion(true);
        } else {
            // setIsLoading(false);
        }
    }, [id]);

    const handleComment = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!message.trim() || !session?.user) {
            toast.warn("Please write a message and ensure you are logged in.");
            return;
        }
        setIsPosting(true);
        const name = session?.user?.name;
        const profile = session?.user?.image;
        const commentData = { name, profile, message, page_id: id };
        const config = { headers: { "Content-Type": "application/json" } };

        try {
            const apiUrl = `/api/v1/discussions`;
            await axios.post(apiUrl, commentData, config);
            setMessage("");
            toast.success("Comment posted!");
        } catch (err) {
            console.error("Error posting comment:", err);
            toast.error("Failed to post comment.");
        } finally {
            setIsPosting(false);
        }
    };

    const UserAvatar = ({
        src,
        alt,
        size = "md",
    }: {
        src?: string | null;
        alt?: string;
        size?: "sm" | "md" | "lg";
    }) => {
        const sizeClasses =
            size === "sm"
                ? "w-8 h-8"
                : size === "md"
                ? "w-10 h-10"
                : "w-12 h-12";
        return (
            <img
                className={`flex-shrink-0 ${sizeClasses} rounded-full object-cover border-2 border-slate-600 shadow-md`}
                src={
                    src ||
                    `https://ui-avatars.com/api/?name=${
                        alt?.replace(" ", "+") || "U"
                    }&background=2563eb&color=fff&size=128&font-size=0.5&bold=true`
                }
                alt={alt || "User avatar"}
                onError={(e: any) => {
                    e.target.onerror = null;
                    e.target.src = "/alternate.jpeg";
                }}
            />
        );
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30, scale: 0.98 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] },
        }, // Smoother ease
        exit: {
            opacity: 0,
            y: -20,
            scale: 0.98,
            transition: { duration: 0.3, ease: "easeIn" },
        },
    };

    if (!showDiscussion && !isLoading) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7 }}
                className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100 flex flex-col items-center justify-center p-4 sm:p-8"
            >
                <div className="text-center bg-slate-800/60 backdrop-blur-lg p-8 sm:p-12 md:p-16 rounded-3xl shadow-2xl max-w-xl w-full border border-slate-700/70 transform hover:scale-[1.02] transition-transform duration-300">
                    <motion.div
                        initial={{ scale: 0.3, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{
                            delay: 0.2,
                            type: "spring",
                            stiffness: 150,
                            damping: 15,
                        }}
                    >
                        <FaComments className="mx-auto text-7xl text-sky-400 mb-10" />
                    </motion.div>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-300 to-purple-400 mb-6 pb-1">
                        Spark the Conversation!
                    </h1>
                    <p className="text-slate-300 mb-12 text-base sm:text-lg leading-relaxed">
                        Your insights matter. Share your thoughts, ask
                        questions, or provide feedback on this project.
                        Let&apos;s build a dynamic discussion together!
                    </p>
                    <motion.button
                        whileHover={{
                            scale: 1.05,
                            y: -2,
                            boxShadow: "0px 12px 25px rgba(56, 189, 248, 0.35)",
                        }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full sm:w-auto inline-flex items-center justify-center px-12 py-4 text-lg font-semibold text-white bg-gradient-to-r from-sky-500 to-blue-600 rounded-xl hover:from-sky-600 hover:to-blue-700 focus:outline-none focus:ring-4 focus:ring-sky-500/50 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all duration-200 shadow-xl"
                        onClick={startDiscussionFlow}
                    >
                        <FaPlus className="mr-2.5" /> Start Discussion
                    </motion.button>
                </div>
            </motion.div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100 pt-24 sm:pt-32 pb-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl xl:max-w-3xl">
                <motion.header
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                    className="mb-10 sm:mb-12 text-center"
                >
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-300 to-purple-400 pb-2">
                        Project Discussions
                    </h1>
                    {/* TODO: Fetch and display the actual project title for context */}
                    {/* <p className="text-slate-400 text-sm mt-1">Topic: {projectTitle || "Loading project details..."}</p> */}
                </motion.header>

                {/* Comment Section */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mb-10 sm:mb-12 shadow-xl rounded-xl p-6 sm:p-8 border border-slate-700 opacity-80"
                >
                    <div className="flex items-start space-x-3 mb-4">
                        {session?.user ? (
                            <UserAvatar
                                src={session.user.image}
                                alt={session.user.name ?? undefined}
                                size="sm"
                            />
                        ) : (
                            <FaUserCircle className="w-8 h-8 text-slate-500 mr-3" />
                        )}
                        <h2 className="text-xl sm:text-2xl font-semibold text-slate-100 pt-0.5">
                            Leave a Comment
                        </h2>
                    </div>
                    <form onSubmit={handleComment} className="space-y-4">
                        <div>
                            <label htmlFor="comment" className="sr-only">
                                Your comment
                            </label>
                            <textarea
                                id="comment"
                                rows={3}
                                value={message}
                                onChange={e => setMessage(e.target.value)}
                                className="w-full text-sm text-slate-100 bg-slate-700/80 border border-slate-600 rounded-lg p-3.5 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 placeholder-slate-400 transition-colors opacity-80"
                                placeholder={
                                    session
                                        ? "Share your thoughts..."
                                        : "Please log in to comment."
                                }
                                required
                                disabled={isPosting || !session}
                            />
                        </div>
                        <div className="flex justify-end opacity-95">
                            <motion.button
                                type="submit"
                                disabled={
                                    isPosting || !session || !message.trim()
                                }
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                className="inline-flex items-center px-6 py-2.5 text-sm font-semibold text-white bg-sky-600 rounded-lg hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-slate-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                            >
                                {isPosting ? (
                                    <FaSpinner className="animate-spin mr-2 h-4 w-4" />
                                ) : (
                                    <FaPaperPlane className="mr-2 h-4 w-4" />
                                )}
                                {isPosting
                                    ? "Posting..."
                                    : session
                                    ? "Post Comment"
                                    : "Login to Comment"}
                            </motion.button>
                        </div>
                    </form>
                </motion.section>

                {/* Discussion List */}
                <section>
                    <h2 className="text-2xl sm:text-3xl font-semibold text-slate-100 mb-6 sm:mb-8">
                        {discussionData.length > 0
                            ? `Comments (${discussionData.length})`
                            : "No Comments Yet"}
                    </h2>
                    {isLoading && !error && (
                        <div className="flex flex-col items-center justify-center text-center py-12">
                            <FaSpinner className="animate-spin text-sky-400 text-5xl mb-4" />
                            <p className="text-slate-300 text-lg">
                                Loading comments...
                            </p>
                        </div>
                    )}
                    {error && !isLoading && (
                        <div className="flex flex-col items-center justify-center text-center py-12 bg-red-900/20 border border-red-700/50 rounded-xl p-8">
                            <FaExclamationTriangle className="text-red-400 text-5xl mb-4" />
                            <p className="text-xl text-red-300 mb-2">{error}</p>
                            <button className="mt-6 px-5 py-2.5 bg-sky-600 hover:bg-sky-700 rounded-lg text-sm font-medium shadow-md hover:shadow-lg transition-all">
                                Try Again
                            </button>
                        </div>
                    )}
                    {!isLoading && !error && discussionData.length > 0 && (
                        <div className="space-y-5 sm:space-y-6 opacity-80">
                            <AnimatePresence initial={false}>
                                {" "}
                                {/* initial={false} to prevent initial animation for existing items */}
                                {discussionData.map((comment, index) => (
                                    <motion.article
                                        key={comment._id}
                                        custom={index}
                                        variants={itemVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                        layout
                                        className="p-5 sm:p-6 bg-slate-800/60 backdrop-blur-sm shadow-lg rounded-xl border border-slate-700/60 hover:border-sky-500/50 transition-colors duration-200"
                                    >
                                        <footer className="flex justify-between items-start mb-3">
                                            <div className="flex items-center space-x-3">
                                                <UserAvatar
                                                    src={comment.profile}
                                                    alt={comment.name}
                                                />
                                                <div>
                                                    <p className="text-sm sm:text-base text-slate-50 font-semibold hover:text-sky-300 transition-colors cursor-pointer">
                                                        {comment.name}
                                                    </p>
                                                    <p className="text-xs text-slate-400">
                                                        <time
                                                            dateTime={new Date(
                                                                comment.createdAt
                                                            ).toISOString()}
                                                        >
                                                            {formatDistanceToNow(
                                                                new Date(
                                                                    comment.createdAt
                                                                ),
                                                                {
                                                                    addSuffix:
                                                                        true,
                                                                }
                                                            )}
                                                        </time>
                                                    </p>
                                                </div>
                                            </div>
                                            {session?.user?.name ===
                                                comment.name && (
                                                <button className="p-1.5 text-slate-500 hover:text-slate-300 rounded-md hover:bg-slate-700 transition-colors">
                                                    <FaEllipsisH className="w-4 h-4" />{" "}
                                                    {/* Changed to horizontal ellipsis */}
                                                </button>
                                            )}
                                        </footer>
                                        <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                                            {comment.message}
                                        </p>
                                    </motion.article>
                                ))}
                            </AnimatePresence>
                        </div>
                    )}
                    {!isLoading && !error && discussionData.length === 0 && (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="text-center text-slate-400 py-12 text-lg"
                        >
                            Be the first to spark the conversation!
                        </motion.p>
                    )}
                </section>
            </div>
        </div>
    );
};

export default Discussion_page;
