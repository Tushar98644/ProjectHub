"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

interface props {
    option1: string;
    option2: string;
    option3: string;
    defaultOption?: string;
    minWidth?: number;
}

function Tabs({ option1, option2, option3, defaultOption, minWidth }: props) {
    const [activeTab, setActiveTab] = useState<string>(
        defaultOption || option1
    );

    return (
        <div
            style={{ minWidth: minWidth }}
            className="relative flex text-xs font-medium bg-gray-100 dark:bg-gray-800 p-2 rounded-lg py-1"
        >
            {/* Tab buttons */}
            {[option1, option2, option3].map(label => (
                <button
                    key={label}
                    onClick={() => setActiveTab(label)}
                    className={`z-10 w-full px-2 py-1.5 rounded-lg transition-colors duration-200 ${
                        activeTab === label
                            ? "text-gray-900 dark:text-white"
                            : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                    }`}
                >
                    {label}
                </button>
            ))}

            {/* Active tab animation background */}
            <div className="absolute items-center px-1 top-0 left-0 w-full h-full flex pointer-events-none">
                <motion.div
                    animate={{
                        x:
                            activeTab === option1
                                ? "0%"
                                : activeTab === option2
                                  ? "100%"
                                  : "200%",
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="w-1/3 h-7 rounded-lg border bg-white dark:bg-gray-700 dark:border-gray-600 shadow-sm"
                />
            </div>
        </div>
    );
}

export default Tabs;
