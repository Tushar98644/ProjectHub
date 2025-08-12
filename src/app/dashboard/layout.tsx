"use client";

import Sidebar from "@/components/layout/sidebar";
import { useCentralStore } from "@/config/Store";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    const { isSidebarOpen, setIsSidebarOpen } = useCentralStore();

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`${isSidebarOpen ? "overflow-hidden" : ""} h-screen`}
        >
            {/* backdrop */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        onClick={() => setIsSidebarOpen(false)}
                        className="bg-black/60 absolute top-0 left-0 md:hidden w-full h-screen z-20"
                    />
                )}
            </AnimatePresence>

            {/* mobile sidebar */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <motion.div
                        initial={{ x: "-100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "-100%" }}
                        transition={{
                            duration: 0.3,
                            type: "spring",
                            bounce: 0.25,
                        }}
                        className="absolute md:hidden z-30 top-0 left-0"
                    >
                        <Sidebar />
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="grid md:grid-cols-[240px_1fr] w-screen overflow-x-hidden">
                <div className="hidden md:block">
                    <Sidebar />
                </div>

                <div className="w-full overflow-x-auto max-w-[1440px] mx-auto scroll-m-0 min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors">
                    {children}
                </div>
            </div>
        </motion.div>
    );
};

export default DashboardLayout;
