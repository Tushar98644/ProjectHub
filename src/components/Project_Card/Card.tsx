/* eslint-disable @next/next/no-img-element */
import { Project } from "@/types/project";
import { motion } from "framer-motion";
import { BackgroundGradient } from "../ui/background-gradient";
import { FaGithub, FaComments, FaTag, FaExternalLinkAlt } from "react-icons/fa";
import Link from "next/link";

const Card = ({
    _id,
    title,
    description,
    image,
    github,
    name,
    tags,
    discussion,
}: Project) => {
    const cardVariants = {
        hidden: { opacity: 0, scale: 0.95, y: 20 },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" },
        },
    };

    const projectImage = image || "/alternate.jpeg";

    return (
        <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover={{
                y: -8,
                boxShadow: "0px 20px 30px -10px rgba(0, 191, 255, 0.3)",
            }}
            className="h-full group"
        >
            <BackgroundGradient
                className="rounded-2xl h-full flex flex-col overflow-hidden bg-slate-900/70 backdrop-blur-sm border border-slate-700/50"
                containerClassName="rounded-2xl h-full"
                animate={true}
            >
                <div className="relative w-full h-48 sm:h-52 overflow-hidden">
                    <img
                        className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                        src={projectImage}
                        onError={(e: any) => {
                            e.target.onerror = null;
                            e.target.src = "/alternate.jpeg";
                        }}
                        alt={`${title} project preview`}
                    />
                </div>

                <div className="p-5 sm:p-6 flex flex-col flex-grow">
                    <Link href={`/project/${_id}`} passHref>
                        <a className="block mb-2 group/title">
                            <h5 className="text-lg sm:text-xl font-bold tracking-tight text-slate-50 group-hover/title:text-sky-400 transition-colors duration-200 line-clamp-2">
                                {title}
                            </h5>
                        </a>
                    </Link>

                    <p className="mb-4 font-normal text-xs sm:text-sm text-slate-400 line-clamp-3 flex-grow">
                        {description}
                    </p>

                    <p className="mb-5 text-xs font-medium text-slate-500">
                        By:{" "}
                        <span className="font-semibold text-sky-400 hover:underline cursor-pointer">
                            {name}
                        </span>
                    </p>

                    {tags && tags.length > 0 && (
                        <div className="mb-5">
                            <div className="flex flex-wrap gap-2 items-center">
                                <FaTag className="text-slate-500 text-xs mr-1" />
                                {tags.slice(0, 2).map(tag => (
                                    <span
                                        key={tag}
                                        className="px-2.5 py-1 text-[0.7rem] font-medium text-purple-300 bg-purple-500/20 rounded-full"
                                    >
                                        {tag}
                                    </span>
                                ))}
                                {tags.length > 2 && (
                                    <span className="px-2.5 py-1 text-[0.7rem] font-medium text-slate-400 bg-slate-700 rounded-full">
                                        +{tags.length - 2}
                                    </span>
                                )}
                            </div>
                        </div>
                    )}

                    <div className="mt-auto pt-4 border-t border-slate-700/60 flex flex-col sm:flex-row gap-3">
                        <a
                            href={github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 inline-flex items-center justify-center px-4 py-2 text-xs sm:text-sm font-semibold text-center text-slate-300 bg-slate-700/80 rounded-md hover:bg-slate-600/80 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all duration-200 transform hover:scale-105"
                        >
                            <FaGithub className="w-4 h-4 mr-2" />
                            GitHub
                        </a>
                        <button
                            onClick={discussion}
                            className="flex-1 inline-flex items-center justify-center px-4 py-2 text-xs sm:text-sm font-semibold text-center text-white bg-gradient-to-r from-sky-500 to-cyan-500 rounded-md hover:from-sky-600 hover:to-cyan-600 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-sky-500/50"
                        >
                            <FaComments className="w-4 h-4 mr-2" />
                            Discuss
                        </button>
                    </div>
                </div>
            </BackgroundGradient>
        </motion.div>
    );
};

export default Card;
