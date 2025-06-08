/* eslint-disable @next/next/no-img-element */
import { Message } from "@/types/message";
import { FaQuoteLeft, FaUserCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";

const Message_list = ({
    name,
    email,
    message,
    profileImage,
    createdAt,
    _id,
}: Message) => {
    const cardVariants = {
        hidden: { opacity: 0, y: 25, scale: 0.97 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] },
        },
    };

    const hue = _id ? parseInt(_id.slice(-2), 16) : Math.random() * 360;

    return (
        <motion.div
            variants={cardVariants}
            className="bg-slate-800/60 backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-slate-700/60 flex flex-col h-full group transform transition-all duration-300 hover:shadow-sky-400/20 hover:-translate-y-1.5"
        >
            <div className="relative mb-4">
                <FaQuoteLeft className="absolute -top-2 -left-2 text-5xl text-sky-500 opacity-10 transform -rotate-12" />
                <p className="text-slate-200 text-base leading-relaxed mb-5 flex-grow relative z-10 min-h-[80px]">
                    {" "}
                    {/* Ensure min-height for content */}
                    {message}
                </p>
            </div>

            <div className="mt-auto pt-4 border-t border-slate-700/40 flex items-center space-x-3">
                {profileImage ? (
                    <img
                        src={profileImage}
                        alt={`${name}'s avatar`}
                        className="w-10 h-10 rounded-full object-cover border-2 border-sky-500/50 shadow-sm"
                        onError={(e: any) => {
                            e.target.onerror = null;
                            e.target.src = "/alternate.jpeg";
                        }}
                    />
                ) : (
                    <img
                        src={`https://ui-avatars.com/api/?name=${
                            name?.replace(" ", "+") || "U"
                        }&background=1d4ed8&color=fff&size=128&font-size=0.45&bold=true`} // Darker blue bg
                        alt={`${name}'s avatar`}
                        className="w-10 h-10 rounded-full object-cover border-2 border-slate-600 shadow-sm"
                    />
                )}
                <div>
                    <p className="font-semibold text-sm text-slate-50 group-hover:text-sky-300 transition-colors">
                        {name}
                    </p>
                    {createdAt && (
                        <p className="text-xs text-slate-500">
                            {formatDistanceToNow(new Date(createdAt), {
                                addSuffix: true,
                            })}
                        </p>
                    )}
                </div>
            </div>
            <div
                style={{
                    background: `radial-gradient(circle at bottom right, hsla(${hue}, 70%, 50%, 0.15) 0%, transparent 50%)`,
                }}
                className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            ></div>
        </motion.div>
    );
};

export default Message_list;
