/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Sparkles, Link2 } from "lucide-react";
import { Star1, Eye, Heart, Code, Calendar, Activity, Message } from "iconsax-reactjs";
import { GitBranch, Users, GitPullRequest, FileText, BarChart3, Clock } from "lucide-react";
import { useFetchProject } from "@/hooks/queries/useProjectQuery";
import { useParams } from "next/navigation";

type TabKey = "overview" | "metrics" | "activity";

export default function ProjectDetailPage() {
    const [tab, setTab] = useState<TabKey>("overview");
    const [starred, setStarred] = useState(false);
    const [liked, setLiked] = useState(false);

    const { id } = useParams<{ id: string }>();
    const { data: project } = useFetchProject(id);
    console.log(project);

    const metricRows = [
        { icon: GitBranch, label: "Commits", value: project?.likes || 0 },
        { icon: Users, label: "Contributors", value: project?.likes || 0 },
        { icon: Activity, label: "Issues", value: project?.likes || 0 },
        {
            icon: GitPullRequest,
            label: "Pull Requests",
            value: project?.likes || 0,
        },
    ];

    const activities = [
        {
            icon: Activity,
            title: "Project updated",
            time: project?.lastUpdated,
        },
        { icon: Code, title: "New feature added", time: project?.lastUpdated },
        {
            icon: Star1,
            title: "Reached 100+ stars",
            time: project?.lastUpdated,
        },
    ];

    const StatRow = ({ Icon, label, value }: { Icon: any; label: string; value: number | string }) => (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Icon className="h-4 w-4 opacity-90" />
                <span>{label}</span>
            </div>
            <Badge variant="secondary" className="rounded-full">
                {value}
            </Badge>
        </div>
    );

    return (
        <div className="h-full flex flex-col bg-gradient-to-b from-background via-background to-background text-foreground">
            <main className="overflow-scroll pb-20 w-full max-w-6xl mx-auto px-4 py-8 flex-1">
                {/* HERO */}
                <motion.header
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.36 }}
                >
                    <Card className="overflow-hidden border bg-background/60 backdrop-blur rounded-2xl shadow-lg">
                        <CardContent className="p-0">
                            <div className="relative h-64 md:h-80">
                                <img
                                    src={project?.image}
                                    alt={project?.title}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 will-change-transform hover:scale-[1.02]"
                                />
                                {/* Overlay uses theme token via semi-transparent background */}
                                <div className="absolute inset-0 " />
                                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                                    <div className="flex items-center gap-3">
                                        <Badge
                                            variant="default"
                                            className="rounded-full bg-background/90 text-foreground shadow-sm"
                                        >
                                            {project?.status}
                                        </Badge>

                                        <div className="ml-auto flex items-center gap-2">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => setStarred(s => !s)}
                                                className={cn("rounded-xl")}
                                                aria-pressed={starred}
                                                aria-label={starred ? "Unstar project" : "Star project"}
                                            >
                                                <Star1
                                                    size={14}
                                                    className={cn(
                                                        starred ? "text-muted-foreground" : "text-muted-foreground/80"
                                                    )}
                                                />
                                                <span className="hidden sm:inline text-xs ml-1">
                                                    {starred ? "Starred" : "Star"}
                                                </span>
                                            </Button>

                                            <Button variant="secondary" size="sm" asChild className="rounded-xl">
                                                <a
                                                    href={project?.githubUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-2"
                                                >
                                                    <Link2 size={14} />
                                                    <span className="text-xs">Live demo</span>
                                                </a>
                                            </Button>
                                        </div>
                                    </div>

                                    <h1 className="mt-4 text-2xl md:text-3xl font-bold text-foreground/95 flex items-center gap-2">
                                        <Sparkles className="h-5 w-5" />
                                        {project?.title}
                                    </h1>
                                    <p className="mt-1 text-sm text-muted-foreground max-w-2xl">
                                        {project?.description}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.header>

                {/* LAYOUT: left tabs | content | right sidebar */}
                <div className="grid grid-cols-1 gap-6 mt-6 lg:grid-cols-[220px_1fr_320px]">
                    {/* LEFT NAV */}
                    <aside className="lg:sticky lg:top-20 lg:self-start">
                        <Card className="rounded-2xl border bg-card/60 backdrop-blur">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm">Sections</CardTitle>
                            </CardHeader>
                            <CardContent className="p-2">
                                <nav className="flex gap-2 p-2 lg:flex-col" aria-label="Sections">
                                    {[
                                        {
                                            key: "overview",
                                            label: "Overview",
                                            desc: "Summary",
                                            Icon: FileText,
                                        },
                                        {
                                            key: "metrics",
                                            label: "Metrics",
                                            desc: "Repo stats",
                                            Icon: BarChart3,
                                        },
                                        {
                                            key: "activity",
                                            label: "Activity",
                                            desc: "Timeline",
                                            Icon: Clock,
                                        },
                                    ].map(({ key, label, desc, Icon }) => {
                                        const active = tab === key;
                                        return (
                                            <Button
                                                key={key}
                                                variant={active ? "default" : "ghost"}
                                                size="sm"
                                                onClick={() => setTab(key as TabKey)}
                                                className={cn(
                                                    "justify-start rounded-md py-6 my-1 w-full gap-2",
                                                    active && "shadow-[0_0_0_3px_var(--shadow-ring,rgba(0,0,0,0.06))]"
                                                )}
                                                aria-current={active ? "page" : undefined}
                                            >
                                                <Icon className="h-4 w-4" />
                                                <div className="text-left">
                                                    <div className="text-xs font-medium">{label}</div>
                                                    <div className="text-[10px] text-muted-foreground">{desc}</div>
                                                </div>
                                            </Button>
                                        );
                                    })}
                                </nav>
                            </CardContent>
                        </Card>
                    </aside>

                    {/* MAIN */}
                    <section className="min-w-0">
                        <AnimatePresence mode="wait">
                            {tab === "overview" && (
                                <motion.article
                                    key="overview"
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -8 }}
                                    transition={{ duration: 0.22 }}
                                >
                                    <Card className="rounded-2xl border bg-background/60 backdrop-blur">
                                        <CardHeader>
                                            <CardTitle className="text-lg">About</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line mb-6">
                                                {project?.description}
                                            </p>

                                            <div className="space-y-4">
                                                <div>
                                                    <h4 className="text-sm font-medium mb-2">Built with</h4>
                                                    <div className="flex flex-wrap gap-2">
                                                        {project?.tags &&
                                                            project?.tags?.map(tech => (
                                                                <Badge
                                                                    key={tech}
                                                                    variant="secondary"
                                                                    className="rounded-md text-xs"
                                                                >
                                                                    {tech}
                                                                </Badge>
                                                            ))}
                                                    </div>
                                                </div>

                                                <Separator />

                                                <div className="flex flex-wrap gap-3 items-center">
                                                    <Button variant="outline" asChild className="rounded-xl gap-2">
                                                        <a
                                                            href={project?.githubUrl}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            className="flex items-center gap-2"
                                                        >
                                                            <Code size={14} />
                                                            <span className="text-xs">Source Code</span>
                                                        </a>
                                                    </Button>

                                                    <Button asChild className="rounded-xl gap-2">
                                                        <a
                                                            href={project?.liveUrl || project?.githubUrl}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            className="flex items-center gap-2"
                                                        >
                                                            <Link2 size={14} />
                                                            <span className="text-xs">Live Demo</span>
                                                        </a>
                                                    </Button>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.article>
                            )}

                            {tab === "metrics" && (
                                <motion.article
                                    key="metrics"
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -8 }}
                                    transition={{ duration: 0.22 }}
                                >
                                    <Card className="rounded-2xl border bg-background/60 backdrop-blur">
                                        <CardHeader>
                                            <CardTitle className="text-lg">Repository Metrics</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                                {metricRows.map(m => (
                                                    <motion.div
                                                        key={m.label}
                                                        initial={{
                                                            opacity: 0,
                                                            y: 6,
                                                        }}
                                                        animate={{
                                                            opacity: 1,
                                                            y: 0,
                                                        }}
                                                        transition={{
                                                            duration: 0.18,
                                                        }}
                                                    >
                                                        <Card className="rounded-2xl border bg-card/60 text-center">
                                                            <CardContent className="p-5">
                                                                <div className="flex items-center justify-center mb-2">
                                                                    <m.icon className="h-5 w-5 opacity-90" />
                                                                </div>
                                                                <div className="text-2xl font-semibold mb-1">
                                                                    {m.value}
                                                                </div>
                                                                <div className="text-xs text-muted-foreground">
                                                                    {m.label}
                                                                </div>
                                                            </CardContent>
                                                        </Card>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.article>
                            )}

                            {tab === "activity" && (
                                <motion.article
                                    key="activity"
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -8 }}
                                    transition={{ duration: 0.22 }}
                                >
                                    <Card className="rounded-2xl border bg-background/60 backdrop-blur">
                                        <CardHeader>
                                            <CardTitle className="text-lg">Recent Activity</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-3">
                                                {activities.map((a, idx) => (
                                                    <div
                                                        key={idx}
                                                        className="flex items-start gap-3 p-3 rounded-xl bg-card/50 border"
                                                    >
                                                        <div className="p-2 rounded-full bg-background shadow-sm">
                                                            <a.icon size={16} />
                                                        </div>
                                                        <div className="flex-1">
                                                            <p className="text-sm font-medium text-foreground">
                                                                {a.title}
                                                            </p>
                                                            <p className="text-xs text-muted-foreground">
                                                                {/* @ts-ignore */}
                                                                {a.time}
                                                            </p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.article>
                            )}
                        </AnimatePresence>
                    </section>

                    {/* RIGHT SIDEBAR */}
                    <aside className="space-y-6 lg:sticky lg:top-20 lg:self-start">
                        <Card className="rounded-2xl border bg-card/60 backdrop-blur">
                            <CardHeader>
                                <CardTitle className="text-sm">Created by</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-12 w-12 bg-card/80">
                                        <AvatarFallback className="text-foreground font-medium">
                                            {project?.authorAvatar}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="text-sm font-medium text-foreground">{project?.author}</p>
                                        <p className="text-xs text-muted-foreground">
                                            {project?.author || "Tushar Banik"}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="rounded-2xl border bg-background/60 backdrop-blur">
                            <CardHeader>
                                <CardTitle className="text-sm">Project Stats</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <StatRow Icon={Star1} label="Stars" value={project?.stars || 0} />
                                    <StatRow Icon={Eye} label="Views" value={project?.views || 0} />
                                    <StatRow Icon={Heart} label="Likes" value={project?.likes || 0} />
                                    <StatRow Icon={Message} label="Comments" value={project?.comments || 0} />
                                    <Separator />
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                            <Calendar className="h-4 w-4" />
                                            <span>Updated</span>
                                        </div>
                                        <div className="text-sm">
                                            {/* @ts-ignore */}
                                            {project?.lastUpdated}
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="rounded-2xl border bg-background/60 backdrop-blur">
                            <CardHeader>
                                <CardTitle className="text-sm">Tags</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-wrap gap-2">
                                    {project?.tags &&
                                        project?.tags?.map(t => (
                                            <Badge key={t} variant="outline" className="text-xs">
                                                {t}
                                            </Badge>
                                        ))}
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="rounded-2xl border bg-background/60 backdrop-blur">
                            <CardHeader>
                                <CardTitle className="text-sm">Quick Links</CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-col gap-2">
                                <Button asChild variant="secondary" className="rounded-xl">
                                    <a
                                        href={project?.githubUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex items-center gap-2"
                                    >
                                        <Code size={14} />
                                        <span className="text-xs">Source Code</span>
                                    </a>
                                </Button>

                                <Button asChild className="rounded-xl">
                                    <a
                                        href={project?.liveUrl || project?.githubUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex items-center gap-2"
                                    >
                                        <Link2 size={14} />
                                        <span className="text-xs">Live Demo</span>
                                    </a>
                                </Button>
                            </CardContent>
                        </Card>
                    </aside>
                </div>
            </main>
        </div>
    );
}
