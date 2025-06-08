"use client";
import { Message_list } from "@/components";
import { Message } from "@/types/message";
import "react-toastify/dist/ReactToastify.css";
import {
    FaComments,
    FaSpinner,
    FaExclamationTriangle,
    FaRegSadTear,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { useFetch } from "@/hooks/useFetch";

const Message_page = () => {
    const {
        data: messages,
        isLoading,
        error,
    } = useFetch<Message[]>("/api/message");

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08,
                delayChildren: 0.2,
                duration: 0.5,
                ease: "easeOut",
            },
        },
    };

    return (
        <div className="min-h-screen text-slate-100 pt-28 sm:pt-36 pb-20 px-4 sm:px-6 lg:px-8 overflow-x-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <motion.header
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="text-center mb-12 md:mb-16"
            >
                <FaComments className="mx-auto text-5xl sm:text-6xl text-sky-400 mb-6" />
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
                    Voices of Our{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-400 to-purple-500">
                        Community
                    </span>
                </h1>
                <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto">
                    Discover what our users are saying. Real feedback, genuine
                    experiences.
                </p>
            </motion.header>

            {isLoading ? (
                <div className="flex flex-col items-center justify-center text-center py-20">
                    <FaSpinner className="animate-spin text-sky-400 text-6xl mb-5" />
                    <p className="text-xl text-slate-300">Fetching Wisdom...</p>
                </div>
            ) : error ? (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center justify-center text-center py-20 bg-red-900/10 border border-red-700/40 rounded-2xl p-8 max-w-lg mx-auto shadow-xl"
                >
                    <FaExclamationTriangle className="text-red-400 text-6xl mb-5" />
                    <p className="text-2xl font-semibold text-red-300 mb-3">
                        Connection Glitch
                    </p>
                    <p className="text-slate-400 text-sm mb-6">{error}</p>
                    <motion.button
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => window.location.reload()}
                        className="px-6 py-2.5 bg-sky-600 hover:bg-sky-700 rounded-lg text-sm font-medium shadow-lg hover:shadow-sky-500/30 transition-all"
                    >
                        Retry Connection
                    </motion.button>
                </motion.div>
            ) : messages.length === 0 ? (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-20 bg-slate-800/40 backdrop-blur-md rounded-2xl shadow-xl max-w-lg mx-auto border border-slate-700/50"
                >
                    <FaRegSadTear className="mx-auto text-7xl text-slate-500 mb-6" />
                    <h2 className="text-3xl font-semibold text-slate-100 mb-4">
                        The Hall of Echoes is Quiet
                    </h2>
                    <p className="text-slate-400">
                        No messages yet. Why not be the first to share your
                        thoughts?
                    </p>
                </motion.div>
            ) : (
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 items-start"
                >
                    {messages.map(message => (
                        <Message_list key={message._id} {...message} />
                    ))}
                </motion.div>
            )}
        </div>
    );
};

export default Message_page;
