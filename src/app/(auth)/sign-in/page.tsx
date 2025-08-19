"use client";

import { signIn } from "@/config/auth/client";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { motion } from "framer-motion"; // use framer instead of motion/react

export default function Login() {
    const handleSocialSignIn = async (provider: "google" | "github") => {
        await signIn.social({ provider });
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background via-background to-background px-4">
            <div className="w-full max-w-md bg-card/60 backdrop-blur-xl border border-border rounded-2xl shadow-md p-8 space-y-8">
                <div className="text-center space-y-2">
                    <h1 className="text-4xl font-bold tracking-tight">
                        Project<span className="text-primary">Hub</span>
                    </h1>
                    <p className="text-sm text-muted-foreground">Developer tools for modern teams</p>
                </div>

                <div className="space-y-4">
                    <motion.button
                        whileTap={{ scale: 0.97 }}
                        className="w-full flex items-center justify-center gap-2 py-3 bg-primary text-white rounded-lg font-medium"
                        onClick={() => handleSocialSignIn("google")}
                    >
                        <FaGoogle className="h-4 w-4" />
                        Continue with Google
                    </motion.button>

                    <motion.button
                        whileTap={{ scale: 0.97 }}
                        className="w-full flex items-center justify-center gap-2 py-3 bg-gray-900 text-white rounded-lg font-medium"
                        onClick={() => handleSocialSignIn("github")}
                    >
                        <FaGithub className="h-4 w-4" />
                        Continue with GitHub
                    </motion.button>
                </div>

                <div className="text-center text-xs text-muted-foreground">
                    By signing in, you agree to our{" "}
                    <a href="/terms" className="text-primary underline">
                        Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="/privacy" className="text-primary underline">
                        Privacy Policy
                    </a>
                </div>
            </div>
        </div>
    );
}
