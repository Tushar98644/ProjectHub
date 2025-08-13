"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PageContent from "@/components/layout/navbar/page-content";
import {
    PageNavbarLeftContent,
    PageNavbarRightContent,
} from "@/components/layout/navbar/page-navbar";
import Navbar from "@/components/layout/navbar/navbar";
import { PrimaryButton } from "@/components/ui/Buttons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import {
    ArrowLeft,
    Star1,
    Eye,
    Heart,
    Share,
    Code,
    Link21,
    Calendar,
    Activity,
} from "iconsax-reactjs";
import {
    ExternalLink,
    GitBranch,
    GitPullRequest,
    Users,
    FileText,
    BarChart3,
    Clock,
    Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const projectData = {
    title: "AI-Powered Task Manager",
    description:
        "A modern task management application that uses AI to help prioritize tasks and optimize productivity.",
    longDescription:
        "This comprehensive task management solution leverages artificial intelligence to revolutionize how teams organize and execute their work. Built with a modern tech stack, it offers seamless real-time collaboration, intelligent task prioritization using machine learning algorithms, and detailed analytics to help teams optimize their productivity.\n\nThe application features a clean, intuitive interface that adapts to user preferences and work patterns. Smart notifications ensure important tasks never slip through the cracks, while the AI assistant provides contextual suggestions for task scheduling and workload balancing.",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=1200&h=520&fit=crop",
    status: "active" as const,
    tags: ["react", "nodejs", "ai", "productivity", "collaboration"],
    techStack: [
        "React",
        "TypeScript",
        "Node.js",
        "MongoDB",
        "OpenAI",
        "Socket.io",
        "Tailwind CSS",
    ],
    github: "https://github.com/user/ai-task-manager",
    liveUrl: "https://ai-task-manager.vercel.app",
    author: "Tushar",
    authorAvatar: "T",
    lastUpdated: "2 days ago",
    stars: 124,
    views: 1847,
    likes: 89,
    contributors: 5,
    commits: 156,
    issues: 8,
    pullRequests: 12,
};

type TabKey = "overview" | "stats" | "activity";

export default function ProjectDetailPage() {
    const router = useRouter();
    const [isLiked, setIsLiked] = useState(false);
    const [isStarred, setIsStarred] = useState(false);
    const [tab, setTab] = useState<TabKey>("overview");

    const stats = [
        {
            icon: GitBranch,
            label: "Commits",
            value: projectData.commits,
            color: "text-blue-500",
        },
        {
            icon: Users,
            label: "Contributors",
            value: projectData.contributors,
            color: "text-green-500",
        },
        {
            icon: Activity,
            label: "Issues",
            value: projectData.issues,
            color: "text-red-500",
        },
        {
            icon: GitPullRequest,
            label: "Pull Requests",
            value: projectData.pullRequests,
            color: "text-purple-500",
        },
    ];

    const activities = [
        {
            icon: Activity,
            title: "Project updated",
            time: "2 days ago",
            color: "text-green-500",
        },
        {
            icon: Code,
            title: "New feature added",
            time: "1 week ago",
            color: "text-blue-500",
        },
        {
            icon: Star1,
            title: "Reached 100+ stars",
            time: "2 weeks ago",
            color: "text-yellow-500",
        },
    ];

    const tabs: { key: TabKey; label: string; icon: any; desc: string }[] = [
        { key: "overview", label: "Overview", icon: FileText, desc: "Summary" },
        { key: "stats", label: "Statistics", icon: BarChart3, desc: "Metrics" },
        { key: "activity", label: "Activity", icon: Clock, desc: "Timeline" },
    ];

    const Stat = ({
        icon,
        label,
        value,
    }: {
        icon: React.ReactNode;
        label: string;
        value: number | string;
    }) => (
        <div className="flex justify-between items-center">
            <span className="flex items-center gap-2 text-xs text-muted-foreground">
                {icon}
                {label}
            </span>
            <Badge variant="secondary">{value}</Badge>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-b from-background via-background to-background text-foreground">
            <div className="pointer-events-none fixed inset-0 -z-10 [mask-image:radial-gradient(60%_40%_at_50%_0%,#000_40%,transparent_100%)]">
                <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-violet-500/20 via-transparent to-transparent blur-2xl" />
            </div>

            <Navbar>
                <PageNavbarLeftContent>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => router.back()}
                        className="rounded-full"
                    >
                        <ArrowLeft size={18} />
                    </Button>
                    <div>
                        <h1 className="text-sm font-semibold">
                            {projectData.title}
                        </h1>
                        <p className="text-xs text-muted-foreground">
                            Project Details & Information
                        </p>
                    </div>
                </PageNavbarLeftContent>
                <PageNavbarRightContent>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsLiked(v => !v)}
                        className="rounded-full"
                    >
                        <Heart
                            size={16}
                            variant={isLiked ? "Bold" : "Outline"}
                            className={cn(
                                "transition-colors",
                                isLiked
                                    ? "text-red-500"
                                    : "text-muted-foreground"
                            )}
                        />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsStarred(v => !v)}
                        className="rounded-full"
                    >
                        <Star1
                            size={16}
                            variant={isStarred ? "Bold" : "Outline"}
                            className={cn(
                                "transition-colors",
                                isStarred
                                    ? "text-yellow-500"
                                    : "text-muted-foreground"
                            )}
                        />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                            navigator.clipboard.writeText(window.location.href);
                            alert("Project link copied to clipboard!");
                        }}
                        className="rounded-full"
                    >
                        <Share size={16} />
                    </Button>
                    <PrimaryButton className="flex items-center gap-2 rounded-xl">
                        <ExternalLink size={16} />
                        <span className="hidden md:inline">View Live</span>
                    </PrimaryButton>
                </PageNavbarRightContent>
            </Navbar>

            <PageContent>
                <div className="max-w-6xl space-y-6">
                    {/* Hero */}
                    <motion.div
                        initial={{ opacity: 0, y: 6, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Card className="overflow-hidden border bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-lg rounded-2xl">
                            <CardContent className="p-0">
                                <div className="relative h-64 md:h-80 overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent z-10" />
                                    <img
                                        src={projectData.image}
                                        alt={projectData.title}
                                        className="w-full h-full object-cover transition-transform duration-500 will-change-transform hover:scale-[1.02]"
                                    />
                                    <div className="absolute top-6 right-6 z-20">
                                        <Badge
                                            variant="default"
                                            className="rounded-full bg-white/90 text-foreground shadow"
                                        >
                                            {projectData.status}
                                        </Badge>
                                    </div>
                                    <div className="absolute bottom-6 left-6 right-6 z-20 text-white drop-shadow">
                                        <h1 className="text-2xl md:text-3xl font-bold mb-2 flex items-center gap-2">
                                            <Sparkles className="h-5 w-5" />
                                            {projectData.title}
                                        </h1>
                                        <p className="text-sm/relaxed opacity-90 max-w-2xl">
                                            {projectData.description}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[220px_1fr_320px]">
                        {/* Tabs */}
                        <motion.aside
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.25 }}
                            className="lg:sticky lg:top-20 lg:self-start"
                        >
                            <Card className="rounded-2xl border bg-background/60 backdrop-blur">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-sm">
                                        Sections
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-2">
                                    <nav className="flex gap-2 lg:flex-col">
                                        {tabs.map(t => (
                                            <Button
                                                key={t.key}
                                                variant={
                                                    tab === t.key
                                                        ? "default"
                                                        : "ghost"
                                                }
                                                size="sm"
                                                onClick={() => setTab(t.key)}
                                                className={cn(
                                                    "justify-start rounded-xl w-full gap-2",
                                                    tab === t.key &&
                                                        "shadow-[0_0_0_3px_rgba(139,92,246,0.25)]"
                                                )}
                                            >
                                                <t.icon className="h-4 w-4" />
                                                <div className="text-left">
                                                    <div className="text-xs font-medium">
                                                        {t.label}
                                                    </div>
                                                    <div className="text-[10px] text-muted-foreground">
                                                        {t.desc}
                                                    </div>
                                                </div>
                                            </Button>
                                        ))}
                                    </nav>
                                </CardContent>
                            </Card>
                        </motion.aside>

                        {/* Content */}
                        <section className="min-w-0">
                            <AnimatePresence mode="wait">
                                {tab === "overview" && (
                                    <motion.div
                                        key="overview"
                                        initial={{ opacity: 0, y: 6 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -6 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <Card className="rounded-2xl border bg-background/60 backdrop-blur">
                                            <CardHeader>
                                                <CardTitle className="text-lg">
                                                    About this project
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line mb-6">
                                                    {
                                                        projectData.longDescription
                                                    }
                                                </p>
                                                <div className="space-y-4">
                                                    <div>
                                                        <h4 className="text-sm font-medium mb-3">
                                                            Built with
                                                        </h4>
                                                        <div className="flex flex-wrap gap-2">
                                                            {projectData.techStack.map(
                                                                tech => (
                                                                    <Badge
                                                                        key={
                                                                            tech
                                                                        }
                                                                        variant="secondary"
                                                                        className="rounded-md"
                                                                    >
                                                                        {tech}
                                                                    </Badge>
                                                                )
                                                            )}
                                                        </div>
                                                    </div>
                                                    <Separator />
                                                    <div className="flex flex-wrap gap-3">
                                                        <Button
                                                            variant="outline"
                                                            asChild
                                                            className="rounded-xl gap-2"
                                                        >
                                                            <a
                                                                href={
                                                                    projectData.github
                                                                }
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                            >
                                                                <Code
                                                                    size={16}
                                                                />
                                                                Source Code
                                                            </a>
                                                        </Button>
                                                        <Button
                                                            asChild
                                                            className="rounded-xl gap-2"
                                                        >
                                                            <a
                                                                href={
                                                                    projectData.liveUrl
                                                                }
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                            >
                                                                <Link21
                                                                    size={16}
                                                                />
                                                                Live Demo
                                                            </a>
                                                        </Button>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                )}
                                {tab === "stats" && (
                                    <motion.div
                                        key="stats"
                                        initial={{ opacity: 0, y: 6 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -6 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <Card className="rounded-2xl border bg-background/60 backdrop-blur">
                                            <CardHeader>
                                                <CardTitle className="text-lg">
                                                    Repository Metrics
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                                    {stats.map(stat => (
                                                        <motion.div
                                                            key={stat.label}
                                                            initial={{
                                                                opacity: 0,
                                                                y: 8,
                                                            }}
                                                            animate={{
                                                                opacity: 1,
                                                                y: 0,
                                                            }}
                                                            transition={{
                                                                duration: 0.25,
                                                            }}
                                                        >
                                                            <Card className="text-center rounded-2xl border bg-card/60">
                                                                <CardContent className="p-6">
                                                                    <div className="flex items-center justify-center mb-2">
                                                                        <stat.icon
                                                                            className={cn(
                                                                                "h-5 w-5",
                                                                                stat.color
                                                                            )}
                                                                        />
                                                                    </div>
                                                                    <div className="text-2xl font-bold mb-1">
                                                                        {
                                                                            stat.value
                                                                        }
                                                                    </div>
                                                                    <div className="text-xs text-muted-foreground">
                                                                        {
                                                                            stat.label
                                                                        }
                                                                    </div>
                                                                </CardContent>
                                                            </Card>
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                )}
                                {tab === "activity" && (
                                    <motion.div
                                        key="activity"
                                        initial={{ opacity: 0, y: 6 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -6 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <Card className="rounded-2xl border bg-background/60 backdrop-blur">
                                            <CardHeader>
                                                <CardTitle className="text-lg">
                                                    Recent Activity
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent className="p-6">
                                                <div className="space-y-4">
                                                    {activities.map(
                                                        (activity, i) => (
                                                            <motion.div
                                                                key={i}
                                                                initial={{
                                                                    opacity: 0,
                                                                    y: 8,
                                                                }}
                                                                animate={{
                                                                    opacity: 1,
                                                                    y: 0,
                                                                }}
                                                                transition={{
                                                                    duration: 0.25,
                                                                    delay:
                                                                        i *
                                                                        0.04,
                                                                }}
                                                                className="flex items-center gap-4 p-3 rounded-xl bg-muted/40 border"
                                                            >
                                                                <div
                                                                    className={cn(
                                                                        "p-2 rounded-full bg-background shadow-sm",
                                                                        activity.color
                                                                    )}
                                                                >
                                                                    <activity.icon
                                                                        size={
                                                                            16
                                                                        }
                                                                    />
                                                                </div>
                                                                <div className="flex-1">
                                                                    <p className="text-sm font-medium">
                                                                        {
                                                                            activity.title
                                                                        }
                                                                    </p>
                                                                    <p className="text-xs text-muted-foreground">
                                                                        {
                                                                            activity.time
                                                                        }
                                                                    </p>
                                                                </div>
                                                            </motion.div>
                                                        )
                                                    )}
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </section>

                        {/* Sidebar */}
                        <motion.aside
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.25 }}
                            className="space-y-6 lg:sticky lg:top-20 lg:self-start"
                        >
                            <Card className="rounded-2xl border bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-900/10 dark:to-purple-900/10 border-violet-100/60 dark:border-violet-900/40">
                                <CardHeader>
                                    <CardTitle className="text-sm">
                                        Created by
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-12 w-12 bg-violet-500">
                                            <AvatarFallback className="text-white font-medium">
                                                {projectData.authorAvatar}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="text-sm font-medium">
                                                {projectData.author}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                Project Owner
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="rounded-2xl border bg-background/60 backdrop-blur">
                                <CardHeader>
                                    <CardTitle className="text-sm">
                                        Project Stats
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <Stat
                                            icon={
                                                <Star1
                                                    size={12}
                                                    className="text-yellow-500"
                                                />
                                            }
                                            label="Stars"
                                            value={projectData.stars}
                                        />
                                        <Stat
                                            icon={
                                                <Eye
                                                    size={12}
                                                    className="text-blue-500"
                                                />
                                            }
                                            label="Views"
                                            value={projectData.views}
                                        />
                                        <Stat
                                            icon={
                                                <Heart
                                                    size={12}
                                                    className="text-red-500"
                                                />
                                            }
                                            label="Likes"
                                            value={projectData.likes}
                                        />
                                        <Separator />
                                        <div className="flex justify-between items-center">
                                            <span className="flex items-center gap-2 text-xs text-muted-foreground">
                                                <Calendar size={12} />
                                                Updated
                                            </span>
                                            <span className="text-sm">
                                                {projectData.lastUpdated}
                                            </span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="rounded-2xl border bg-background/60 backdrop-blur">
                                <CardHeader>
                                    <CardTitle className="text-sm">
                                        Tags
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-wrap gap-2">
                                        {projectData.tags.map(tag => (
                                            <Badge
                                                key={tag}
                                                variant="outline"
                                                className="text-xs"
                                            >
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="rounded-2xl border bg-background/60 backdrop-blur">
                                <CardHeader>
                                    <CardTitle className="text-sm">
                                        Quick Links
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="flex flex-col gap-2">
                                    <Button
                                        asChild
                                        variant="secondary"
                                        className="rounded-xl"
                                    >
                                        <a
                                            href={projectData.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2"
                                        >
                                            <Code size={16} /> Source Code
                                        </a>
                                    </Button>
                                    <Button asChild className="rounded-xl">
                                        <a
                                            href={projectData.liveUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2"
                                        >
                                            <ExternalLink className="h-4 w-4" />{" "}
                                            Live Demo
                                        </a>
                                    </Button>
                                </CardContent>
                            </Card>
                        </motion.aside>
                    </div>
                </div>
            </PageContent>
        </div>
    );
}
