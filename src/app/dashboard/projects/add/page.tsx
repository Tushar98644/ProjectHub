"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PageContent from "@/components/layout/navbar/page-content";
import {
    PageNavbarLeftContent,
    PageNavbarRightContent,
    PageNavbarIconButton,
} from "@/components/layout/navbar/page-navbar";
import Navbar from "@/components/layout/navbar/navbar";
import { PrimaryButton } from "@/components/ui/Buttons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
import { cn } from "@/lib/utils";
import {
    AlertCircle,
    ExternalLink,
    GitBranch,
    GitPullRequest,
    Users,
} from "lucide-react";

const projectData = {
    _id: "1",
    title: "AI-Powered Task Manager",
    description:
        "A modern task management application that uses AI to help prioritize tasks and optimize productivity.",
    longDescription:
        "This comprehensive task management solution leverages artificial intelligence to revolutionize how teams organize and execute their work. Built with a modern tech stack, it offers seamless real-time collaboration, intelligent task prioritization using machine learning algorithms, and detailed analytics to help teams optimize their productivity.\n\nThe application features a clean, intuitive interface that adapts to user preferences and work patterns. Smart notifications ensure important tasks never slip through the cracks, while the AI assistant provides contextual suggestions for task scheduling and workload balancing.",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=400&fit=crop",
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
    createdAt: "2024-01-15",
    lastUpdated: "2 days ago",
    stars: 124,
    views: 1847,
    likes: 89,
    contributors: 5,
    commits: 156,
    issues: 8,
    pullRequests: 12,
};

export default function ProjectDetailPage() {
    const router = useRouter();
    const [isLiked, setIsLiked] = useState(false);
    const [isStarred, setIsStarred] = useState(false);

    const getStatusVariant = (status: string) => {
        switch (status) {
            case "active":
                return "default";
            case "completed":
                return "secondary";
            case "in-progress":
                return "outline";
            default:
                return "secondary";
        }
    };

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        // Toast would go here in real app
        alert("Project link copied to clipboard!");
    };

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
            icon: AlertCircle,
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

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100">
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
                        <h1 className="text-sm font-semibold text-gray-800 dark:text-white">
                            {projectData.title}
                        </h1>
                        <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                            Project Details & Information
                        </p>
                    </div>
                </PageNavbarLeftContent>

                <PageNavbarRightContent>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsLiked(!isLiked)}
                        className="rounded-full"
                    >
                        <Heart
                            size={16}
                            variant={isLiked ? "Bold" : "Outline"}
                            className={cn(
                                "transition-colors",
                                isLiked
                                    ? "text-red-500"
                                    : "text-gray-700 dark:text-gray-200"
                            )}
                        />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsStarred(!isStarred)}
                        className="rounded-full"
                    >
                        <Star1
                            size={16}
                            variant={isStarred ? "Bold" : "Outline"}
                            className={cn(
                                "transition-colors",
                                isStarred
                                    ? "text-yellow-500"
                                    : "text-gray-700 dark:text-gray-200"
                            )}
                        />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleShare}
                        className="rounded-full"
                    >
                        <Share size={16} />
                    </Button>
                    <PrimaryButton className="flex items-center gap-2">
                        <ExternalLink size={16} />
                        <span className="hidden md:inline">View Live</span>
                    </PrimaryButton>
                </PageNavbarRightContent>
            </Navbar>

            <PageContent>
                <div className="max-w-6xl space-y-6">
                    {/* Hero Section */}
                    <Card className="overflow-hidden border-0 shadow-lg bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-900/10 dark:to-purple-900/10">
                        <CardContent className="p-0">
                            <div className="relative h-64 md:h-80 overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10" />
                                <img
                                    src={projectData.image}
                                    alt={projectData.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute top-6 right-6 z-20">
                                    <Badge
                                        variant={getStatusVariant(
                                            projectData.status
                                        )}
                                        className="bg-white/90 text-gray-900 shadow-lg"
                                    >
                                        {projectData.status}
                                    </Badge>
                                </div>
                                <div className="absolute bottom-6 left-6 right-6 z-20 text-white">
                                    <h1 className="text-2xl md:text-3xl font-bold mb-2">
                                        {projectData.title}
                                    </h1>
                                    <p className="text-sm opacity-90 max-w-2xl">
                                        {projectData.description}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Main Content */}
                        <div className="lg:col-span-2">
                            <Tabs defaultValue="overview" className="w-full">
                                <TabsList className="grid w-full grid-cols-3 mb-6">
                                    <TabsTrigger value="overview">
                                        Overview
                                    </TabsTrigger>
                                    <TabsTrigger value="stats">
                                        Statistics
                                    </TabsTrigger>
                                    <TabsTrigger value="activity">
                                        Activity
                                    </TabsTrigger>
                                </TabsList>

                                <TabsContent
                                    value="overview"
                                    className="space-y-6"
                                >
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="text-lg">
                                                About this project
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line mb-6">
                                                {projectData.longDescription}
                                            </p>

                                            <div className="space-y-4">
                                                <div>
                                                    <h4 className="text-sm font-medium text-gray-800 dark:text-white mb-3">
                                                        Built with
                                                    </h4>
                                                    <div className="flex flex-wrap gap-2">
                                                        {projectData.techStack.map(
                                                            tech => (
                                                                <Badge
                                                                    key={tech}
                                                                    variant="secondary"
                                                                    className="bg-violet-50 hover:bg-violet-100 text-violet-700 dark:bg-violet-900/20 dark:text-violet-400 border-violet-200 dark:border-violet-800"
                                                                >
                                                                    {tech}
                                                                </Badge>
                                                            )
                                                        )}
                                                    </div>
                                                </div>

                                                <Separator />

                                                <div className="flex gap-3">
                                                    <Button
                                                        variant="outline"
                                                        asChild
                                                        className="flex items-center gap-2"
                                                    >
                                                        <a
                                                            href={
                                                                projectData.github
                                                            }
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            <Code size={16} />
                                                            Source Code
                                                        </a>
                                                    </Button>
                                                    <Button
                                                        asChild
                                                        className="flex items-center gap-2 bg-violet-500 hover:bg-violet-600"
                                                    >
                                                        <a
                                                            href={
                                                                projectData.liveUrl
                                                            }
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            <Link21 size={16} />
                                                            Live Demo
                                                        </a>
                                                    </Button>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </TabsContent>

                                <TabsContent value="stats">
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {stats.map(stat => (
                                            <Card
                                                key={stat.label}
                                                className="text-center"
                                            >
                                                <CardContent className="p-6">
                                                    <div className="flex items-center justify-center mb-2">
                                                        <stat.icon
                                                            size={20}
                                                            className={
                                                                stat.color
                                                            }
                                                        />
                                                    </div>
                                                    <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                                                        {stat.value}
                                                    </div>
                                                    <div className="text-xs text-gray-500 dark:text-gray-400">
                                                        {stat.label}
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                </TabsContent>

                                <TabsContent value="activity">
                                    <Card>
                                        <CardContent className="p-6">
                                            <div className="space-y-4">
                                                {activities.map(
                                                    (activity, index) => (
                                                        <div
                                                            key={index}
                                                            className="flex items-center gap-4 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700/50"
                                                        >
                                                            <div
                                                                className={cn(
                                                                    "p-2 rounded-full bg-white dark:bg-gray-800 shadow-sm",
                                                                    activity.color
                                                                )}
                                                            >
                                                                <activity.icon
                                                                    size={16}
                                                                    className="current-color"
                                                                />
                                                            </div>
                                                            <div className="flex-1">
                                                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                                    {
                                                                        activity.title
                                                                    }
                                                                </p>
                                                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                                                    {
                                                                        activity.time
                                                                    }
                                                                </p>
                                                            </div>
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </TabsContent>
                            </Tabs>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Author Card */}
                            <Card className="bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-900/10 dark:to-purple-900/10 border-violet-100 dark:border-violet-800/50">
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
                                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                {projectData.author}
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                Project Owner
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Stats Card */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-sm">
                                        Project Stats
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center">
                                            <span className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                                                <Star1
                                                    size={12}
                                                    className="text-yellow-500"
                                                />
                                                Stars
                                            </span>
                                            <Badge variant="secondary">
                                                {projectData.stars}
                                            </Badge>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                                                <Eye
                                                    size={12}
                                                    className="text-blue-500"
                                                />
                                                Views
                                            </span>
                                            <Badge variant="secondary">
                                                {projectData.views}
                                            </Badge>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                                                <Heart
                                                    size={12}
                                                    className="text-red-500"
                                                />
                                                Likes
                                            </span>
                                            <Badge variant="secondary">
                                                {projectData.likes}
                                            </Badge>
                                        </div>
                                        <Separator />
                                        <div className="flex justify-between items-center">
                                            <span className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                                                <Calendar
                                                    size={12}
                                                    className="text-gray-500"
                                                />
                                                Updated
                                            </span>
                                            <span className="text-sm text-gray-900 dark:text-white">
                                                {projectData.lastUpdated}
                                            </span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Tags Card */}
                            <Card>
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
                        </div>
                    </div>
                </div>
            </PageContent>
        </div>
    );
}
