"use client";
import { AI } from "@/shared";
import { signIn } from "next-auth/react";
import dynamic from "next/dynamic";
import {
    FaGoogle,
    FaGithub,
    FaRocket,
    FaBrain,
    FaUsers,
    FaArrowRight,
} from "react-icons/fa";
import { motion } from "framer-motion";

const Lottie = dynamic(() => import("lottie-react"), {
    ssr: false,
});

const Login = () => {
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
            variants={pageVariants}
            initial="hidden"
            animate="visible"
            className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
            style={{
                background: `
                    radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.08) 0%, transparent 50%),
                    radial-gradient(circle at 80% 20%, rgba(147, 51, 234, 0.08) 0%, transparent 50%),
                    radial-gradient(circle at 40% 40%, rgba(16, 185, 129, 0.06) 0%, transparent 50%),
                    linear-gradient(135deg, rgba(249, 250, 251, 0.8) 0%, rgba(243, 244, 246, 0.9) 100%),
                    url("image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f3f4f6' fill-opacity='0.4'%3E%3Ccircle cx='10' cy='10' r='1'/%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3Ccircle cx='50' cy='50' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")
                `,
            }}
        >
            <div className="px-4 py-12 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <motion.div
                    variants={textItemVariants}
                    custom={0}
                    className="text-center mb-8"
                >
                    <motion.h1
                        className="text-4xl sm:text-5xl font-bold text-gray-900 mb-3 relative"
                        whileHover={{ scale: 1.02 }}
                        transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 10,
                        }}
                    >
                        <span className="relative">
                            Project<span className="text-blue-600">Hub</span>
                            <motion.div
                                className="absolute -inset-1 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-lg blur-lg -z-10"
                                animate={{
                                    opacity: [0, 0.5, 0],
                                    scale: [0.8, 1.1, 0.8],
                                }}
                                transition={{ duration: 3, repeat: Infinity }}
                            />
                        </span>
                    </motion.h1>
                    <motion.p
                        className="text-gray-600 text-base font-medium"
                        variants={floatingVariants}
                        animate="animate"
                    >
                        Developer tools for modern teams
                    </motion.p>
                </motion.div>

                {/* Main Card */}
                <motion.div
                    variants={cardVariants}
                    className="w-full max-w-lg bg-white/90 backdrop-blur-xl border border-white/50 rounded-2xl shadow-2xl shadow-gray-200/30 p-8 relative mx-auto"
                    style={{
                        boxShadow: `
                            0 25px 50px -12px rgba(0, 0, 0, 0.08),
                            0 0 0 1px rgba(255, 255, 255, 0.8),
                            inset 0 1px 0 rgba(255, 255, 255, 0.9)
                        `,
                    }}
                >
                    {/* Lottie Animation */}
                    <motion.div
                        variants={textItemVariants}
                        custom={1}
                        className="flex justify-center mb-6"
                    >
                        <motion.div
                            className="w-24 h-24 relative"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 20,
                            }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 to-purple-100/50 rounded-full blur-lg animate-pulse" />
                            <Lottie
                                animationData={AI}
                                loop={true}
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    position: "relative",
                                    zIndex: 10,
                                }}
                            />
                        </motion.div>
                    </motion.div>

                    {/* Welcome Text */}
                    <motion.div
                        variants={textItemVariants}
                        custom={2}
                        className="text-center mb-8"
                    >
                        <h2 className="text-2xl font-bold text-gray-900 mb-3">
                            Welcome back
                        </h2>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            Sign in to access your workspace and continue
                            building amazing projects
                        </p>
                    </motion.div>

                    {/* Sign In Buttons */}
                    <motion.div
                        variants={buttonGroupVariants}
                        className="space-y-4 mb-8"
                    >
                        <motion.button
                            variants={buttonItemVariants}
                            whileHover={{
                                y: -2,
                                scale: 1.02,
                                boxShadow:
                                    "0 20px 40px -10px rgba(59, 130, 246, 0.3)",
                            }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => signIn("google")}
                            className="w-full group flex items-center justify-center px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold text-sm transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-500/30 shadow-lg relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <FaGoogle className="w-4 h-4 mr-3 group-hover:scale-110 transition-transform duration-200 relative z-10" />
                            <span className="relative z-10">
                                Continue with Google
                            </span>
                            <FaArrowRight className="w-4 h-4 ml-3 group-hover:translate-x-1 transition-transform duration-200 relative z-10" />
                        </motion.button>

                        <motion.button
                            variants={buttonItemVariants}
                            whileHover={{
                                y: -2,
                                scale: 1.02,
                                boxShadow:
                                    "0 20px 40px -10px rgba(75, 85, 99, 0.3)",
                            }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => signIn("github")}
                            className="w-full group flex items-center justify-center px-6 py-4 bg-gray-900 hover:bg-gray-800 text-white rounded-xl font-semibold text-sm transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-gray-500/30 shadow-lg relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-gray-700/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <FaGithub className="w-4 h-4 mr-3 group-hover:scale-110 transition-transform duration-200 relative z-10" />
                            <span className="relative z-10">
                                Continue with GitHub
                            </span>
                            <FaArrowRight className="w-4 h-4 ml-3 group-hover:translate-x-1 transition-transform duration-200 relative z-10" />
                        </motion.button>
                    </motion.div>

                    {/* Feature Icons */}
                    <motion.div
                        variants={textItemVariants}
                        custom={3}
                        className="flex justify-center space-x-10 mb-8"
                    >
                        {[
                            {
                                icon: FaRocket,
                                label: "Launch Fast",
                                color: "text-orange-500",
                                bgColor: "bg-orange-50",
                            },
                            {
                                icon: FaBrain,
                                label: "AI Powered",
                                color: "text-purple-500",
                                bgColor: "bg-purple-50",
                            },
                            {
                                icon: FaUsers,
                                label: "Collaborate",
                                color: "text-green-500",
                                bgColor: "bg-green-50",
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
                                <div
                                    className={`p-2 ${item.bgColor} rounded-lg mb-2 group-hover:scale-110 transition-all duration-200`}
                                >
                                    <item.icon
                                        className={`text-lg ${item.color}`}
                                    />
                                </div>
                                <span className="text-xs text-gray-600 font-medium group-hover:text-gray-900 transition-colors duration-200">
                                    {item.label}
                                </span>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Footer */}
                    <motion.div
                        variants={textItemVariants}
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
            </div>
        </motion.div>
    );
};

export default Login;
