"use client";

import React from "react";
import { motion } from "framer-motion";

interface ToggleSwitchProps {
    isActive: boolean;
}

function ToggleSwitch({ isActive }: ToggleSwitchProps) {
    const [active, setActive] = React.useState(isActive);

    return (
        <button
            onClick={() => setActive(!active)}
            className={`
        duration-200 px-1 w-9 h-5 flex items-center rounded-full border transition-colors
        ${
            active
                ? "justify-end bg-indigo-500 border-indigo-500 dark:bg-indigo-500 dark:border-indigo-500"
                : "justify-start bg-gray-200 border-gray-300 dark:bg-gray-600 dark:border-gray-600"
        }
      `}
            aria-pressed={active}
            role="switch"
        >
            <motion.span
                layout
                transition={{ duration: 0.2 }}
                className="inline-block w-3.5 h-3.5 rounded-full bg-white shadow-sm dark:bg-gray-900"
            />
        </button>
    );
}

export default ToggleSwitch;
