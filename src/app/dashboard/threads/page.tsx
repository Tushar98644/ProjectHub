"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { SearchBar } from "@/components/common/search-bar";
import { Sparkles, ArrowRight, Clock, Plus } from "lucide-react";
import { useFetchThreads } from "@/hooks/queries/useThreadQuery";
import { Thread } from "@/types/thread";
import { timeAgo } from "@/utils/timeAgo";

type ThreadWithScore = Thread & { score: number };

const ThreadsPage = () => {
    const [query, setQuery] = useState("");
    const [sort, setSort] = useState<"popular" | "recent" | "comments">(
        "popular"
    );
    const { data: threads = [], isPending } = useFetchThreads();

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        const base = threads?.filter((t: Thread) => {
            if (!q) return true;
            return (
                t.title.toLowerCase().includes(q) ||
                t.description.toLowerCase().includes(q)
            );
        });

        const commentsCount = threads?.comnnets?.length || 0;
        const scored: ThreadWithScore[] = base.map((t: Thread) => ({
            ...t,
            score: t.likes * 2 + commentsCount * 3,
        }));

        return scored.sort((a, b) => {
            if (sort === "recent")
                return (
                    new Date(b.updatedAt).getTime() -
                    new Date(a.updatedAt).getTime()
                );
            if (sort === "comments")
                return b?.comments?.length - a?.comments?.length;
            return b.score - a.score;
        });
    }, [query, sort, threads]);

    return (
        <div className="flex flex-col gap-6 h-full">
            {/* Header */}
            <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="rounded-md bg-muted/20 p-2">
                        <Sparkles className="h-5 w-5" />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold">
                            Popular Threads
                        </h2>
                        <p className="text-sm text-muted-foreground">
                            Top threads across projects — curated by activity
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <div className="hidden sm:flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">
                            Sort:
                        </span>
                        <div className="flex items-center gap-2 rounded-lg border px-1 py-1 bg-background">
                            <button
                                className={`px-3 py-1 rounded-md text-sm ${sort === "popular" ? "bg-primary text-primary-foreground" : "hover:bg-secondary/50"}`}
                                onClick={() => setSort("popular")}
                            >
                                Popular
                            </button>
                            <button
                                className={`px-3 py-1 rounded-md text-sm ${sort === "recent" ? "bg-primary text-primary-foreground" : "hover:bg-secondary/50"}`}
                                onClick={() => setSort("recent")}
                            >
                                Recent
                            </button>
                            <button
                                className={`px-3 py-1 rounded-md text-sm ${sort === "comments" ? "bg-primary text-primary-foreground" : "hover:bg-secondary/50"}`}
                                onClick={() => setSort("comments")}
                            >
                                Comments
                            </button>
                        </div>
                    </div>

                    <Link href="/dashboard/threads/create">
                        <Button size="sm" className="flex items-center gap-2">
                            <Plus className="h-4 w-4" />
                            Create Thread
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Main layout: left sidebar */}
            <div className="grid grid-cols-1 md:grid-cols-[320px_1fr] gap-6">
                {/* Sidebar */}
                <aside className="hidden md:block">
                    <div className="flex flex-col gap-4 sticky top-6">
                        <SearchBar
                            placeholder="Search discussions..."
                            value={query}
                            onChange={setQuery}
                        />

                        <Card className="p-4">
                            <h4 className="text-sm font-semibold mb-2">
                                Quick filters
                            </h4>
                            <div className="flex flex-col gap-2">
                                <button className="text-left px-3 py-2 rounded-md hover:bg-muted/30">
                                    All projects
                                </button>
                                <button className="text-left px-3 py-2 rounded-md hover:bg-muted/30">
                                    ReZero
                                </button>
                            </div>
                        </Card>

                        <Card className="p-4">
                            <h4 className="text-sm font-semibold mb-2">
                                Stats
                            </h4>
                            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                                <div className="flex items-center justify-between">
                                    <span>Active threads</span>
                                    <span>{threads?.length}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span>Top comments</span>
                                    {/* <span>
                                        {threads?.map((t: Thread) => t?.comments?.length)}
                                    </span> */}
                                </div>
                            </div>
                        </Card>
                    </div>
                </aside>

                {/* Threads list */}
                <main>
                    <div className="flex flex-col gap-4">
                        {isPending ? (
                            <div className="space-y-3">
                                {Array.from({ length: 4 }).map((_, i) => (
                                    <Card key={i} className="rounded-xl p-4">
                                        <div className="flex items-center gap-3">
                                            <Skeleton className="h-10 w-10 rounded-full" />
                                            <div className="flex-1 space-y-2">
                                                <Skeleton className="h-4 w-1/3" />
                                                <Skeleton className="h-4 w-full" />
                                            </div>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col gap-3">
                                {filtered.map((t: Thread) => (
                                    <Card
                                        key={t._id}
                                        className="p-4 rounded-2xl hover:shadow-lg transition"
                                    >
                                        <div className="md:flex md:items-start md:justify-between gap-3">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3">
                                                    <h3 className="text-md font-semibold leading-tight">
                                                        {t.title}
                                                    </h3>
                                                    <Badge variant="outline">
                                                        {t?.title}
                                                    </Badge>
                                                </div>

                                                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                                                    {t?.description}
                                                </p>

                                                <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                                                    <div className="flex items-center gap-1">
                                                        <Clock className="h-3 w-3" />{" "}
                                                        <span>
                                                            {timeAgo(
                                                                t?.updatedAt.toString()
                                                            )}{" "}
                                                            ago
                                                        </span>
                                                    </div>
                                                    <div>•</div>
                                                    <div>
                                                        {t?.comments?.length ||
                                                            0}{" "}
                                                        comments
                                                    </div>
                                                    <div>•</div>
                                                    <div>{t.likes} likes</div>
                                                </div>
                                            </div>

                                            <div className="mt-4 md:mt-0 md:ml-4 flex items-center">
                                                <Link
                                                    href={`/dashboard/threads/${t._id}`}
                                                    className="inline-flex"
                                                >
                                                    <Button
                                                        size="sm"
                                                        className="flex items-center gap-2"
                                                    >
                                                        Open{" "}
                                                        <ArrowRight className="h-4 w-4" />
                                                    </Button>
                                                </Link>
                                            </div>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default ThreadsPage;
