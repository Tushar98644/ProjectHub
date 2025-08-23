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
import { timeAgo } from "@/utils/timeAgo";
import { Thread } from "@/types/thread";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ThreadsPage = () => {
    const [query, setQuery] = useState("");
    const [sort, setSort] = useState<"popular" | "recent" | "comments">("popular");
    const { data: threads = [], isPending } = useFetchThreads();

    const filtered = useMemo((): Thread[] => {
        const q = query.trim().toLowerCase();
        return threads.filter(
            (t: Thread) => !q || t.title.toLowerCase().includes(q) || t.description.toLowerCase().includes(q)
        );
    }, [query, sort, threads]);

    if (isPending)
        return (
            <div className="flex flex-col gap-6 h-full">
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
                <div className="grid grid-cols-1 md:grid-cols-[320px_1fr] gap-6">
                    <aside className="hidden md:block">
                        <Skeleton className="h-10 w-full mb-4" />
                        <Skeleton className="h-32 w-full" />
                    </aside>
                    <main className="space-y-3">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <Card key={i} className="rounded-xl p-4">
                                <Skeleton className="h-10 w-10 rounded-full" />
                                <Skeleton className="h-4 w-1/2 mt-3" />
                            </Card>
                        ))}
                    </main>
                </div>
            </div>
        );

    return (
        <div className="flex flex-col gap-6 h-full overflow-y-hidden">
            {/* HEADER */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="rounded-md bg-muted/20 p-2">
                        <Sparkles className="h-5 w-5" />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold">Popular Threads</h2>
                        {/* Subtitle only on md+ */}
                        <p className="hidden md:block text-sm text-muted-foreground">
                            Top threads across projects — curated by activity
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    {/* Sort on md+ */}
                    <div className="hidden md:flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">Sort:</span>
                        <div className="flex items-center gap-2 rounded-lg border px-1 py-1 bg-background">
                            {["popular", "recent", "comments"].map(k => (
                                <button
                                    key={k}
                                    className={`px-3 py-1 rounded-md text-sm ${
                                        sort === k ? "bg-primary text-primary-foreground" : "hover:bg-secondary/50"
                                    }`}
                                    onClick={() => setSort(k as typeof sort)}
                                >
                                    {k.charAt(0).toUpperCase() + k.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>
                    {/* Sort dropdown on mobile */}
                    <div className="md:hidden">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button size="sm">Sort: {sort}</Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                {["popular", "recent", "comments"].map(k => (
                                    <DropdownMenuItem key={k} onClick={() => setSort(k as typeof sort)}>
                                        {k.charAt(0).toUpperCase() + k.slice(1)}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <Link href="/dashboard/threads/create">
                        <Button size="sm" className="flex items-center gap-2">
                            <Plus className="h-4 w-4" />
                            {/* hide label on mobile */}
                            <p className="hidden md:block">Create Thread</p>
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6 h-full">
                {/* Search & Filters */}
                <aside className="w-[320px] shrink-0 hidden md:flex flex-col gap-4 sticky top-6">
                    <SearchBar placeholder="Search threads..." value={query} onChange={setQuery} />
                    <Card className="p-4">
                        <h4 className="text-sm font-semibold mb-2">Quick filters</h4>
                        <button className="text-left px-3 py-2 rounded-md hover:bg-muted/30">All projects</button>
                    </Card>
                    <Card className="p-4">
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <span>Active threads</span>
                            <span>{threads.length}</span>
                        </div>
                    </Card>
                </aside>

                {/* SearchBar for mobile */}
                <div className="md:hidden">
                    <SearchBar placeholder="Search threads..." value={query} onChange={setQuery} />
                </div>

                {/* Thread List */}
                <div className="flex-1 overflow-y-auto flex flex-col gap-3 sm:pb-28 pb-32">
                    {filtered.map(t => {
                        const maxTagsMobile = 2;
                        const extraTags = t.tags?.length > maxTagsMobile ? t.tags.length - maxTagsMobile : 0;

                        return (
                            <Card key={t._id} className="p-4 rounded-2xl hover:shadow-lg transition">
                                <div className="md:flex md:items-start md:justify-between gap-3">
                                    <div className="flex-1">
                                        <div className="flex flex-col items-start gap-3 flex-wrap">
                                            <div className="flex flex-row gap-4">
                                                <h3 className="text-md font-semibold leading-tight">{t.title}</h3>

                                                {/* Public/Private badge */}
                                                <Badge variant={t.isPublic ? "secondary" : "destructive"}>
                                                    {t.isPublic ? "Public" : "Private"}
                                                </Badge>
                                            </div>

                                            {/* Tags (desktop full, mobile limited + scrollable) */}
                                            {t.tags?.length > 0 && (
                                                <div className="flex gap-1 flex-wrap max-w-full overflow-x-auto md:overflow-visible md:flex-nowrap">
                                                    {/* On mobile show limited tags */}
                                                    <div className="flex gap-1 md:hidden">
                                                        {t.tags.slice(0, maxTagsMobile).map(tag => (
                                                            <Badge
                                                                key={tag}
                                                                variant="outline"
                                                                className="truncate max-w-[100px]"
                                                            >
                                                                {tag}
                                                            </Badge>
                                                        ))}
                                                        {extraTags > 0 && (
                                                            <Badge variant="outline" className="truncate max-w-[60px]">
                                                                +{extraTags} more
                                                            </Badge>
                                                        )}
                                                    </div>

                                                    {/* On desktop show all tags */}
                                                    <div className="hidden md:flex gap-1 flex-wrap">
                                                        {t.tags.map(tag => (
                                                            <Badge
                                                                key={tag}
                                                                variant="outline"
                                                                className="truncate max-w-[120px]"
                                                            >
                                                                {tag}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                                            {t.description}
                                        </p>
                                        <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                                            <Clock className="h-3 w-3" />
                                            <span>{timeAgo(t.updatedAt.toString())} ago</span>
                                            <span>•</span>
                                        </div>
                                    </div>
                                    <Link href={`/dashboard/threads/${t._id}`} className="mt-4 md:mt-0 md:ml-4">
                                        <Button size="sm" className="mt-4 md:mt-0 flex items-center gap-2">
                                            Open <ArrowRight className="h-4 w-4" />
                                        </Button>
                                    </Link>
                                </div>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ThreadsPage;
