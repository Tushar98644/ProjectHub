"use client";

import { useSession } from "@/config/auth/client";
import {
    Calendar,
    Element3,
    Headphone,
    Profile,
    Profile2User,
    Setting2,
    Setting4,
    Wing,
} from "iconsax-reactjs";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
    const pathname = usePathname();
    const { data: session } = useSession();

    return (
        <div className="w-60 shrink-0 md:block h-screen sticky top-0 overflow-hidden">
            <div className="w-full h-full bg-white dark:bg-gray-900 border-r dark:border-gray-800">
                {/* logo */}
                <div className="h-[var(--h-nav)] p-4 md:p-6 flex cursor-pointer group items-center gap-2">
                    <div className="h-10 outline outline-violet-300 w-10 flex items-center bg-gradient-to-br justify-center rounded-full from-violet-500 to-violet-400 text-white">
                        <Wing
                            size={24}
                            className="relative group-hover:scale-75 duration-200"
                        />
                    </div>
                    <div>
                        <h1 className="text-sm font-bold text-gray-800 dark:text-white">
                            ProjectHub
                        </h1>
                        <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                            AI Analytics Platform
                        </p>
                    </div>
                </div>

                <hr className="bg-gray-200 dark:bg-gray-700 mx-2" />

                <div className="flex flex-col h-full justify-between">
                    {/* top nav */}
                    <div className="pt-6 text-gray-500 dark:text-gray-400 font-medium space-y-2 md:px-2 text-xs">
                        <Link
                            href="/dashboard/analytics"
                            className={`flex ${pathname === "/dashboard/analytics" ? "text-primary" : ""}
                hover:px-8 duration-200 px-6 py-2 items-center gap-2`}
                        >
                            <Element3 variant="Outline" size={16} />
                            Analytics
                        </Link>

                        <Link
                            href="/dashboard/teams"
                            className={`flex ${pathname === "/dashboard/teams" ? "text-primary" : ""}
                hover:px-8 duration-200 px-6 py-2 items-center gap-2`}
                        >
                            <Profile2User size={16} />
                            Teams
                        </Link>

                        <Link
                            href="/dashboard/integrations"
                            className={`flex ${pathname === "/dashboard/integrations" ? "text-primary" : ""}
                hover:px-8 duration-200 px-6 py-2 items-center gap-2`}
                        >
                            <Setting4 size={16} />
                            Integrations
                        </Link>

                        <Link
                            href="/dashboard/profile"
                            className={`flex ${pathname === "/dashboard/profile" ? "text-primary" : ""}
                hover:px-8 duration-200 px-6 py-2 items-center gap-2`}
                        >
                            <Profile size={16} />
                            Profile
                        </Link>

                        <button
                            disabled
                            className={`flex ${pathname === "/dashboard/calendar" ? "text-primary" : ""}
                hover:px-8 disabled:opacity-60 duration-200 px-6 py-2 items-center gap-2`}
                        >
                            <Calendar size={16} />
                            Calendar
                        </button>
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
