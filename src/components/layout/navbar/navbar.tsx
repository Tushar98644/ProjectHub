"use client";

import React from "react";
import { usePathname } from "next/navigation";
import {
    SidebarLeft,
    Settings,
    SearchNormal1,
    Notification,
    Add,
} from "iconsax-reactjs";
import { useCentralStore } from "@/config/Store";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { Button } from "@/components/ui/button";
import { Sparkles, Users } from "lucide-react";

const headerConfig: Record<
    string,
    {
        icon?: any;
        title: string;
        subtitle: string;
        right?: React.ReactNode;
    }
> = {
    "/dashboard/integrations": {
        icon: Settings,
        title: "Integrations",
        subtitle: "Connect apps and configure webhooks",
        right: (
            <>
                <Button variant="ghost" size="icon" className="rounded-lg">
                    <SearchNormal1 size={16} />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-lg">
                    <Notification size={16} />
                </Button>
                <Button size="sm" className="gap-2 rounded-lg">
                    <Add size={16} />{" "}
                    <span className="hidden sm:inline">Add</span>
                </Button>
            </>
        ),
    },
    "/dashboard/teams": {
        icon: Users,
        title: "Teams",
        subtitle: "Manage and collaborate within your organization",
    },
    "/dashboard/projects": {
        icon: Sparkles,
        title: "Community Projects",
        subtitle: "Discover and explore amazing projects",
    },
};

const Navbar = () => {
    const pathname = usePathname();
    const { setIsSidebarOpen } = useCentralStore();

    const config = headerConfig[pathname] || {
        title: "Dashboard",
        subtitle: "",
    };

    return (
        <div>
            <div className="h-[var(--h-nav)] flex p-4 md:p-6 justify-between items-center gap-4 text-foreground">
                {/* LEFT SECTION */}
                <div className="flex items-center gap-3">
                    {config.icon && (
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl border bg-card/70">
                            <config.icon size={16} className="text-primary" />
                        </div>
                    )}
                    <div>
                        <h1 className="text-sm font-semibold">
                            {config.title}
                        </h1>
                        {config.subtitle && (
                            <p className="text-xs text-muted-foreground">
                                {config.subtitle}
                            </p>
                        )}
                    </div>
                </div>

                {/* MOBILE MENU TOGGLE */}
                <button
                    onClick={() => setIsSidebarOpen(true)}
                    className="all-center text-muted-foreground h-8 w-8 md:hidden hover:text-primary transition-colors ml-auto"
                >
                    <SidebarLeft size={16} />
                </button>

                {/* RIGHT SECTION */}
                {config.right && (
                    <div className="hidden md:flex ml-auto items-center gap-1">
                        {config.right}
                    </div>
                )}

                {/* THEME TOGGLER */}
                <div className="flex flex-row gap-0 ml-2">
                    <AnimatedThemeToggler />
                </div>
            </div>

            <hr className="bg-border mx-2" />
        </div>
    );
};

export default Navbar;
