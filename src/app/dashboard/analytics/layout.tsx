"use client";

import PageContent from "@/components/layout/navbar/page-content";
import { PageNavbarLeftContent } from "@/components/layout/navbar/page-navbar";
import Navbar from "@/components/layout/navbar/navbar";
import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardAction,
    CardFooter,
} from "@/components/ui/card";
import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";
import React from "react";

const OverViewLayout = ({
    sales,
    pie_stats,
    bar_stats,
    area_stats,
}: {
    sales: React.ReactNode;
    pie_stats: React.ReactNode;
    bar_stats: React.ReactNode;
    area_stats: React.ReactNode;
}) => {
    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors">
            <Navbar>
                <PageNavbarLeftContent>
                    <h1 className="text-sm font-semibold text-gray-800 dark:text-white">
                        Overview
                    </h1>
                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                        Overview of your dashboard
                    </p>
                </PageNavbarLeftContent>
            </Navbar>
            <PageContent>
                <div className="flex flex-1 flex-col space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold tracking-tight dark:text-white">
                            Hi, Welcome back 👋
                        </h2>
                    </div>

                    {/* Analytics Cards */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                        {[
                            {
                                desc: "Total Revenue",
                                value: "$1,250.00",
                                trend: "up",
                                diff: "+12.5%",
                                highlight: "Trending up this month",
                                secondary: "Visitors for the last 6 months",
                            },
                            {
                                desc: "New Customers",
                                value: "1,234",
                                trend: "down",
                                diff: "-20%",
                                highlight: "Down 20% this period",
                                secondary: "Acquisition needs attention",
                            },
                            {
                                desc: "Active Accounts",
                                value: "45,678",
                                trend: "up",
                                diff: "+12.5%",
                                highlight: "Strong user retention",
                                secondary: "Engagement exceed targets",
                            },
                            {
                                desc: "Growth Rate",
                                value: "4.5%",
                                trend: "up",
                                diff: "+4.5%",
                                highlight: "Steady performance increase",
                                secondary: "Meets growth projections",
                            },
                        ].map(
                            (
                                {
                                    desc,
                                    value,
                                    trend,
                                    diff,
                                    highlight,
                                    secondary,
                                },
                                idx
                            ) => (
                                <Card
                                    key={idx}
                                    className="bg-white dark:bg-gray-800 shadow-xs border border-gray-200 dark:border-gray-700 rounded-xl transition-colors"
                                >
                                    <CardHeader>
                                        <CardDescription className="text-gray-500 dark:text-gray-400">
                                            {desc}
                                        </CardDescription>
                                        <div className="flex items-center justify-between w-full">
                                            <CardTitle className="text-2xl font-semibold tabular-nums dark:text-white">
                                                {value}
                                            </CardTitle>
                                            <CardAction>
                                                <Badge
                                                    variant="outline"
                                                    className="ml-2 border-primary/30 dark:border-violet-400/30 text-primary dark:text-violet-400 bg-primary/5 dark:bg-violet-400/10 flex gap-1 items-center"
                                                >
                                                    {trend === "up" ? (
                                                        <IconTrendingUp className="size-4" />
                                                    ) : (
                                                        <IconTrendingDown className="size-4" />
                                                    )}
                                                    {diff}
                                                </Badge>
                                            </CardAction>
                                        </div>
                                    </CardHeader>

                                    <CardFooter className="flex-col items-start gap-1.5 text-sm">
                                        <div className="line-clamp-1 flex gap-2 font-medium text-gray-700 dark:text-gray-200 items-center">
                                            {highlight}
                                            {trend === "up" ? (
                                                <IconTrendingUp className="size-4 text-emerald-500" />
                                            ) : (
                                                <IconTrendingDown className="size-4 text-red-500" />
                                            )}
                                        </div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400">
                                            {secondary}
                                        </div>
                                    </CardFooter>
                                </Card>
                            )
                        )}
                    </div>

                    {/* Stats and Charts Section */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
                        <div className="col-span-4">{bar_stats}</div>
                        <div className="col-span-4 md:col-span-3">{sales}</div>
                        <div className="col-span-4">{area_stats}</div>
                        <div className="col-span-4 md:col-span-3">
                            {pie_stats}
                        </div>
                    </div>
                </div>
            </PageContent>
        </div>
    );
};

export default OverViewLayout;
