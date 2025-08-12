import React from "react";
import { SidebarLeft } from "iconsax-reactjs";
import { useCentralStore } from "@/config/Store";
import { ThemeToggle } from "../theme-toggle";

const Navbar = ({ children }: { children: React.ReactNode }) => {
    const { setIsSidebarOpen } = useCentralStore();

    return (
        <div>
            <div className="h-[var(--h-nav)] flex p-4 md:p-6 text-gray-500 dark:text-gray-300 items-center gap-4">
                <div className="flex items-center justify-between w-full">
                    {children}
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="all-center text-gray-500 dark:text-gray-300 h-8 w-8 md:hidden hover:text-primary transition-colors"
                    >
                        <SidebarLeft size={16} />
                    </button>
                </div>

                <div className="flex flex-row gap-4 ml-auto">
                    {/* <UserButton></UserButton> */}
                    <ThemeToggle />
                </div>
            </div>
            <hr className="bg-gray-400 dark:bg-gray-700 mx-2" />
        </div>
    );
};

export default Navbar;
