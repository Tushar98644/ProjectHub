"use client";

import { useSession } from "@/config/auth/client";
import { Folder, Headphone, Profile, Profile2User, Setting2, Setting4 } from "iconsax-reactjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Atom, MessageCircleCodeIcon, Search, Send, User } from "lucide-react";

const Sidebar = () => {
    const pathname = usePathname();
    const { data: session } = useSession();

    return (
        <div className="w-60 shrink-0 md:block h-screen sticky top-0 overflow-hidden bg-gradient-to-b from-background via-background to-background">
            <div className="w-full h-full border-r dark:border-gray-800">
                {/* logo */}
                <div className="h-[var(--h-nav)] p-4 md:p-4 flex cursor-pointer group items-center gap-4">
                    <Avatar className="h-10 w-10 flex items-center justify-center bg-transparent">
                        <AvatarFallback className="dark:text-white text-black text-xs size-6">
                            <Atom />
                        </AvatarFallback>
                    </Avatar>
                    <div>
                        <h1 className="text-sm font-bold text-gray-800 dark:text-white">ProjectHub</h1>
                        <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                            Project Management Platform
                        </p>
                    </div>
                </div>

                <hr className="bg-gray-200 dark:bg-gray-700 mx-2" />

                <div className="flex flex-col h-full justify-between">
                    {/* top nav */}
                    <div className="pt-6 text-gray-500 dark:text-gray-400 font-medium space-y-2 md:px-2 text-xs">
                        <Link
                            href="/dashboard/teams"
                            className={`flex ${pathname === "/dashboard/teams" ? "text-primary" : ""} hover:px-8 duration-200 px-6 py-2 items-center gap-2`}
                        >
                            <Profile2User size={16} /> Teams
                        </Link>

                        <Link
                            href="/dashboard/profile"
                            className={`flex ${pathname === "/dashboard/profile" ? "text-primary" : ""} hover:px-8 duration-200 px-6 py-2 items-center gap-2`}
                        >
                            <Profile size={16} /> Profile
                        </Link>

                        <Link
                            href="/dashboard/integrations"
                            className={`flex ${pathname === "/dashboard/integrations" ? "text-primary" : ""} hover:px-8 duration-200 px-6 py-2 items-center gap-2`}
                        >
                            <Setting4 size={16} /> Integrations
                        </Link>

                        <Link
                            href="/dashboard/invitations"
                            className={`flex ${pathname === "/dashboard/invitations" ? "text-primary" : ""} hover:px-8 duration-200 px-6 py-2 items-center gap-2`}
                        >
                            <Send size={16} /> Invitations
                        </Link>

                        <Link
                            href="/dashboard/users"
                            className={`flex ${pathname === "/dashboard/users" ? "text-primary" : ""} hover:px-8 duration-200 px-6 py-2 items-center gap-2`}
                        >
                            <Search size={16} /> Search Users
                        </Link>

                        <Link
                            href="/dashboard/threads"
                            className={`flex ${pathname === "/dashboard/threads" ? "text-primary" : ""} hover:px-8 duration-200 px-6 py-2 items-center gap-2`}
                        >
                            <MessageCircleCodeIcon size={16} /> Threads
                        </Link>

                        <Link
                            href="/dashboard/projects"
                            className={`flex ${pathname === "/dashboard/projects" ? "text-primary" : ""} hover:px-8 duration-200 px-6 py-2 items-center gap-2`}
                        >
                            <Folder size={16} /> Community Projects
                        </Link>
                    </div>

                    {/* bottom nav */}
                    <div>
                        <div className="text-gray-500 dark:text-gray-400 text-xs font-medium md:px-2">
                            <button
                                className={`flex ${pathname === "/dashboard/settings" ? "text-primary" : ""}
                hover:px-8 duration-200 px-6 py-2 items-center gap-2`}
                            >
                                <Setting2 size={16} />
                                Settings
                            </button>

                            <button
                                className={`flex ${pathname === "/dashboard/support" ? "text-primary" : ""}
                hover:px-8 duration-200 px-6 py-2 items-center gap-2`}
                            >
                                <Headphone size={16} />
                                Support
                            </button>
                        </div>

                        <hr className="bg-gray-200 dark:bg-gray-700 mx-2 my-4" />

                        {/* user profile popup */}
                        <div className="flex pb-28 justify-between px-4 md:px-6 items-center cursor-pointer hover:pr-5 duration-200">
                            {session?.user && (
                                <div className="flex items-center gap-2">
                                    {/* <UserButton /> */}
                                    <div>
                                        <p className="text-sm font-semibold text-gray-800 dark:text-white">
                                            {session?.user?.name}
                                        </p>
                                        <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                            {session?.user?.email}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
