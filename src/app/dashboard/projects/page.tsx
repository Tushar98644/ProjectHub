"use client";

import { useMemo, useState } from "react";
import { useFetchProjects } from "@/hooks/queries/useProjectQuery";
import {
    Plus,
    SlidersHorizontal,
    Filter,
    LayoutGrid,
    Rows,
    Sparkles,
} from "lucide-react";
import clsx from "clsx";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ProjectCard } from "@/features/projects/components/project-card";
import { ProjectRow } from "@/features/projects/components/project-row";
import Link from "next/link";
import { SearchBar } from "@/components/common/search-bar";

export default function ProjectsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedTag, setSelectedTag] = useState("all");
    const [view, setView] = useState<"grid" | "list">("grid");
    const [sort, setSort] = useState("recent");
    const { data: projects = [], isLoading } = useFetchProjects();
    console.log(projects);

    const allTags = useMemo(() => {
        return ["all", ...new Set(projects.flatMap((p: any) => p.tags || []))];
    }, [projects]);

    const filtered = useMemo(() => {
        const base = projects.filter((p: any) => {
            const q = searchQuery.toLowerCase();
            return (
                (p.title?.toLowerCase().includes(q) ||
                    p.description?.toLowerCase().includes(q)) &&
                (selectedTag === "all" || (p.tags || []).includes(selectedTag))
            );
        });
        return [...base].sort((a: any, b: any) => {
            switch (sort) {
                case "stars":
                    return (b.stars || 0) - (a.stars || 0);
                case "views":
                    return (b.views || 0) - (a.views || 0);
                case "likes":
                    return (b.likes || 0) - (a.likes || 0);
                default:
                    return (
                        new Date(b.lastUpdated || 0).getTime() -
                        new Date(a.lastUpdated || 0).getTime()
                    );
            }
        });
    }, [projects, searchQuery, selectedTag, sort]);

    const resetFilters = () => {
        setSelectedTag("all");
        setSearchQuery("");
        setSort("recent");
    };

    return (
        <div className="flex flex-col gap-5 h-full">
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold tracking-tight flex items-center gap-2">
                        <Sparkles className="h-5 w-5" /> Discover Projects
                    </h2>
                    <Badge variant="secondary" className="rounded-full">
                        {filtered.length} results
                    </Badge>
                </div>
                <div className="flex items-center gap-2">
                    <SortMenu sort={sort} setSort={setSort} />
                    <ViewToggle view={view} setView={setView} />
                    <Button className="gap-2 rounded-lg">
                        <Plus className="h-3 w-3" />
                        <Link
                            href="/dashboard/projects/create"
                            className="hidden sm:inline text-xs"
                        >
                            Add Project
                        </Link>
                    </Button>
                </div>
            </div>

            {/* Search + Tags */}
            <div id="search-tags" className="flex flex-col gap-3">
                <SearchBar
                    placeholder={"Search Projects..."}
                    value={searchQuery}
                    onChange={setSearchQuery}
                />
                <ScrollArea>
                    <div className="flex items-center gap-2 pb-1">
                        {allTags.map(tag => (
                            <Button
                                key={tag}
                                variant={
                                    selectedTag === tag ? "default" : "outline"
                                }
                                size="sm"
                                onClick={() => setSelectedTag(tag)}
                                className={clsx(
                                    "rounded-full border-dashed",
                                    selectedTag === tag
                                )}
                            >
                                <Filter className="mr-1 h-4 w-4" /> {tag}
                            </Button>
                        ))}
                    </div>
                    <ScrollBar className="hidden" orientation="horizontal" />
                </ScrollArea>
            </div>

            {/* Content */}
            <div id="project-content" className="overflow-y-auto pb-24">
                {isLoading ? (
                    <SkeletonList view={view} />
                ) : filtered.length === 0 ? (
                    <EmptyState reset={resetFilters} />
                ) : (
                    <div
                        className={
                            view === "grid"
                                ? "grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3"
                                : "space-y-3"
                        }
                    >
                        {filtered.map((p: any, i) =>
                            view === "grid" ? (
                                <ProjectCard
                                    key={p._id}
                                    project={p}
                                    index={i}
                                />
                            ) : (
                                <ProjectRow key={p._id} project={p} index={i} />
                            )
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

const SortMenu = ({ sort, setSort }: any) => (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
                <SlidersHorizontal className="h-4 w-4" /> Sort
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuLabel>Sort by</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {[
                ["recent", "Most recent"],
                ["stars", "Stars"],
                ["views", "Views"],
                ["likes", "Likes"],
            ].map(([key, label]) => (
                <DropdownMenuItem
                    key={key}
                    onClick={() => setSort(key)}
                    className={clsx(sort === key && "font-semibold")}
                >
                    {label}
                </DropdownMenuItem>
            ))}
        </DropdownMenuContent>
    </DropdownMenu>
);

const ViewToggle = ({ view, setView }: any) => (
    <div className="hidden md:flex rounded-lg border bg-background/60 backdrop-blur">
        {[
            ["grid", LayoutGrid],
            ["list", Rows],
        ].map(([v, Icon], i) => (
            <Button
                key={i}
                variant={view === v ? "default" : "ghost"}
                size="sm"
                onClick={() => setView(v)}
                className="rounded-lg"
            >
                <Icon className="h-4 w-4" />
            </Button>
        ))}
        <Separator orientation="vertical" className="h-6" />
    </div>
);

const EmptyState = ({ reset }: any) => (
    <Card className="rounded-2xl border bg-background/60 p-8 text-center">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl border">
            <Sparkles className="h-6 w-6" />
        </div>
        <h3 className="text-lg font-semibold">No projects found</h3>
        <p className="mt-1 text-sm text-muted-foreground">
            Try adjusting filters or clearing your search.
        </p>
        <div className="mt-4 flex justify-center gap-2">
            <Button variant="secondary" onClick={reset} className="rounded-xl">
                Reset filters
            </Button>
            <Button className="rounded-xl gap-1">
                <Plus className="h-4 w-4" /> Add Project
            </Button>
        </div>
    </Card>
);

const SkeletonList = ({ view }: any) => (
    <div
        className={
            view === "grid"
                ? "grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3"
                : "space-y-3"
        }
    >
        {Array.from({ length: view === "grid" ? 6 : 4 }).map((_, i) => (
            <Card key={i} className="rounded-2xl">
                {view === "grid" ? (
                    <>
                        <Skeleton className="h-40 w-full" />
                        <div className="space-y-2 p-4">
                            <Skeleton className="h-4 w-2/3" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-4/5" />
                        </div>
                    </>
                ) : (
                    <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-[160px_1fr_auto]">
                        <Skeleton className="h-24 w-full rounded-xl" />
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-2/3" />
                            <Skeleton className="h-4 w-full" />
                        </div>
                        <Skeleton className="h-8 w-24 rounded-xl" />
                    </div>
                )}
            </Card>
        ))}
    </div>
);
