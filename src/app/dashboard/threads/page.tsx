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

const ThreadsPage = () => {
    const [query, setQuery] = useState("");
    const [sort, setSort] = useState<"popular" | "recent" | "comments">("popular");
    const { data: threads = [], isPending } = useFetchThreads();

    const filtered: Thread[] = useMemo(() => {
        const q = query.trim().toLowerCase();
        const filtered = threads.filter(
            (t: Thread) => !q || t.title.toLowerCase().includes(q) || t.description.toLowerCase().includes(q)
        );

        return filtered.sort((a: Thread, b: Thread) => {
            if (sort === "recent") return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
            if (sort === "comments") return (b.comments?.length || 0) - (a.comments?.length || 0);
            return b.likes * 2 + (b.comments?.length || 0) * 3 - (a.likes * 2 + (a.comments?.length || 0) * 3);
        });
    }, [query, sort, threads]);

    const sortButtons = [
        { key: "popular", label: "Popular" },
        { key: "recent", label: "Recent" },
        { key: "comments", label: "Comments" },
    ];

    if (isPending) {
        return (
            <div className="flex flex-col gap-6 h-full">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="rounded-md bg-muted/20 p-2">
                            <Sparkles className="h-5 w-5" />
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold">Popular Threads</h2>
                            <p className="text-sm text-muted-foreground">
                                Top threads across projects — curated by activity
                            </p>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-[320px_1fr] gap-6">
                    <aside className="hidden md:block">
                        <Skeleton className="h-10 w-full mb-4" />
                        <Skeleton className="h-32 w-full" />
                    </aside>
                    <main className="space-y-3">
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
                    </main>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6 h-full">
            <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="rounded-md bg-muted/20 p-2">
                        <Sparkles className="h-5 w-5" />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold">Popular Threads</h2>
                        <p className="text-sm text-muted-foreground">
                            Top threads across projects — curated by activity
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <div className="hidden sm:flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">Sort:</span>
                        <div className="flex items-center gap-2 rounded-lg border px-1 py-1 bg-background">
                            {sortButtons.map(({ key, label }) => (
                                <button
                                    key={key}
                                    className={`px-3 py-1 rounded-md text-sm ${sort === key ? "bg-primary text-primary-foreground" : "hover:bg-secondary/50"}`}
                                    onClick={() => setSort(key as typeof sort)}
                                >
                                    {label}
                                </button>
                            ))}
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

            <div className="grid grid-cols-1 md:grid-cols-[320px_1fr] gap-6">
                <aside className="hidden md:block">
                    <div className="flex flex-col gap-4 sticky top-6">
                        <SearchBar placeholder="Search threads..." value={query} onChange={setQuery} />

                        <Card className="p-4">
                            <h4 className="text-sm font-semibold mb-2">Quick filters</h4>
                            <div className="flex flex-col gap-2">
                                <button className="text-left px-3 py-2 rounded-md hover:bg-muted/30">
                                    All projects
                                </button>
                                <button className="text-left px-3 py-2 rounded-md hover:bg-muted/30">ReZero</button>
                            </div>
                        </Card>

                        <Card className="p-4">
                            <h4 className="text-sm font-semibold mb-2">Stats</h4>
                            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                                <div className="flex items-center justify-between">
                                    <span>Active threads</span>
                                    <span>{threads.length}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span>Top comments</span>
                                    <span>
                                        {threads.reduce(
                                            (sum: number, t: { comments: string | any[] }) =>
                                                sum + (t.comments?.length || 0),
                                            0
                                        )}
                                    </span>
                                </div>
                            </div>
                        </Card>
                    </div>
                </aside>

                <main className="flex flex-col gap-3">
                    {filtered.map((t: Thread) => (
                        <Card key={t._id} className="p-4 rounded-2xl hover:shadow-lg transition">
                            <div className="md:flex md:items-start md:justify-between gap-3">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3">
                                        <h3 className="text-md font-semibold leading-tight">{t.title}</h3>
                                        <Badge variant="outline">{t.title}</Badge>
                                    </div>
                                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{t.description}</p>
                                    <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                                        <div className="flex items-center gap-1">
                                            <Clock className="h-3 w-3" />
                                            <span>{timeAgo(t.updatedAt.toString())} ago</span>
                                        </div>
                                        <div>•</div>
                                        <div>{t.comments?.length || 0} comments</div>
                                        <div>•</div>
                                        <div>{t.likes} likes</div>
                                    </div>
                                </div>
                                <div className="mt-4 md:mt-0 md:ml-4">
                                    <Link href={`/dashboard/threads/${t._id}`}>
                                        <Button size="sm" className="flex items-center gap-2">
                                            Open <ArrowRight className="h-4 w-4" />
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </Card>
                    ))}
                </main>
            </div>
        </div>
    );
};

export default ThreadsPage;
