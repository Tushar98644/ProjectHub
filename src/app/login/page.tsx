'use client'
import { AI } from "@/shared"; // Your Lottie animation data
import { signIn } from "next-auth/react";
import dynamic from "next/dynamic";
import { FaGoogle, FaGithub, FaRocket, FaBrain, FaUsers } from "react-icons/fa";
import { motion } from "framer-motion";

const Lottie = dynamic(() => import('lottie-react'), {
    ssr: false,
});

const Login = () => {

    const pageVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.5, ease: "easeInOut" } },
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 50, scale: 0.95 },
        visible: {
            opacity: 1, y: 0, scale: 1,
            transition: { duration: 0.7, ease: [0.25, 1, 0.5, 1], delay: 0.2 },
        },
    };

    const textItemVariants = {
        hidden: { opacity: 0, y: 20, filter: "blur(3px)" },
        visible: (i: number) => ({
            opacity: 1, y: 0, filter: "blur(0px)",
            transition: { type: "spring", stiffness: 100, damping: 12, delay: 0.4 + i * 0.1 }
        }),
    };

    const lottieContainerVariants = {
        hidden: { opacity: 0, x: -100, rotate: -15 },
        visible: { opacity: 1, x: 0, rotate: 0, transition: { type: "spring", stiffness: 80, damping: 15, delay: 0.3 } },
    };

    const buttonGroupVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.7 } }
    };

    const buttonItemVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 150, damping: 10 } },
    };


    return (
        <motion.div
            variants={pageVariants}
            initial="hidden"
            animate="visible"
            className="min-h-screen flex flex-col items-center justify-center text-slate-100 px-4 py-12 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" 
        >
            <motion.div
                variants={cardVariants}
                className="relative w-full max-w-4xl lg:max-w-5xl grid lg:grid-cols-2 items-center bg-slate-800/40 backdrop-blur-2xl border border-slate-700/30 rounded-[32px] shadow-2xl overflow-hidden"
            >
                {/* Left Side - Content */}
                <div className="p-8 sm:p-10 md:p-12 lg:p-16 order-2 lg:order-1">
                    <motion.h1
                        custom={0}
                        variants={textItemVariants}
                        className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4"
                    >
                        Welcome to <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-400 to-purple-500">
                            ProjectHub
                        </span>
                    </motion.h1>

                    <motion.p
                        custom={1}
                        variants={textItemVariants}
                        className="text-slate-300 text-base sm:text-lg lg:text-xl mb-8 leading-relaxed"
                    >
                        Your central command for innovative projects. Leverage AI, connect with peers, and bring your ideas to life.
                    </motion.p>

                    <motion.div variants={buttonGroupVariants} className="space-y-4 max-w-sm">
                        <motion.button
                            custom={0}
                            variants={buttonItemVariants}
                            whileHover={{ scale: 1.03, y: -2, boxShadow: "0px 10px 25px rgba(74, 222, 128, 0.35)" }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => signIn("google")}
                            className="w-full group shiny-button inline-flex items-center justify-center px-6 py-3.5 text-base font-semibold text-white bg-gradient-to-br from-emerald-500 via-green-500 to-lime-500 rounded-xl hover:shadow-green-500/40 focus:outline-none focus:ring-4 focus:ring-emerald-500/50 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all duration-150 ease-in-out shadow-xl"
                        >
                            <FaGoogle className="w-5 h-5 mr-3 transition-transform duration-200 group-hover:rotate-[360deg] group-hover:scale-110" />
                            Sign In with Google
                        </motion.button>

                        <motion.button
                            custom={1}
                            variants={buttonItemVariants}
                            whileHover={{ scale: 1.03, y: -2, boxShadow: "0px 10px 25px rgba(129, 140, 248, 0.35)" }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => signIn("github")}
                            className="w-full group shiny-button-dark inline-flex items-center justify-center px-6 py-3.5 text-base font-semibold text-white bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-xl hover:shadow-purple-500/40 focus:outline-none focus:ring-4 focus:ring-indigo-500/50 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all duration-150 ease-in-out shadow-xl"
                        >
                            <FaGithub className="w-5 h-5 mr-3 transition-transform duration-200 group-hover:rotate-[360deg] group-hover:scale-110" />
                            Sign In with GitHub
                        </motion.button>
                    </motion.div>

                    <motion.div
                        custom={2}
                        variants={textItemVariants}
                        className="mt-10 text-xs text-slate-500 text-center sm:text-left"
                    >
                        By signing in, you embrace innovation and agree to our <br className="hidden sm:inline" />
                        <a href="/terms" className="underline hover:text-sky-400">Terms of Service</a> & <a href="/privacy" className="underline hover:text-sky-400">Privacy Policy</a>.
                    </motion.div>
                </div>

                {/* Right Side - Lottie Animation & Feature Icons */}
                <motion.div
                    variants={lottieContainerVariants}
                    className="lg:col-span-1 order-1 lg:order-2 p-8 sm:p-10 md:p-12 flex flex-col items-center justify-center bg-slate-900/30 min-h-[300px] lg:min-h-full" // Ensure min height for Lottie
                >
                    <div className="w-full max-w-[280px] sm:max-w-[320px] lg:max-w-[380px] mb-6 lg:mb-8">
                        <Lottie animationData={AI} loop={true} style={{ width: '100%', height: 'auto' }} />
                    </div>
                    <div className="flex space-x-6 text-sky-400">
                        <motion.div variants={textItemVariants} custom={3} className="flex flex-col items-center text-center">
                            <FaRocket className="text-3xl mb-1.5" />
                            <span className="text-xs text-slate-300">Launch Fast</span>
                        </motion.div>
                        <motion.div variants={textItemVariants} custom={4} className="flex flex-col items-center text-center">
                            <FaBrain className="text-3xl mb-1.5" />
                            <span className="text-xs text-slate-300">AI Powered</span>
                        </motion.div>
                        <motion.div variants={textItemVariants} custom={5} className="flex flex-col items-center text-center">
                            <FaUsers className="text-3xl mb-1.5" />
                            <span className="text-xs text-slate-300">Collaborate</span>
                        </motion.div>
                    </div>
                </motion.div>
            </motion.div>
        </motion.div>
    );
};

export default Login;