/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { Discussion } from "@/types/discussion";
import { useRouter, useSearchParams } from "next/navigation";

/* eslint-disable @next/next/no-img-element */
const Discussion_page = ({ params }: { params: { id: string } }) => {
    const [showdiscussion, setShowdiscussion] = useState(false);
    const [message, setMessage] = useState("");
    const { data: session } = useSession();
    const [discussionData, setDiscussionData] = useState<Discussion[]>([]);
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = params.id;
    console.log(id);
    const startDiscussion = () => {
        setShowdiscussion(prev => !prev);
        localStorage.setItem(`started_discussion_${id}`, "true");
    };

    useEffect(() => {
        const started_discussion = localStorage.getItem(
            `started_discussion_${id}`
        );
        if (started_discussion) {
            setShowdiscussion(true);
        }
    }, [id]);

    const handleComment = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        const name = session?.user?.name;
        const profile = session?.user?.image;
        const data = {
            name,
            profile,
            message,
        };
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        console.log(data);
        const apiUrl = `/api/discussion/${id}`;
        axios.post(apiUrl, data, config);
        console.log(`The data sent to discussion api is ${data}`);
        router.push(`/discussion/${id}`);
    };

    const fetchDiscussion = useCallback(async () => {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const apiUrl = `/api/discussion/${id}`;
        await axios
            .get(apiUrl, config)
            .then(res => {
                setDiscussionData(res.data);
                console.log(`Data fetched successfully : ${res.data}`);
            })
            .catch(err => {
                console.log(err);
            });
    }, [id]);

    useEffect(() => {
        fetchDiscussion();
    }, [fetchDiscussion]);

    return (
        <div>
            {!showdiscussion ? (
                <div className="flex items-center justify-center h-screen px-8">
                    <div className="flex justify-center p-8 items-center flex-col rounded-xl bg-green-50 text-slate-800 shadow-sm dark:bg-slate-900 dark:text-slate-400">
                        <div className="inline-flex items-center">
                            <svg
                                className="mr-2  h-6 w-6 fill-current text-teal-900 dark:text-teal-400"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512"
                            >
                                <path d="M447.1 0h-384c-35.25 0-64 28.75-64 63.1v287.1c0 35.25 28.75 63.1 64 63.1h96v83.1c0 9.838 11.03 15.55 19.12 9.7l124.9-93.7h144c35.25 0 64-28.75 64-63.1V63.1C511.1 28.75 483.2 0 447.1 0zM480 352c0 17.6-14.4 32-32 32h-144.1c-6.928 0-13.67 2.248-19.21 6.406L192 460v-60c0-8.838-7.164-16-16-16H64c-17.6 0-32-14.4-32-32V64c0-17.6 14.4-32 32-32h384c17.6 0 32 14.4 32 32V352zM432 224h-160C263.2 224 256 231.2 256 240S263.2 256 272 256h160C440.8 256 448 248.8 448 240S440.8 224 432 224zM224 240C224 231.2 216.8 224 208 224h-128C71.16 224 64 231.2 64 240S71.16 256 80 256h128C216.8 256 224 248.8 224 240zM144 288h-32C103.2 288 96 295.2 96 304S103.2 320 112 320h32C152.8 320 160 312.8 160 304S152.8 288 144 288zM400 288h-32C359.2 288 352 295.2 352 304s7.156 16 16 16h32c8.844 0 16-7.156 16-16S408.8 288 400 288zM304 288h-96C199.2 288 192 295.2 192 304S199.2 320 208 320h96c8.844 0 16-7.156 16-16S312.8 288 304 288z" />
                            </svg>
                            <h2 className="text-teal-900 dark:text-teal-400 text-xl font-semibold">
                                Community Discussion
                            </h2>
                        </div>
                        <p className="mt-6 mb-6 max-w-2xl text-center text-slate-800 dark:text-teal-400">
                            Start a new discussion htmlFor this topic with all
                            the community members. Please be fair to others,
                            htmlFor the full rules do refer to the{" "}
                            <a className="text-primary" href="#">
                                {" "}
                                Discussion Rules{" "}
                            </a>{" "}
                            page.
                        </p>
                        <button
                            className="rounded-2xl bg-teal-400 px-4 py-3 font-bold text-gray-800"
                            onClick={startDiscussion}
                        >
                            Start Discussion
                        </button>
                    </div>
                </div>
            ) : (
                <div className="py-24 dark:bg-gray-900 min-h-screen">
                    <section className="bg-white dark:bg-gray-900 antialiased py-8">
                        <div className="max-w-2xl mx-auto px-4 ">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
                                    Discussions
                                </h2>
                            </div>
                            <form className="mb-6">
                                <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                                    <label
                                        htmlFor="comment"
                                        className="sr-only"
                                    >
                                        Your comment
                                    </label>
                                    <textarea
                                        id="comment"
                                        rows={6}
                                        value={message}
                                        onChange={e =>
                                            setMessage(e.target.value)
                                        }
                                        className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                                        placeholder="Write a comment..."
                                        required
                                    ></textarea>
                                </div>
                                <button
                                    type="submit"
                                    onClick={handleComment}
                                    className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
                                >
                                    Post comment
                                </button>
                            </form>
                            {discussionData?.map(discussion => (
                                <article
                                    key={discussion._id}
                                    className="p-6 mb-3 text-base bg-white border-t border-gray-200 dark:border-gray-700 dark:bg-gray-900"
                                >
                                    <footer className="flex justify-between items-center mb-2">
                                        <div className="flex items-center">
                                            <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                                                <img
                                                    className="mr-2 w-6 h-6 rounded-full"
                                                    src={discussion?.profile}
                                                    alt="Michael Gough"
                                                />
                                                {discussion?.name}
                                            </p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                <time
                                                    dateTime={discussion?.createdAt.toString()}
                                                    title={discussion?.createdAt.toString()}
                                                >
                                                    {" "}
                                                </time>
                                            </p>
                                        </div>
                                        <button
                                            id="dropdownComment1Button"
                                            data-dropdown-toggle="dropdownComment1"
                                            className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                                            type="button"
                                        >
                                            <svg
                                                className="w-4 h-4"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="currentColor"
                                                viewBox="0 0 16 3"
                                            >
                                                <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                                            </svg>
                                            <span className="sr-only">
                                                Comment settings
                                            </span>
                                        </button>
                                        <div
                                            id="dropdownComment1"
                                            className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                                        >
                                            <ul
                                                className="py-1 text-sm text-gray-700 dark:text-gray-200"
                                                aria-labelledby="dropdownMenuIconHorizontalButton"
                                            >
                                                <li>
                                                    <a
                                                        href="#"
                                                        className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                    >
                                                        Edit
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        href="#"
                                                        className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                    >
                                                        Remove
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        href="#"
                                                        className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                    >
                                                        Report
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </footer>
                                    <p className="text-gray-500 dark:text-gray-400">
                                        {discussion?.message}
                                    </p>
                                    <div className="flex items-center mt-4 space-x-4">
                                        <button
                                            type="button"
                                            className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium"
                                        >
                                            <svg
                                                className="mr-1.5 w-3.5 h-3.5"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 20 18"
                                            >
                                                <path
                                                    stroke="currentColor"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2"
                                                    d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
                                                />
                                            </svg>
                                            Reply
                                        </button>
                                    </div>
                                </article>
                            ))}

                            {/* <article className="p-6 mb-3 ml-6 lg:ml-12 text-base bg-white rounded-lg dark:bg-gray-900">
                                    <footer className="flex justify-between items-center mb-2">
                                        <div className="flex items-center">
                                            <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                                                <img
                                                    className="mr-2 w-6 h-6 rounded-full"
                                                    src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                                                    alt="Jese Leos"
                                                />
                                                Jese Leos
                                            </p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                <time
                                                    dateTime="2022-02-12"
                                                    title="February 12th, 2022"
                                                >
                                                    Feb. 12, 2022
                                                </time>
                                            </p>
                                        </div>
                                        <button
                                            id="dropdownComment2Button"
                                            data-dropdown-toggle="dropdownComment2"
                                            className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-40 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                                            type="button"
                                        >
                                            <svg
                                                className="w-4 h-4"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="currentColor"
                                                viewBox="0 0 16 3"
                                            >
                                                <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                                            </svg>
                                            <span className="sr-only">
                                                Comment settings
                                            </span>
                                        </button>
                                        <div
                                            id="dropdownComment2"
                                            className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                                        >
                                            <ul
                                                className="py-1 text-sm text-gray-700 dark:text-gray-200"
                                                aria-labelledby="dropdownMenuIconHorizontalButton"
                                            >
                                                <li>
                                                    <a
                                                        href="#"
                                                        className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                    >
                                                        Edit
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        href="#"
                                                        className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                    >
                                                        Remove
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        href="#"
                                                        className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                    >
                                                        Report
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </footer>
                                    <p className="text-gray-500 dark:text-gray-400">
                                        Much appreciated! Glad you liked it ☺️
                                    </p>
                                    <div className="flex items-center mt-4 space-x-4">
                                        <button
                                            type="button"
                                            className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium"
                                        >
                                            <svg
                                                className="mr-1.5 w-3.5 h-3.5"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 20 18"
                                            >
                                                <path
                                                    stroke="currentColor"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2"
                                                    d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
                                                />
                                            </svg>
                                            Reply
                                        </button>
                                    </div>
                                </article> */}
                        </div>
                    </section>
                </div>
            )}
        </div>
    );
};

export default Discussion_page;
