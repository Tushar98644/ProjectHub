"use client";

import { useMemo, useState } from "react";
import { useFetchProjects } from "@/hooks/queries/useProjectQuery";
import { Plus, SlidersHorizontal, Filter, LayoutGrid, Rows, Sparkles } from "lucide-react";
import clsx from "clsx";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { ProjectCard } from "@/features/projects/components/project-card";
import { ProjectRow } from "@/features/projects/components/project-row";
import Link from "next/link";
import { SearchBar } from "@/components/common/search-bar";

const SORT_OPTIONS = [
    ["recent", "Most recent"],
    ["stars", "Stars"],
    ["views", "Views"],
    ["likes", "Likes"],
];

const VIEW_OPTIONS = [
    ["grid", LayoutGrid],
    ["list", Rows],
] as const;

export default function ProjectsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedTag, setSelectedTag] = useState("all");
    const [view, setView] = useState<"grid" | "list">("grid");
    const [sort, setSort] = useState("recent");
    const { data: projects = [], isLoading } = useFetchProjects();

    const { allTags, filtered } = useMemo(() => {
        const tags = ["all", ...new Set(projects.flatMap((p: any) => p.tags || []))];

        const filtered = projects
            .filter((p: any) => {
                const q = searchQuery.toLowerCase();
                const matchesSearch =
                    !q || p.title?.toLowerCase().includes(q) || p.description?.toLowerCase().includes(q);
                const matchesTag = selectedTag === "all" || p.tags?.includes(selectedTag);
                return matchesSearch && matchesTag;
            })
            .sort((a: any, b: any) => {
                switch (sort) {
                    case "stars":
                        return (b.stars || 0) - (a.stars || 0);
                    case "views":
                        return (b.views || 0) - (a.views || 0);
                    case "likes":
                        return (b.likes || 0) - (a.likes || 0);
                    default:
                        return new Date(b.lastUpdated || 0).getTime() - new Date(a.lastUpdated || 0).getTime();
                }
            });

        return { allTags: tags, filtered };
    }, [projects, searchQuery, selectedTag, sort]);

    const resetFilters = () => {
        setSelectedTag("all");
        setSearchQuery("");
        setSort("recent");
    };

    return (
        <div className="flex flex-col gap-5 h-full">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <h2 className="text-xl font-bold tracking-tight flex items-center gap-2">
                        <Sparkles className="h-5 w-5" /> Discover Projects
                    </h2>
                    <Badge variant="secondary" className="rounded-full">
                        {filtered.length}
                    </Badge>
                </div>

                <div className="flex items-center gap-2">
                    {/* Sort Menu */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className="gap-2">
                                <SlidersHorizontal className="h-4 w-4" />
                                <span className="hidden sm:inline">Sort</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40">
                            {SORT_OPTIONS.map(([key, label]) => (
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

                    {/* View Toggle */}
                    <div className="hidden md:flex rounded-lg border bg-background">
                        {VIEW_OPTIONS.map(([v, Icon]) => (
                            <Button
                                key={v}
                                variant={view === v ? "default" : "ghost"}
                                size="sm"
                                onClick={() => setView(v)}
                                className="h-8 w-8 p-0"
                            >
                                <Icon className="h-4 w-4" />
                            </Button>
                        ))}
                    </div>

                    <Link href="/dashboard/projects/create">
                        <Button size="sm" className="gap-2">
                            <Plus className="h-4 w-4" />
                            <span className="hidden sm:inline">Add Project</span>
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Search + Tags */}
            <div className="space-y-3">
                <SearchBar placeholder="Search projects..." value={searchQuery} onChange={setSearchQuery} />

                <ScrollArea className="w-full">
                    <div className="flex gap-2 pb-2">
                        {allTags.map(tag => (
                            <Button
                                key={tag}
                                variant={selectedTag === tag ? "default" : "outline"}
                                size="sm"
                                onClick={() => setSelectedTag(tag)}
                                className="rounded-full whitespace-nowrap"
                            >
                                {selectedTag !== tag && <Filter className="mr-1 h-3 w-3" />}
                                {tag}
                            </Button>
                        ))}
                    </div>
                </ScrollArea>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto">
                {isLoading ? (
                    <div
                        className={
                            view === "grid" ? "grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "space-y-3"
                        }
                    >
                        {Array.from({ length: 6 }).map((_, i) => (
                            <Card key={i} className="rounded-lg overflow-hidden">
                                {view === "grid" ? (
                                    <div className="space-y-3 p-4">
                                        <Skeleton className="h-32 w-full rounded" />
                                        <Skeleton className="h-4 w-2/3" />
                                        <Skeleton className="h-3 w-full" />
                                        <Skeleton className="h-3 w-4/5" />
                                    </div>
                                ) : (
                                    <div className="flex gap-4 p-4">
                                        <Skeleton className="h-20 w-20 rounded" />
                                        <div className="flex-1 space-y-2">
                                            <Skeleton className="h-4 w-2/3" />
                                            <Skeleton className="h-3 w-full" />
                                            <Skeleton className="h-3 w-3/4" />
                                        </div>
                                    </div>
                                )}
                            </Card>
                        ))}
                    </div>
                ) : filtered.length === 0 ? (
                    <Card className="p-8 text-center">
                        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border">
                            <Sparkles className="h-6 w-6" />
                        </div>
                        <h3 className="text-lg font-semibold">No projects found</h3>
                        <p className="mt-2 text-sm text-muted-foreground mb-4">
                            Try adjusting your filters or search terms
                        </p>
                        <div className="flex justify-center gap-2">
                            <Button variant="outline" onClick={resetFilters}>
                                Reset filters
                            </Button>
                            <Link href="/dashboard/projects/create">
                                <Button>
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add Project
                                </Button>
                            </Link>
                        </div>
                    </Card>
                ) : (
                    <div
                        className={
                            view === "grid" ? "grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "space-y-3"
                        }
                    >
                        {filtered.map((project: any, index) =>
                            view === "grid" ? (
                                <ProjectCard key={project._id} project={project} index={index} />
                            ) : (
                                <ProjectRow key={project._id} project={project} index={index} />
                            )
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
