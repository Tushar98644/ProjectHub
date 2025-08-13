"use client";

import { useMemo, useState } from "react";
import PageContent from "@/components/layout/navbar/page-content";
import { PageNavbarLeftContent } from "@/components/layout/navbar/page-navbar";
import Navbar from "@/components/layout/navbar/navbar";
import { useProjectFetchQuery } from "@/hooks/queries/useProjectQuery";

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

import {
    Search,
    CalendarDays,
    Eye,
    Star,
    Heart,
    Plus,
    MoreHorizontal,
    SlidersHorizontal,
    Filter,
    Rocket,
    LayoutGrid,
    Rows,
    Sparkles,
} from "lucide-react";

import { motion } from "framer-motion";
import clsx from "clsx";

export default function ProjectsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedTag, setSelectedTag] = useState<string>("all");
    const [view, setView] = useState<"grid" | "list">("grid");
    const [sort, setSort] = useState<"recent" | "stars" | "views" | "likes">(
        "recent"
    );

    const { data: projects = [], isLoading } = useProjectFetchQuery();

    const allTags = useMemo(
        () => ["all", ...new Set(projects.flatMap((p: any) => p.tags || []))],
        [projects]
    );

    const filtered = useMemo(() => {
        const base = (projects || []).filter((p: any) => {
            const q = searchQuery.toLowerCase();
            const matchSearch =
                p.title?.toLowerCase().includes(q) ||
                p.description?.toLowerCase().includes(q);
            const matchTag =
                selectedTag === "all" || (p.tags || []).includes(selectedTag);
            return matchSearch && matchTag;
        });

        const sorted = [...base].sort((a: any, b: any) => {
            switch (sort) {
                case "stars":
                    return (b.stars || 0) - (a.stars || 0);
                case "views":
                    return (b.views || 0) - (a.views || 0);
                case "likes":
                    return (b.likes || 0) - (a.likes || 0);
                case "recent":
                default:
                    return (
                        new Date(b.lastUpdated || 0).getTime() -
                        new Date(a.lastUpdated || 0).getTime()
                    );
            }
        });

        return sorted;
    }, [projects, searchQuery, selectedTag, sort]);

    const statusBadge = (status?: string) => {
        const map: Record<string, string> = {
            active: "bg-emerald-500/10 text-emerald-500 ring-1 ring-emerald-500/20",
            completed: "bg-blue-500/10 text-blue-500 ring-1 ring-blue-500/20",
            "in-progress":
                "bg-amber-500/10 text-amber-500 ring-1 ring-amber-500/20",
        };
        return (
            map[status || ""] ||
            "bg-gray-500/10 text-gray-400 ring-1 ring-gray-500/10"
        );
    };

    const author = "Tushar";

    return (
        <div className="min-h-screen bg-gradient-to-b from-background via-background to-background text-foreground">
            <div className="pointer-events-none fixed inset-0 -z-10 [mask-image:radial-gradient(60%_40%_at_50%_0%,#000_40%,transparent_100%)]">
                <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-violet-500/20 via-transparent to-transparent blur-2xl" />
            </div>

            <Navbar>
                <PageNavbarLeftContent>
                    <div>
                        <h1 className="text-sm font-semibold">
                            Community Projects
                        </h1>
                        <p className="text-xs text-muted-foreground">
                            Discover and explore amazing projects
                        </p>
                    </div>
                </PageNavbarLeftContent>
            </Navbar>

            <PageContent>
                <div className="space-y-5">
                    {/* Top actions */}
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                            <h2 className="text-xl font-bold tracking-tight flex items-center gap-2">
                                <Sparkles className="h-5 w-5" /> Discover
                                Projects
                            </h2>
                            <Badge variant="secondary" className="rounded-full">
                                {filtered.length} results
                            </Badge>
                        </div>

                        <div className="flex items-center gap-2">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="gap-2"
                                    >
                                        <SlidersHorizontal className="h-4 w-4" />{" "}
                                        Sort
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    align="end"
                                    className="w-40"
                                >
                                    <DropdownMenuLabel>
                                        Sort by
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                        onClick={() => setSort("recent")}
                                        className={clsx(
                                            sort === "recent" && "font-semibold"
                                        )}
                                    >
                                        Most recent
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        onClick={() => setSort("stars")}
                                        className={clsx(
                                            sort === "stars" && "font-semibold"
                                        )}
                                    >
                                        Stars
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        onClick={() => setSort("views")}
                                        className={clsx(
                                            sort === "views" && "font-semibold"
                                        )}
                                    >
                                        Views
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        onClick={() => setSort("likes")}
                                        className={clsx(
                                            sort === "likes" && "font-semibold"
                                        )}
                                    >
                                        Likes
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>

                            <div className="hidden md:flex rounded-xl border bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                                <Button
                                    variant={
                                        view === "grid" ? "default" : "ghost"
                                    }
                                    size="sm"
                                    onClick={() => setView("grid")}
                                    className="rounded-xl"
                                >
                                    <LayoutGrid className="h-4 w-4" />
                                </Button>
                                <Separator
                                    orientation="vertical"
                                    className="h-6"
                                />
                                <Button
                                    variant={
                                        view === "list" ? "default" : "ghost"
                                    }
                                    size="sm"
                                    onClick={() => setView("list")}
                                    className="rounded-xl"
                                >
                                    <Rows className="h-4 w-4" />
                                </Button>
                            </div>

                            <Button className="gap-2">
                                <Plus className="h-3 w-3" />
                                <span className="hidden sm:inline text-xs">
                                    Add Project
                                </span>
                            </Button>
                        </div>
                    </div>

                    {/* Search + Tag filters */}
                    <div className="flex flex-col gap-3">
                        <div className="relative">
                            <Input
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                placeholder="Search projects..."
                                className="pl-10 rounded-xl"
                            />
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            {searchQuery && (
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setSearchQuery("")}
                                    className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-lg"
                                >
                                    {/* Using iconsax Add as a close substitute is fine; or use lucide 'X' if available */}
                                    <span className="sr-only">Clear</span>×
                                </Button>
                            )}
                        </div>

                        <ScrollArea className="w-full">
                            <div className="flex items-center gap-2 pb-1">
                                {allTags.map(tag => (
                                    <Button
                                        key={tag}
                                        variant={
                                            selectedTag === tag
                                                ? "default"
                                                : "outline"
                                        }
                                        size="sm"
                                        onClick={() => setSelectedTag(tag)}
                                        className={clsx(
                                            "rounded-full border-dashed",
                                            selectedTag === tag &&
                                                "shadow-[0_0_0_3px_rgba(139,92,246,0.25)]"
                                        )}
                                    >
                                        <Filter className="mr-1 h-4 w-4" />{" "}
                                        {tag}
                                    </Button>
                                ))}
                            </div>
                            <ScrollBar
                                className="hidden"
                                orientation="horizontal"
                            />
                        </ScrollArea>
                    </div>

                    {/* Content */}
                    {isLoading ? (
                        <ProjectsSkeleton view={view} />
                    ) : filtered.length === 0 ? (
                        <EmptyState
                            onReset={() => {
                                setSelectedTag("all");
                                setSearchQuery("");
                                setSort("recent");
                            }}
                        />
                    ) : view === "grid" ? (
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                            {filtered.map((p: any) => (
                                <ProjectCard
                                    key={p._id}
                                    project={p}
                                    author={author}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {filtered.map((p: any) => (
                                <ProjectRow
                                    key={p._id}
                                    project={p}
                                    author={author}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </PageContent>
        </div>
    );
}

// ---- Card (grid) ----
function ProjectCard({ project, author }: { project: any; author: string }) {
    const {
        title,
        description,
        image,
        tags = [],
        status,
        stars,
        views,
        likes,
        lastUpdated,
    } = project || {};

    return (
        <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.25 }}
            className="h-full"
        >
            <Card className="group h-full overflow-hidden rounded-2xl border bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all hover:shadow-xl">
                <div className="relative h-40 w-full overflow-hidden">
                    {/* image */}
                    <img
                        src={image}
                        alt={title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />

                    {/* status */}
                    <div className="absolute left-3 top-3">
                        <Badge
                            className={clsx(
                                "rounded-full",
                                statusBadge(status)
                            )}
                        >
                            {status || "unknown"}
                        </Badge>
                    </div>

                    {/* quick actions */}
                    <div className="absolute right-2 top-2">
                        <ProjectActions />
                    </div>
                </div>

                <CardHeader className="space-y-1">
                    <CardTitle className="line-clamp-1 text-base font-semibold">
                        {title}
                    </CardTitle>
                    <p className="line-clamp-2 text-sm text-muted-foreground">
                        {description}
                    </p>
                </CardHeader>

                <CardContent>
                    {tags.length > 0 && (
                        <div className="mb-2 flex flex-wrap gap-1">
                            {tags.slice(0, 3).map((t: string) => (
                                <Badge
                                    key={t}
                                    variant="secondary"
                                    className="rounded-md"
                                >
                                    {t}
                                </Badge>
                            ))}
                            {tags.length > 3 && (
                                <Badge variant="outline" className="rounded-md">
                                    +{tags.length - 3}
                                </Badge>
                            )}
                        </div>
                    )}

                    <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center gap-3">
                            <span className="inline-flex items-center gap-1">
                                <Star className="h-3.5 w-3.5" /> {stars || 0}
                            </span>
                            <span className="inline-flex items-center gap-1">
                                <Eye className="h-3.5 w-3.5" /> {views || 0}
                            </span>
                            <span className="inline-flex items-center gap-1">
                                <Heart className="h-3.5 w-3.5" /> {likes || 0}
                            </span>
                        </div>
                        <span className="inline-flex items-center gap-1">
                            <CalendarDays className="h-3.5 w-3.5" /> yesterday
                        </span>
                    </div>
                </CardContent>

                <CardFooter className="border-t p-4">
                    <div className="flex w-full items-center gap-3">
                        <Avatar className="h-8 w-8">
                            <AvatarImage src={undefined} alt={author} />
                            <AvatarFallback className="bg-violet-500 text-white">
                                {author?.[0]?.toUpperCase() || "T"}
                            </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium">
                                {author}
                            </p>
                            <p className="truncate text-xs text-muted-foreground">
                                Maintainer
                            </p>
                        </div>
                        <Button
                            size="sm"
                            variant="secondary"
                            className="rounded-xl gap-1"
                        >
                            <Rocket className="h-4 w-4" /> View
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        </motion.div>
    );
}

// ---- Row (list) ----
function ProjectRow({ project, author }: { project: any; author: string }) {
    const {
        title,
        description,
        image,
        tags = [],
        status,
        stars,
        views,
        likes,
        lastUpdated,
    } = project || {};
    return (
        <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
        >
            <Card className="overflow-hidden rounded-2xl border bg-background/60 backdrop-blur hover:shadow-lg">
                <div className="grid grid-cols-1 gap-0 p-4 md:grid-cols-[160px_1fr_auto] md:gap-4">
                    <div className="relative h-28 w-full overflow-hidden rounded-xl md:h-24">
                        <img
                            src={image}
                            alt={title}
                            className="h-full w-full object-cover"
                        />
                        <div className="absolute left-2 top-2">
                            <Badge
                                className={clsx(
                                    "rounded-full",
                                    statusBadge(status)
                                )}
                            >
                                {status || "unknown"}
                            </Badge>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-start justify-between gap-2">
                            <div>
                                <p className="text-base font-semibold leading-tight">
                                    {title}
                                </p>
                                <p className="line-clamp-2 text-sm text-muted-foreground">
                                    {description}
                                </p>
                            </div>
                            <ProjectActions />
                        </div>

                        <div className="flex flex-wrap items-center gap-1">
                            {tags.slice(0, 4).map((t: string) => (
                                <Badge
                                    key={t}
                                    variant="secondary"
                                    className="rounded-md"
                                >
                                    {t}
                                </Badge>
                            ))}
                            {tags.length > 4 && (
                                <Badge variant="outline" className="rounded-md">
                                    +{tags.length - 4}
                                </Badge>
                            )}
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
                            <div className="flex items-center gap-3">
                                <span className="inline-flex items-center gap-1">
                                    <Star className="h-3.5 w-3.5" />{" "}
                                    {stars || 0}
                                </span>
                                <span className="inline-flex items-center gap-1">
                                    <Eye className="h-3.5 w-3.5" /> {views || 0}
                                </span>
                                <span className="inline-flex items-center gap-1">
                                    <Heart className="h-3.5 w-3.5" />{" "}
                                    {likes || 0}
                                </span>
                            </div>
                            <span className="inline-flex items-center gap-1">
                                <CalendarDays className="h-3.5 w-3.5" />{" "}
                                {formatDate(lastUpdated)}
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center justify-end gap-2 md:flex-col md:items-end">
                        <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                                <AvatarFallback className="bg-violet-500 text-white">
                                    {author?.[0]?.toUpperCase() || "T"}
                                </AvatarFallback>
                            </Avatar>
                            <div className="hidden text-right md:block">
                                <p className="text-sm font-medium">{author}</p>
                                <p className="text-xs text-muted-foreground">
                                    Maintainer
                                </p>
                            </div>
                        </div>
                        <Button
                            size="sm"
                            variant="secondary"
                            className="rounded-xl gap-1"
                        >
                            <Rocket className="h-4 w-4" /> View
                        </Button>
                    </div>
                </div>
            </Card>
        </motion.div>
    );
}

// ---- Shared: actions popover ----
function ProjectActions() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full"
                >
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem onClick={() => {}}>
                    View Project
                </DropdownMenuItem>
                <DropdownMenuItem
                    className="text-destructive"
                    onClick={() => {}}
                >
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

// ---- Empty & Skeleton ----
function EmptyState({ onReset }: { onReset: () => void }) {
    return (
        <Card className="rounded-2xl border bg-background/60 p-8 text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl border">
                <Sparkles className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold">No projects found</h3>
            <p className="mx-auto mt-1 max-w-md text-sm text-muted-foreground">
                Try adjusting filters or clearing your search.
            </p>
            <div className="mt-4 flex items-center justify-center gap-2">
                <Button
                    variant="secondary"
                    onClick={onReset}
                    className="rounded-xl"
                >
                    Reset filters
                </Button>
                <Button className="rounded-xl gap-1">
                    <Plus className="h-4 w-4" /> Add Project
                </Button>
            </div>
        </Card>
    );
}

function ProjectsSkeleton({ view }: { view: "grid" | "list" }) {
    if (view === "list") {
        return (
            <div className="space-y-3">
                {Array.from({ length: 4 }).map((_, i) => (
                    <Card key={i} className="rounded-2xl p-4">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-[160px_1fr_auto]">
                            <Skeleton className="h-24 w-full rounded-xl" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-2/3" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-5/6" />
                            </div>
                            <div className="flex items-center justify-end">
                                <Skeleton className="h-8 w-24 rounded-xl" />
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        );
    }
    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
                <Card key={i} className="rounded-2xl">
                    <Skeleton className="h-40 w-full" />
                    <div className="space-y-2 p-4">
                        <Skeleton className="h-4 w-2/3" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-4/5" />
                        <div className="flex items-center justify-between pt-2">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-4 w-24" />
                        </div>
                    </div>
                </Card>
            ))}
        </div>
    );
}

// ---- Utils ----
function statusBadge(status?: string) {
    const map: Record<string, string> = {
        active: "bg-emerald-500/10 text-emerald-500 ring-1 ring-emerald-500/20",
        completed: "bg-blue-500/10 text-blue-500 ring-1 ring-blue-500/20",
        "in-progress":
            "bg-amber-500/10 text-amber-500 ring-1 ring-amber-500/20",
    };
    return map[status || ""] || "bg-muted text-muted-foreground";
}

function formatDate(input?: string) {
    if (!input) return "—";
    const d = new Date(input);
    if (Number.isNaN(d.getTime())) return String(input);
    return d.toLocaleDateString(undefined, {
        month: "short",
        day: "2-digit",
        year: "numeric",
    });
}
