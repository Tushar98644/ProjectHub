"use client";
import Link from "next/link";
import { useReducer } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Image from "next/image";
import InputField from "./InputField";

interface FormState {
    name: string;
    email: string;
    message: string;
}

const initialState: FormState = {
    name: "",
    email: "",
    message: "",
};

const reducer = (state: FormState, action: { type: keyof FormState; payload: string }) => {
    return { ...state, [action.type]: action.payload };
};

const formFields = [
    { label: "Full Name", type: "text", key: "name", required: true },
    { label: "Email", type: "email", key: "email", required: true },
    { label: "Message", type: "textarea", key: "message", required: true },
];

const Contact = () => {
    const { push: redirect } = useRouter();
    const [state, dispatch] = useReducer(reducer, initialState);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        await axios.post("/api/message", state, config);
        notify();
        redirect("/");
    };

    const notify = () => {
        toast.success("Your message has been sent.", {
            closeButton: true,
            position: "top-right",
            autoClose: 3000,
            theme: "dark",
        });
    };

    return (
        <div className="text-gray-100 px-8 py-12 relative opacity-70">
            <div className="max-w-screen-xl mt-24 px-8 grid gap-8 grid-cols-1 md:grid-cols-2 md:px-12 lg:px-16 xl:px-32 py-16 mx-auto gradient text-gray-900 rounded-lg shadow-lg">
                <div className="flex flex-col justify-between">
                    <div>
                        <h2 className="text-4xl lg:text-5xl font-bold leading-tight text-gray-200">
                            Lets talk about everything!
                        </h2>
                        <div className="text-gray-400 mt-8">
                            Hate forms? Send us an{" "}
                            <Link href="mailto:evilden982@gmail.com">
                                <span className="underline">email</span>{" "}
                            </Link>
                            instead.
                        </div>
                    </div>
                    <div className="mt-8 text-center">
                        <Image src="/contact-bg.png" width={500} height={500} alt="contact-bg" />
                    </div>
                </div>
                <div>
                    <form onSubmit={handleSubmit}>
                        {formFields.map(({ label, type, key, required }) => (
                            <InputField
                                key={key}
                                label={label}
                                type={type === "textarea" ? "text" : type}
                                value={state[key as keyof FormState]}
                                onChange={(value) => dispatch({ type: key as keyof FormState, payload: value })}
                                required={required}
                                textarea={type === "textarea"}
                            />
                        ))}
                        <div className="mt-8">
                            <button className="uppercase text-sm font-bold tracking-wide bg-indigo-500 text-gray-100 p-3 rounded-lg w-full focus:outline-none focus:shadow-outline">
                                Send Message
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;