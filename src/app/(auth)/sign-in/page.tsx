"use client";
import { AI } from "@/shared";
import dynamic from "next/dynamic";
import {
    FaGoogle,
    FaGithub,
    FaRocket,
    FaBrain,
    FaUsers,
    FaArrowRight,
} from "react-icons/fa";
import { motion } from "motion/react";
import { signIn } from "@/config/auth/client";

const Lottie = dynamic(() => import("lottie-react"), {
    ssr: false,
});

const Login = () => {
    const handleSocialSignIn = async (provider: string) => {
        await signIn.social({
            provider: provider,
        });
    };

    const pageVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { duration: 0.6, ease: "easeInOut" },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 },
        },
    };

    const textItemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15,
                delay: 0.3 + i * 0.1,
            },
        }),
    };

    const buttonGroupVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.6 },
        },
    };

    const buttonItemVariants = {
        hidden: { opacity: 0, x: -20, scale: 0.95 },
        visible: {
            opacity: 1,
            x: 0,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 120,
                damping: 12,
            },
        },
    };

    const floatingVariants = {
        animate: {
            y: [-10, 10, -10],
            transition: {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
            },
        },
    };

    return (
        <motion.div
            animate={pageVariants}
            initial="hidden"
            className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100 px-4 py-12 sm:px-6 lg:px-8 relative overflow-hidden"
        >
            {/* Background Elements */}
            <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
            <motion.div
                className="absolute top-20 left-20 w-32 h-32 bg-blue-100 rounded-full blur-3xl opacity-30"
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.2, 0.3] }}
                transition={{ duration: 4, repeat: Infinity }}
            />
            <motion.div
                className="absolute bottom-20 right-20 w-40 h-40 bg-purple-100 rounded-full blur-3xl opacity-30"
                animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.3, 0.2] }}
                transition={{ duration: 3, repeat: Infinity }}
            />

            {/* Header */}
            <motion.div
                animate={textItemVariants}
                custom={0}
                className="text-center mb-8"
            >
                <motion.h1
                    className="text-4xl sm:text-5xl font-bold text-gray-900 mb-3"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                    Project<span className="text-blue-600">Hub</span>
                </motion.h1>
                <motion.p
                    className="text-gray-600 text-base font-medium"
                    animate={floatingVariants}
                >
                    Developer tools for modern teams
                </motion.p>
            </motion.div>

            {/* Main Card */}
            <motion.div
                animate={cardVariants}
                className="w-full max-w-lg bg-white/80 backdrop-blur-xl border border-gray-200/50 rounded-2xl shadow-xl shadow-gray-200/50 p-8 relative"
            >
                {/* Subtle glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-purple-50/50 rounded-2xl blur-xl -z-10"></div>

                {/* Lottie Animation */}
                <motion.div
                    animate={textItemVariants}
                    custom={1}
                    className="flex justify-center mb-6"
                >
                    <motion.div
                        className="w-24 h-24"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 20,
                        }}
                    >
                        <Lottie
                            animationData={AI}
                            loop={true}
                            style={{ width: "100%", height: "100%" }}
                        />
                    </motion.div>
                </motion.div>

                {/* Welcome Text */}
                <motion.div
                    animate={textItemVariants}
                    custom={2}
                    className="text-center mb-8"
                >
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">
                        Welcome back
                    </h2>
                    <p className="text-gray-600 text-sm leading-relaxed">
                        Sign in to access your workspace and continue building
                        amazing projects
                    </p>
                </motion.div>

                {/* Sign In Buttons */}
                <motion.div
                    animate={buttonGroupVariants}
                    className="space-y-4 mb-8"
                >
                    <motion.button
                        animate={buttonItemVariants}
                        whileHover={{
                            y: -2,
                            scale: 1.02,
                            boxShadow:
                                "0 10px 25px -5px rgba(59, 130, 246, 0.25)",
                        }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleSocialSignIn("google")}
                        className="w-full group flex items-center justify-center px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold text-sm transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-500/30 shadow-lg"
                    >
                        <FaGoogle className="w-4 h-4 mr-3 group-hover:scale-110 transition-transform duration-200" />
                        Continue with Google
                        <FaArrowRight className="w-4 h-4 ml-3 group-hover:translate-x-1 transition-transform duration-200" />
                    </motion.button>

                    <motion.button
                        animate={buttonItemVariants}
                        whileHover={{
                            y: -2,
                            scale: 1.02,
                            boxShadow:
                                "0 10px 25px -5px rgba(75, 85, 99, 0.25)",
                        }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleSocialSignIn("github")}
                        className="w-full group flex items-center justify-center px-6 py-4 bg-gray-900 hover:bg-gray-800 text-white rounded-xl font-semibold text-sm transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-gray-500/30 shadow-lg"
                    >
                        <FaGithub className="w-4 h-4 mr-3 group-hover:scale-110 transition-transform duration-200" />
                        Continue with GitHub
                        <FaArrowRight className="w-4 h-4 ml-3 group-hover:translate-x-1 transition-transform duration-200" />
                    </motion.button>
                </motion.div>

                {/* Feature Icons */}
                <motion.div
                    animate={textItemVariants}
                    custom={3}
                    className="flex justify-center space-x-10 mb-8"
                >
                    {[
                        {
                            icon: FaRocket,
                            label: "Launch Fast",
                            color: "text-orange-500",
                        },
                        {
                            icon: FaBrain,
                            label: "AI Powered",
                            color: "text-purple-500",
                        },
                        {
                            icon: FaUsers,
                            label: "Collaborate",
                            color: "text-green-500",
                        },
                    ].map((item, index) => (
                        <motion.div
                            key={index}
                            className="flex flex-col items-center group cursor-pointer"
                            whileHover={{ scale: 1.1, y: -5 }}
                            transition={{
                                type: "spring",
                                stiffness: 400,
                                damping: 10,
                            }}
                        >
                            <item.icon
                                className={`text-xl ${item.color} mb-2 group-hover:scale-110 transition-transform duration-200`}
                            />
                            <span className="text-xs text-gray-600 font-medium group-hover:text-gray-900 transition-colors duration-200">
                                {item.label}
                            </span>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Footer */}
                <motion.div
                    animate={textItemVariants}
                    custom={4}
                    className="text-center border-t border-gray-100 pt-6"
                >
                    <p className="text-xs text-gray-500 leading-relaxed">
                        By signing in, you agree to our{" "}
                        <motion.a
                            href="/terms"
                            className="text-blue-600 hover:text-blue-700 underline font-medium"
                            whileHover={{ scale: 1.05 }}
                            transition={{
                                type: "spring",
                                stiffness: 400,
                                damping: 10,
                            }}
                        >
                            Terms of Service
                        </motion.a>{" "}
                        and{" "}
                        <motion.a
                            href="/privacy"
                            className="text-blue-600 hover:text-blue-700 underline font-medium"
                            whileHover={{ scale: 1.05 }}
                            transition={{
                                type: "spring",
                                stiffness: 400,
                                damping: 10,
                            }}
                        >
                            Privacy Policy
                        </motion.a>
                    </p>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default Login;
