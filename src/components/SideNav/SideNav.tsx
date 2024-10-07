"use client";

import Link from "next/link";
import { FaHome, FaChartBar } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";
import { MdLogout } from "react-icons/md";
import { FaFolderOpen } from "react-icons/fa6";

const navItems = [
    { href: "/dashboard", label: "Home", icon: <FaHome className="h-6 w-6" /> },
    { href: "/dashboard/analytics", label: "Analytics", icon: <FaChartBar className="h-6 w-6" /> },
    { href: "/dashboard/profile", label: "Profile", icon: <FaCircleUser className="h-6 w-6" /> },
    { href: "/dashboard/projects", label: "My Projects", icon: <FaFolderOpen className="h-6 w-6" /> },
];

const SideNav = () => {
    return (
        <div className="fixed top-6 left-6 bottom-6 bg-gray-800 text-white w-80 shadow-lg rounded-2xl opacity-50 p-4 flex flex-col space-y-6">
            {/* Header */}
            <div className="border-b border-gray-700 pb-4 text-center">
                <h1 className="text-xl font-bold">Dashboard</h1>
            </div>

            {/* Navigation Items */}
            <nav className="flex-1">
                {navItems.map((item, idx) => (
                    <Link key={idx} href={item.href}>
                        <span className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-700 transition-all cursor-pointer">
                            {item.icon}
                            <span>{item.label}</span>
                        </span>
                    </Link>
                ))}
            </nav>

            {/* Logout button */}
            <div className="border-t border-gray-700 pt-4 mt-auto">
                <Link href="/logout">
                    <span className="flex items-center space-x-4 p-3 rounded-lg hover:bg-red-600 transition-all cursor-pointer">
                        <MdLogout className="h-6 w-6" />
                        <span>Logout</span>
                    </span>
                </Link>
            </div>
        </div>
    );
};

export default SideNav;