"use client";
import Link from "next/link";
import { useReducer, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; // Ensure ToastContainer is in a global layout
import Image from "next/image";
import InputField from "./InputField";
import { FaPaperPlane, FaEnvelope, FaSpinner, FaComments } from "react-icons/fa";
import { motion, useMotionValue, useTransform } from "framer-motion";

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

// Define the action type more precisely
type FormAction =
    | { type: "name"; payload: string }
    | { type: "email"; payload: string }
    | { type: "message"; payload: string };
const reducer = (state: FormState, action: FormAction): FormState => {
    return { ...state, [action.type]: action.payload };
};

// Add placeholder to the formFields definition
const formFields: Array<{ label: string; type: string; key: keyof FormState; required: boolean; placeholder: string }> = [
    { label: "Full Name", type: "text", key: "name", required: true, placeholder: "e.g., Ada Lovelace" },
    { label: "Email Address", type: "email", key: "email", required: true, placeholder: "ada@example.com" },
    { label: "Your Message", type: "textarea", key: "message", required: true, placeholder: "Share your brilliant ideas or questions..." },
];

const Contact = () => {
    const { push: redirect } = useRouter();
    const [state, dispatch] = useReducer(reducer, initialState);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // For 3D-like hover effect on the image container
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-100, 100], [10, -10]); // Max rotation 10 degrees
    const rotateY = useTransform(x, [-100, 100], [-10, 10]); // Max rotation 10 degrees
    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const rect = event.currentTarget.getBoundingClientRect();
        // Calculate mouse position relative to the center of the element
        x.set(event.clientX - rect.left - rect.width / 2);
        y.set(event.clientY - rect.top - rect.height / 2);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        const config = {
            headers: { "Content-Type": "application/json" },
        };
        try {
            await axios.post("/api/message", state, config);
            toast.success("Message sent! We'll be in touch soon.", {
                theme: "dark",
                position: "top-right",
                autoClose: 3000,
            });
            dispatch({ type: "name", payload: "" });
            dispatch({ type: "email", payload: "" });
            dispatch({ type: "message", payload: "" });
        } catch (error) {
            console.error("Error sending message:", error);
            toast.error("Oops! Something went wrong. Please try again.", { theme: "dark", position: "top-center" });
        } finally {
            setIsSubmitting(false);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: {
            opacity: 1, scale: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.2, duration: 0.6, ease: "easeOut" },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30, filter: "blur(5px)" },
        visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { type: "spring", stiffness: 80, damping: 15 } },
    };

    return (
        <div className="min-h-screen text-slate-100 flex items-center justify-center py-16 sm:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden opacity-95">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="max-w-screen-lg w-full bg-slate-800/50 backdrop-blur-2xl border border-slate-700/40 rounded-[30px] shadow-2xl overflow-hidden"
            >
                <div className="grid md:grid-cols-5">
                    <motion.div
                        variants={itemVariants}
                        className="md:col-span-2 p-8 sm:p-10 md:p-12 flex flex-col justify-center bg-gradient-to-br from-slate-900/50 via-slate-800/30 to-slate-900/50"
                    >
                        <div className="mb-auto">
                            <motion.h2
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3, duration: 0.5 }}
                                className="text-4xl lg:text-5xl font-extrabold leading-tight mb-1"
                            >
                                Let&apos;s
                            </motion.h2>
                            <motion.h2
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4, duration: 0.5 }}
                                className="text-4xl lg:text-5xl font-extrabold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-300 to-purple-400 mb-6"
                            >
                                Connect!
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5, duration: 0.5 }}
                                className="text-slate-300 text-base lg:text-lg leading-relaxed mb-8"
                            >
                                Have a question, a project idea, or just want to say hello? We&apos;d love to hear from you.
                            </motion.p>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.6, duration: 0.5 }}
                                className="text-slate-400 flex items-center group text-sm"
                            >
                                <FaEnvelope className="w-4 h-4 mr-2 text-sky-500 group-hover:text-sky-300 transition-colors" />
                                <span className="mr-1">Prefer email?</span>
                                <Link href="mailto:evilden982@gmail.com" legacyBehavior>
                                    <a className="font-semibold text-sky-500 underline hover:text-sky-300 transition-colors">
                                        Send directly
                                    </a>
                                </Link>
                            </motion.div>
                        </div>

                        <motion.div
                            variants={itemVariants}
                            className="mt-10 text-center hidden md:block perspective"
                            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                            onMouseMove={handleMouseMove}
                            onMouseLeave={handleMouseLeave}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                            <Image
                                src="/contact-bg.png"
                                width={300}
                                height={300}
                                alt="Connect with us"
                                className="mx-auto opacity-70 rounded-2xl shadow-xl"
                                style={{ transform: "translateZ(20px)" }}
                            />
                        </motion.div>
                    </motion.div>

                    <motion.div variants={itemVariants} className="md:col-span-3 p-8 sm:p-10 md:p-12 bg-slate-800/30">
                        <div className="flex items-center mb-6">
                            <FaComments className="text-2xl text-sky-400 mr-3" />
                            <h3 className="text-2xl font-semibold text-slate-100">Send us a Message</h3>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-5">
                            {formFields.map(({ label, type, key, required, placeholder }) => (
                                <InputField
                                    key={key}
                                    label={label}
                                    type={type === "textarea" ? "text" : type}
                                    value={state[key]}
                                    onChange={(value) => dispatch({ type: key, payload: value })}
                                    required={required}
                                    textarea={type === "textarea"}
                                    placeholder={placeholder}
                                />
                            ))}
                            <div>
                                <motion.button
                                    type="submit"
                                    disabled={isSubmitting}
                                    whileHover={{
                                        scale: 1.03,
                                        y: -3,
                                        boxShadow: "0px 10px 20px rgba(20, 184, 166, 0.4)",
                                        transition: { type: "spring", stiffness: 300, damping: 15 }
                                    }}
                                    whileTap={{ scale: 0.97 }}
                                    className="w-full mt-2 inline-flex items-center justify-center text-sm font-bold tracking-wider bg-gradient-to-r from-sky-500 via-teal-500 to-emerald-500 text-white p-4 rounded-xl focus:outline-none focus:ring-4 focus:ring-teal-500/50 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all duration-150 ease-in-out shadow-xl disabled:opacity-50"
                                >
                                    {isSubmitting ? (
                                        <FaSpinner className="animate-spin mr-2.5" />
                                    ) : (
                                        <FaPaperPlane className="mr-2.5" />
                                    )}
                                    {isSubmitting ? "Sending..." : "Send Your Message"}
                                </motion.button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default Contact;