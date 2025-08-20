"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import React from "react";
import { cn } from "@/lib/utils";
import { signIn } from "@/config/auth/client";

export const HeroHeader = () => {
    const [isScrolled, setIsScrolled] = React.useState(false);

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleSignIn = (provider: string) => {
        signIn.social({ provider });
    };

    return (
        <header>
            <nav data-state={"active"} className="fixed z-20 w-full px-2">
                <div
                    className={cn(
                        "mx-auto mt-2 max-w-6xl px-6 transition-all duration-300 lg:px-12",
                        isScrolled && "bg-background/50 max-w-4xl rounded-2xl border backdrop-blur-lg lg:px-5"
                    )}
                >
                    <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
                        <div className="flex w-full justify-between lg:w-auto">
                            <Link href="/" aria-label="home" className="flex items-center space-x-2">
                                <span className="text-xl font-bold text-primary">Insentra</span>
                            </Link>
                            <Button
                                asChild
                                variant="outline"
                                size="sm"
                                onClick={() => handleSignIn("google")}
                                className={cn("lg:hidden", isScrolled)}
                            >
                                <span>Login</span>
                            </Button>
                        </div>

                        <div className="bg-background in-data-[state=active]:block lg:in-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
                            <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit hover:cursor-pointer">
                                <Button
                                    asChild
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleSignIn("google")}
                                    className={cn(isScrolled && "lg:hidden")}
                                >
                                    <span>Login</span>
                                </Button>
                                <Button
                                    asChild
                                    size="sm"
                                    onClick={() => handleSignIn("github")}
                                    className={cn(isScrolled && "lg:hidden")}
                                >
                                    <span>Sign Up</span>
                                </Button>
                                <Button asChild size="sm" className={cn(isScrolled ? "lg:inline-flex" : "hidden")}>
                                    <Link href="#">
                                        <span>Get Started</span>
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
};
