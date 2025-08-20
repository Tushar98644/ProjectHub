"use client";

import Navbar from "@/components/layout/navbar/navbar";
import Sidebar from "@/components/layout/sidebar";
import { useCentralStore } from "@/config/Store";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const { isSidebarOpen, setIsSidebarOpen } = useCentralStore();
    const pathname = usePathname();

    const segments = (pathname || "").split("/").filter(Boolean);
    const isThreadDetail =
        segments.length === 3 && segments[0] === "dashboard" && segments[1] === "threads" && segments[2] !== "create";

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="h-screen w-full overflow-hidden"
        >
            <AnimatePresence>
                {isSidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsSidebarOpen(false)}
                        className="fixed inset-0 bg-black/60 z-40 md:hidden"
                    />
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isSidebarOpen && (
                    <motion.div
                        initial={{ x: "-100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "-100%" }}
                        transition={{ duration: 0.3, type: "spring", bounce: 0.25 }}
                        className="fixed top-0 left-0 z-50 h-full md:hidden"
                    >
                        <Sidebar />
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="flex h-full">
                <div className="hidden md:block flex-shrink-0">
                    <Sidebar />
                </div>

                <div className="flex-1 flex flex-col min-w-0 h-full ml-2">
                    {!isThreadDetail && (
                        <div className="flex-shrink-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
                            <Navbar />
                        </div>
                    )}

                    <div className="flex-1 min-h-0 overflow-auto">
                        <div
                            className={
                                isThreadDetail
                                    ? `h-full px-4 pb-4 pt-4 sm:px-2 sm:pt-4 lg:px-4 lg:pt-6`
                                    : `h-full px-4 pt-4 sm:px-6 sm:pt-6 lg:px-8 lg:pt-8`
                            }
                        >
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
