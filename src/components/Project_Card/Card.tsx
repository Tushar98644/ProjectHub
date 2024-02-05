/* eslint-disable @next/next/no-img-element */
import { Project } from "@/types/project";
import Link from "next/link";
import { motion } from "framer-motion";
import { BackgroundGradient } from "../ui/background-gradient";

const Card = ({
    title,
    description,
    image,
    github,
    name,
    tags,
    discussion,
}: Project) => {
    return (
        <motion.div>
            <BackgroundGradient className="rounded-[22px] p-4 sm:p-2 bg-white dark:bg-zinc-900">
                <Link href="#">
                    <img
                        className="p-4 rounded-[2vw] object-fill sm:h-[23vw] h-60"
                        src={image}
                        onError={(e: any) => {
                            e.target.onerror = null;
                            e.target.src = "/alternate.jpeg";
                        }}
                        alt=""
                        width={400}
                        height={250}
                    />
                </Link>
                <div className="p-5">
                    <a href="#">
                        <h5 className="mb-2 sm:text-2xl text-base font-bold tracking-tight text-gray-900 dark:text-white">
                            {title}
                        </h5>
                    </a>
                    <p className="mb-3 font-normal sm:text-base text-sm text-gray-700 dark:text-gray-400 text-ellipsis overflow-auto">
                        {description}
                    </p>
                    <p className="mb-3 font-normal sm:text-base text-sm text-black dark:text-white text-ellipsis overflow-auto">
                        Contributor : {name}
                    </p>
                    <div className="flex my-4 gap-4 flex-row">
                        <button>
                            <a
                                href={github}
                                className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                <p> view github</p>
                                <svg
                                    aria-hidden="true"
                                    className="w-4 h-4 ml-2 -mr-1"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                        clip-rule="evenodd"
                                    ></path>
                                </svg>
                            </a>
                        </button>

                        <button onClick={discussion}>
                            <a className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                <p>Discussion</p>
                                <svg
                                    aria-hidden="true"
                                    className="w-4 h-4 ml-2 -mr-1"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                        clip-rule="evenodd"
                                    ></path>
                                </svg>
                            </a>
                        </button>
                    </div>

                    <div
                        tabIndex={0}
                        className="focus:outline-none grid grid-cols-3 my-2 gap-4"
                    >
                        {tags.map(tag => (
                            <div key="tag" className="flex justify-center items-center overflow-scroll text-center p-3 text-xs text-white rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                                # {tag}
                            </div>
                        ))}
                    </div>
                </div>
            </BackgroundGradient>
        </motion.div>
    );
};

export default Card;
