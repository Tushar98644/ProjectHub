'use client'
import { Form } from "@/components";
import { useSession } from "next-auth/react";
import { FaLightbulb, FaUsers, FaRocket } from "react-icons/fa";

const Add_Project = () => {
    const { data: session } = useSession();

    const userName = session?.user?.name || "Innovator";

    return (
        <div className="min-h-screen relative flex flex-col items-center justify-center pt-32 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl w-full space-y-12">
                {/* Header Section */}
                <header className="text-center">
                    <FaRocket className="mx-auto text-5xl text-sky-400 mb-6 animate-bounce" />
                    <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
                        Launch Your <span className="text-sky-400">Next Big Idea</span>
                    </h1>
                    <p className="mt-4 text-lg text-slate-300 max-w-xl mx-auto">
                        Welcome, <span className="font-semibold text-sky-300">{userName}</span>! Share your project with the community and let&apos;s build something amazing together.
                    </p>
                </header>
                {/* Form Section */}
                <div className="bg-slate-800 shadow-2xl rounded-xl p-6 sm:p-10 opacity-70">
                    <Form />
                </div>

                {/* Informational Section (Optional) */}
                <section className="mt-16 text-center">
                    <h2 className="text-2xl font-semibold text-slate-200 mb-6">Why Share Your Project?</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="flex flex-col items-center p-6 bg-slate-800/50 rounded-lg shadow-lg hover:shadow-sky-500/20 transition-shadow duration-300">
                            <FaLightbulb className="text-4xl text-amber-400 mb-3" />
                            <h3 className="text-lg font-medium text-slate-100 mb-1">Spark Innovation</h3>
                            <p className="text-sm text-slate-400">Inspire others and get valuable feedback to refine your ideas.</p>
                        </div>
                        <div className="flex flex-col items-center p-6 bg-slate-800/50 rounded-lg shadow-lg hover:shadow-purple-500/20 transition-shadow duration-300">
                            <FaUsers className="text-4xl text-purple-400 mb-3" />
                            <h3 className="text-lg font-medium text-slate-100 mb-1">Collaborate & Connect</h3>
                            <p className="text-sm text-slate-400">Find collaborators, build a team, and network with like-minded individuals.</p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Add_Project;