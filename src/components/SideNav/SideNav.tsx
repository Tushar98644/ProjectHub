"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    FaChartPie,      // More specific for Analytics
    FaUserAstronaut,  // More distinct for Profile
    FaStream,         // For My Projects (like a stream of projects)
    FaPlusSquare,     // For New Project
    FaThList,         // For All Projects (list view)
    FaUsersCog,       // For Find Users (users + management/search aspect)
    FaCog             // Standard for Settings
} from "react-icons/fa";
// FaFolderOpen and FaFolder are good too, but let's try some alternatives for variety
// FaRProject and FaDiagramProject are a bit abstract, replaced with more common ones.
import { MdLogout, MdSpaceDashboard } from "react-icons/md";
import { signOut } from "next-auth/react";

const navItems = [
    { href: "/dashboard/analytics", label: "Analytics", icon: <FaChartPie className="h-5 w-5" /> },
    { href: "/dashboard/profile", label: "Profile", icon: <FaUserAstronaut className="h-5 w-5" /> },
    { href: "/dashboard/projects", label: "My Projects", icon: <FaStream className="h-5 w-5" /> },
    { href: "/project/new", label: "New Project", icon: <FaPlusSquare className="h-5 w-5" /> },
    { href: "/", label: "All Projects", icon: <FaThList className="h-5 w-5" /> }, // Assuming '/' is the root for all projects listing
    { href: "/dashboard/find-users", label: "Find Users", icon: <FaUsersCog className="h-5 w-5" /> },
    { href: "/dashboard/settings", label: "Settings", icon: <FaCog className="h-5 w-5" /> },
];

const SideNav = () => {
    const pathname = usePathname() ?? ""; 

    return (
        <div className="fixed top-6 left-6 bottom-6 rounded-2xl bg-slate-900 text-slate-200 w-72 shadow-xl flex flex-col transition-all duration-300 ease-in-out opacity-70">
            {/* Header */}
            <div className="flex items-center justify-center h-20 border-b border-slate-700/50 px-6">
                <Link href="/dashboard" className="flex items-center space-x-3">
                    <MdSpaceDashboard className="h-8 w-8 text-sky-400" />
                    <h1 className="text-2xl font-bold text-sky-400 tracking-tight">Dashboard</h1>
                </Link>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
                {navItems.map((item) => {
                    // More robust active check, especially for the root "/"
                    const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
                    return (
                        <Link key={item.label} href={item.href}>
                            <span
                                className={`
                                    flex items-center space-x-3 px-4 py-3 rounded-lg
                                    transition-all duration-200 ease-in-out cursor-pointer
                                    group hover:bg-sky-500/20 hover:text-sky-300
                                    ${isActive
                                        ? "bg-sky-500/20 text-sky-300 font-medium shadow-inner"
                                        : "text-slate-400 hover:text-slate-200"
                                    }
                                `}
                            >
                                <span className={`
                                    transition-colors duration-200
                                    ${isActive ? "text-sky-400" : "text-slate-500 group-hover:text-sky-400"}
                                `}>
                                    {item.icon}
                                </span>
                                <span>{item.label}</span>
                            </span>
                        </Link>
                    );
                })}
            </nav>

            {/* Footer - Logout Button */}
            <div className="px-4 py-6 border-t border-slate-700/50">
                <button
                    onClick={() => signOut()}
                    className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-slate-400 hover:bg-red-500/20 hover:text-red-400 transition-all duration-200 ease-in-out group"
                >
                    <MdLogout className="h-5 w-5 text-slate-500 group-hover:text-red-400 transition-colors duration-200" />
                    <span>Logout</span>
                </button>
            </div>
        </div>
    );
};

export default SideNav;