"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { FolderAdd, SidebarLeft } from "iconsax-reactjs";
import { useCentralStore } from "@/config/Store";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { Button } from "@/components/ui/button";
import {
    ArrowLeft,
    Settings,
    Sparkles,
    User,
    Users,
    FolderGit2,
} from "lucide-react";
import { FaProjectDiagram } from "react-icons/fa";

type HeaderConfig =
    | {
          icon?: any;
          title: string;
          subtitle?: string;
          right?: React.ReactNode;
      }
    | ((pathname: string) => HeaderConfig);

const headerConfig: Record<string, HeaderConfig> = {
    "/dashboard/integrations": {
        icon: Settings,
        title: "Integrations",
        subtitle: "Connect apps and configure webhooks",
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
    "/dashboard/projects/add": {
        icon: FolderAdd,
        title: "Add New Project",
        subtitle: "Share your amazing project with the community",
    },
    "/dashboard/profile": {
        icon: User,
        title: "Profile",
        subtitle: "View and manage your profile details",
    },

    "/project/:id": (pathname: string) => {
        const parts = pathname.split("/");
        const id = parts[2] ?? "";
        return {
            icon: FolderGit2,
            title: `Project ${id}`,
            subtitle: "Project details and activity",
        };
    },
};

function resolveHeaderConfig(pathname: string): {
    icon?: any;
    title: string;
    subtitle?: string;
    right?: React.ReactNode;
} {
    if (
        headerConfig[pathname] &&
        typeof headerConfig[pathname] !== "function"
    ) {
        return headerConfig[pathname] as Exclude<HeaderConfig, Function>;
    }

    return { title: "Dashboard", subtitle: "" };
}

const Navbar = () => {
    const pathname = usePathname();
    const router = useRouter();
    const { setIsSidebarOpen } = useCentralStore();

    const config = resolveHeaderConfig(pathname);

    return (
        <div>
            <div className="min-h-[var(--h-nav)] flex p-4 md:p-6 justify-between items-center gap-4 text-foreground">
                {/* LEFT SECTION */}
                <div className="flex items-center gap-3">
                    {config.icon && (
                        <Button
                            variant="outline"
                            size="icon"
                            className="rounded-full"
                        >
                            <config.icon size={16} className="text-primary" />
                        </Button>
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
                <div className="flex flex-row gap-0 mr-2">
                    <AnimatedThemeToggler />
                </div>
            </div>

            <hr className="bg-border mx-2" />
        </div>
    );
};

export default Navbar;
