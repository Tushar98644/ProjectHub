"use client";

import Navbar from "@/components/layout/navbar/navbar";
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
            className={`${isSidebarOpen ? "overflow-hidden" : ""} overflow-x-hidden`}
        >
            {/* backdrop */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        onClick={() => setIsSidebarOpen(false)}
                        className="bg-black/60 absolute top-0 left-0 md:hidden w-full z-20 h-full"
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

            <div className="flex flex-row w-full h-screen overflow-hidden">
                <div className="hidden md:block">
                    <Sidebar />
                </div>

                <div className="flex flex-col h-full min-w-0 flex-1">
                    <div>
                        <Navbar />
                    </div>

                    <div className="flex-1 w-full h-full min-w-0 p-4 md:p-6 bg-gradient-to-b from-background via-background to-background">
                        {children}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default DashboardLayout;
