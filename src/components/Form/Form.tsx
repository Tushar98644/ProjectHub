'use client'
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { useReducer } from "react";

const initialState = {
    title: "",
    description: "",
    image: "",
    github: "",
    tags: [],
    newTag: "",
};

const reducer = (state: any, action: any) => {
    switch (action.type) {
        case "SET_TITLE":
            return { ...state, title: action.payload };
        case "SET_DESCRIPTION":
            return { ...state, description: action.payload };
        case "SET_IMAGE":
            return { ...state, image: action.payload };
        case "SET_GITHUB":
            return { ...state, github: action.payload };
        case "SET_TAGS":
            return { ...state, tags: action.payload };
        case "SET_NEW_TAG":
            return { ...state, newTag: action.payload };

        default:
            return state;
    }
};

const Form = () => {
    const router = useRouter();
    const { data: session } = useSession();
    const [state, dispatch] = useReducer(reducer, initialState);

    const handleAddTag = () => {
        if (state.newTag.trim() !== "" && state.tags.length < 10) {
            dispatch({
                type: "SET_TAGS",
                payload: [...state.tags, state.newTag.trim()],
            });
            dispatch({ type: "SET_NEW_TAG", payload: "" });
        }
    };

    const handleRemoveTag = (tagToRemove: string) => {
        const updatedTags = state.tags.filter(
            (tag: string) => tag !== tagToRemove
        );
        dispatch({ type: "SET_TAGS", payload: updatedTags });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const name = session?.user?.name || "Anonymous";
        console.log(`the contributor is ${name}`);
        const data = { ...state, name };
        console.log(`the tags are ${state.tags}`);
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        try {
            await axios.post("/api/project", data, config);
            router.push("/");
            notify();
        } catch (error) {
            console.error(error);
            toast(
                "An error occurred while sending your project for approval.",
                {
                    closeButton: true,
                    position: "top-right",
                    autoClose: 3000,
                    theme: "dark",
                }
            );
        }
    };

    const notify = () => {
        toast("Your project has been sent for approval.", {
            closeButton: true,
            position: "top-right",
            autoClose: 3000,
            theme: "dark",
        });
    };

    return (
        <form onSubmit={handleSubmit} className="z-[2]">
            <div className="mb-6">
                <label
                    htmlFor="email"
                    className="block mb-2 text-md font-medium text-gray-900 dark:text-white"
                >
                    Project Title
                </label>
                <input
                    type="text"
                    id="title"
                    value={state.title}
                    onChange={e =>
                        dispatch({ type: "SET_TITLE", payload: e.target.value })
                    }
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    placeholder="enter a project title"
                    required
                />
            </div>
            <div className="mb-6">
                <label
                    htmlFor="password"
                    className="block mb-2 text-md font-medium text-gray-900 dark:text-white"
                >
                    Project Description
                </label>
                <input
                    type="text"
                    id="description"
                    value={state.description}
                    onChange={e =>
                        dispatch({
                            type: "SET_DESCRIPTION",
                            payload: e.target.value,
                        })
                    }
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    placeholder="enter a project description"
                    required
                />
            </div>
            <div className="mb-6">
                <label
                    htmlFor="github"
                    className="block mb-2 text-md font-medium text-gray-900 dark:text-white"
                >
                    Github Link
                </label>
                <input
                    type="text"
                    id="github link"
                    value={state.github}
                    onChange={e =>
                        dispatch({
                            type: "SET_GITHUB",
                            payload: e.target.value,
                        })
                    }
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    placeholder="enter the project's github link"
                    required
                />
            </div>
            <div className="mb-6">
                <label
                    htmlFor="image"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                    Image Link
                </label>
                <input
                    type="url"
                    value={state.image}
                    onChange={e =>
                        dispatch({ type: "SET_IMAGE", payload: e.target.value })
                    }
                    id="repeat-password"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    placeholder="enter a image url"
                    required
                />
            </div>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col items-center mt-1 text-sm sm:flex-row sm:space-y-0 sm:space-x-4">
                    <div className="w-full sm:mb-2">
                        <label htmlFor="input1">
                            <span className="ml-2 text-sm text-gray-900 sm:text-base dark:text-gray-200">
                                Tags
                            </span>
                            <input
                                id="input1"
                                minLength={3}
                                maxLength={10}
                                value={state.newTag}
                                onChange={e =>
                                    dispatch({
                                        type: "SET_NEW_TAG",
                                        payload: e.target.value,
                                    })
                                }
                                className="mt-1 py-3 px-5 w-full border-2 border-purple-300 rounded-xl outline-none placeholder:text-gray-400 invalid:text-pink-700 invalid:focus:ring-pink-700 invalid:focus:border-pink-700 peer dark:bg-gray-700 dark:text-gray-200 dark:placeholder:text-gray-300 dark:invalid:text-pink-300 dark:border-gray-600"
                                type="text"
                                placeholder="Enter tags (optional)"
                            />
                            <p className="ml-2 text-xs text-pink-700 invisible peer-invalid:visible dark:text-gray-200">
                                Less than 7 characters
                            </p>
                        </label>
                    </div>
                    <div
                        onClick={handleAddTag}
                        className="w-full text-center py-3 px-8 text-sm font-medium bg-purple-500 text-gray-100 rounded-2xl cursor-pointer sm:w-min hover:bg-purple-700 hover:text-gray-50 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-50 mb-4 sm:mb-0"
                    >
                        <span>Add</span>
                    </div>
                </div>
                {state.tags.length > 0 && (
                    <div className="px-2 pt-2 pb-11 mb-3 flex flex-wrap rounded-lg bg-purple-200 dark:bg-gray-400">
                        {state.tags.map((tag: string) => (
                            <span
                                key={tag}
                                className="flex flex-wrap pl-4 pr-2 py-2 m-1 justify-between items-center text-sm font-medium rounded-xl cursor-pointer bg-purple-500 text-gray-200 hover:bg-purple-600 hover:text-gray-100 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-gray-100"
                            >
                                {tag}
                                <button onClick={() => handleRemoveTag(tag)}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5 ml-3 hover:text-gray-300"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                            clip-rule="evenodd"
                                        />
                                    </svg>
                                </button>
                            </span>
                        ))}
                    </div>
                )}
            </form>
            <div className="flex items-start mb-6">
                <div className="flex items-center h-5">
                    <input
                        id="terms"
                        type="checkbox"
                        value=""
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                        required
                    />
                </div>
                <label
                    htmlFor="terms"
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                    I agree with the{" "}
                    <a
                        href="#"
                        className="text-blue-600 hover:underline dark:text-blue-500"
                    >
                        terms and conditions
                    </a>
                </label>
            </div>
            <div className="flex justify-center md:justify-start">
                <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Send for Approval
                </button>
            </div>
        </form>
    );
};

export default Form;
