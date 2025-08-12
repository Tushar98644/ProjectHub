"use client";

import * as React from "react";
import { IconTrendingUp } from "@tabler/icons-react";
import { Label, Pie, PieChart } from "recharts";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
    { browser: "chrome", visitors: 275, fill: "var(--chart-1)" },
    { browser: "safari", visitors: 200, fill: "var(--chart-2)" },
    { browser: "firefox", visitors: 287, fill: "var(--chart-3)" },
    { browser: "edge", visitors: 173, fill: "var(--chart-4)" },
    { browser: "other", visitors: 190, fill: "var(--chart-5)" },
];

const chartConfig = {
    visitors: {
        label: "Visitors",
    },
    chrome: {
        label: "Chrome",
        color: "var(--chart-1)",
    },
    safari: {
        label: "Safari",
        color: "var(--chart-2)",
    },
    firefox: {
        label: "Firefox",
        color: "var(--chart-3)",
    },
    edge: {
        label: "Edge",
        color: "var(--chart-4)",
    },
    other: {
        label: "Other",
        color: "var(--chart-5)",
    },
} satisfies ChartConfig;

export function PieGraph() {
    const totalVisitors = React.useMemo(() => {
        return chartData.reduce((acc, curr) => acc + curr.visitors, 0);
    }, []);

    return (
        <Card className="@container/card bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
            <CardHeader className="bg-white dark:bg-gray-900">
                <CardTitle className="text-gray-900 dark:text-gray-100">
                    Pie Chart - Donut with Text
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                    <span className="hidden @[540px]/card:block">
                        Total visitors by browser for the last 6 months
                    </span>
                    <span className="@[540px]/card:hidden">
                        Browser distribution
                    </span>
                </CardDescription>
            </CardHeader>
            <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6 bg-white dark:bg-gray-900">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto h-[250px]"
                >
                    <PieChart>
                        <defs>
                            {[
                                { browser: "chrome", color: "var(--chart-1)" },
                                { browser: "safari", color: "var(--chart-2)" },
                                { browser: "firefox", color: "var(--chart-3)" },
                                { browser: "edge", color: "var(--chart-4)" },
                                { browser: "other", color: "var(--chart-5)" },
                            ].map(({ browser, color }, index) => (
                                <linearGradient
                                    key={browser}
                                    id={`fill${browser}`}
                                    x1="0"
                                    y1="0"
                                    x2="0"
                                    y2="1"
                                >
                                    <stop
                                        offset="0%"
                                        stopColor={color}
                                        stopOpacity={0.8}
                                    />
                                    <stop
                                        offset="100%"
                                        stopColor={color}
                                        stopOpacity={0.3}
                                    />
                                </linearGradient>
                            ))}
                        </defs>
                        <ChartTooltip
                            cursor={false}
                            content={
                                <ChartTooltipContent
                                    hideLabel
                                    className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-400"
                                />
                            }
                        />
                        <Pie
                            data={chartData.map(item => ({
                                ...item,
                                fill: `url(#fill${item.browser})`,
                            }))}
                            dataKey="visitors"
                            nameKey="browser"
                            innerRadius={60}
                            strokeWidth={2}
                            stroke="rgb(255 255 255 / 0.5)"
                            className="dark:[stroke:rgb(17_24_39_/_0.5)]"
                        >
                            <Label
                                content={({ viewBox }) => {
                                    if (
                                        viewBox &&
                                        "cx" in viewBox &&
                                        "cy" in viewBox
                                    ) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    className="text-3xl font-bold text-gray-900 dark:text-gray-100"
                                                >
                                                    {totalVisitors.toLocaleString()}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    className="text-sm text-gray-500 dark:text-gray-100"
                                                >
                                                    Total Visitors
                                                </tspan>
                                            </text>
                                        );
                                    }
                                }}
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm bg-white dark:bg-gray-900">
                <div className="flex items-center gap-2 leading-none font-medium text-gray-900 dark:text-gray-100">
                    Chrome leads with{" "}
                    {((chartData[0].visitors / totalVisitors) * 100).toFixed(1)}
                    %{" "}
                    <IconTrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
                </div>
                <div className="text-gray-500 dark:text-gray-400 leading-none">
                    Based on data from January - June 2024
                </div>
            </CardFooter>
        </Card>
    );
}
