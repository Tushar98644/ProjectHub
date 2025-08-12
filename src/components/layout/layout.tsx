"use client";

import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/providers/theme-provider";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                {children}
            </ThemeProvider>
        </QueryClientProvider>
    );
};

export default AppLayout;
