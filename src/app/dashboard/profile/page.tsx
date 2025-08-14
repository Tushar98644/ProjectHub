"use client";

import { useState } from "react";
import PageContent from "@/components/layout/navbar/page-content";
import { PageNavbarLeftContent } from "@/components/layout/navbar/page-navbar";
import Navbar from "@/components/layout/navbar/navbar";
import {
    MapPin,
    Calendar,
    Link as LinkIcon,
    Edit,
    Settings,
    Star,
    Eye,
    Heart,
    Code,
    Users,
    Clock,
    Trophy,
    Zap,
    MessageSquare,
    ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Link from "next/link";
import { cn } from "@/lib/utils";

const userData = {
    id: "user123",
    name: "Alex Chen",
    username: "alexchen",
    email: "alex@example.com",
    avatar: "https://img.freepik.com/premium-vector/flat-design-user-profile-icon-vector-illustration_1120563-26279.jpg?semt=ais_hybrid&w=740&q=80",
    cover: "https://img.freepik.com/premium-vector/flat-design-user-profile-icon-vector-illustration_1120563-26279.jpg?semt=ais_hybrid&w=740&q=80",
    bio: "Full-stack developer passionate about creating beautiful, functional web experiences. Building the future, one commit at a time.",
    location: "San Francisco, CA",
    website: "https://alexchen.dev",
    joinDate: "2022-03-15",
    isVerified: true,
    stats: {
        projects: 24,
        followers: 1249,
        following: 892,
        stars: 3847,
        views: 12543,
        likes: 2891,
    },
    skills: [
        "React",
        "Next.js",
        "TypeScript",
        "Node.js",
        "MongoDB",
        "Tailwind CSS",
        "GraphQL",
        "Docker",
        "AWS",
        "Firebase",
    ],
    achievements: [
        {
            id: 1,
            title: "Early Adopter",
            description: "Joined in first 1000 users",
            icon: Trophy,
        },
        {
            id: 2,
            title: "Popular Creator",
            description: "10+ projects with 100+ stars",
            icon: Star,
        },
        {
            id: 3,
            title: "Community Helper",
            description: "50+ helpful comments",
            icon: Users,
        },
        {
            id: 4,
            title: "Consistency King",
            description: "30 day commit streak",
            icon: Zap,
        },
    ],
    recentActivity: [
        {
            id: 1,
            type: "project",
            title: "Created 'Modern Dashboard'",
            time: "2h ago",
        },
        {
            id: 2,
            type: "star",
            title: "Starred 'ui-components'",
            time: "5h ago",
        },
        { id: 3, type: "follow", title: "Followed @sarah_dev", time: "1d ago" },
        {
            id: 4,
            type: "comment",
            title: "Commented on 'API Best Practices'",
            time: "2d ago",
        },
    ],
};

export default function UserProfilePage() {
    const [activeTab, setActiveTab] = useState("overview");
    const [isOwnProfile] = useState(true);

    return (
        <div className="min-h-screen bg-background">
            {/* Subtle background pattern */}
            <div className="fixed inset-0 -z-10">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] opacity-20" />
            </div>

            {/* Gradient overlay */}
            <div className="fixed inset-0 -z-10">
                <div className="absolute inset-x-0 top-0 h-80 bg-gradient-to-b from-primary/5 via-primary/2 to-transparent blur-3xl" />
            </div>

            <Navbar>
                <PageNavbarLeftContent>
                    <div>
                        <h1 className="font-semibold text-foreground">
                            Profile
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            View and manage your profile details
                        </p>
                    </div>
                </PageNavbarLeftContent>
            </Navbar>

            <PageContent>
                <div className="mx-auto max-w-6xl space-y-8">
                    {/* Profile Header */}
                    <Card className="overflow-hidden border-0 bg-card/50 backdrop-blur-sm shadow-lg">
                        {/* Cover Image */}
                        <div className="relative h-48 sm:h-56 bg-gradient-to-br from-primary/10 via-primary/5 to-secondary/10">
                            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-blue-500/5 to-emerald-500/10" />
                            <img
                                src={userData.cover}
                                alt="Cover"
                                className="h-full w-full object-cover opacity-20"
                            />
                            {isOwnProfile && (
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="text-xs absolute right-4 top-4 border-white/20 bg-white/10 text-foreground backdrop-blur-sm hover:bg-white/20"
                                >
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit Cover
                                </Button>
                            )}
                        </div>

                        <CardContent className="relative p-6 sm:p-8">
                            {/* Avatar & Info */}
                            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                                <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
                                    <Avatar className="-mt-16 h-32 w-32 border-4 border-background shadow-xl">
                                        <AvatarImage
                                            src={userData.avatar}
                                            className="object-cover"
                                        />
                                        <AvatarFallback className="text-xl font-semibold">
                                            {userData.name
                                                .split(" ")
                                                .map(n => n[0])
                                                .join("")}
                                        </AvatarFallback>
                                    </Avatar>

                                    <div className="flex-1 space-y-4">
                                        <div className="space-y-2">
                                            <div className="flex flex-wrap items-center gap-3">
                                                <h1 className="text-3xl font-bold tracking-tight">
                                                    {userData.name}
                                                </h1>
                                                {userData.isVerified && (
                                                    <Badge
                                                        variant="secondary"
                                                        className="gap-1"
                                                    >
                                                        <Star className="h-3 w-3" />
                                                        Verified
                                                    </Badge>
                                                )}
                                            </div>
                                            <p className="text-lg text-muted-foreground">
                                                @{userData.username}
                                            </p>
                                        </div>

                                        <p className="max-w-2xl text-foreground leading-relaxed">
                                            {userData.bio}
                                        </p>

                                        <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                                            <div className="flex items-center gap-2">
                                                <MapPin className="h-4 w-4" />
                                                <span>{userData.location}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Calendar className="h-4 w-4" />
                                                <span>
                                                    Joined{" "}
                                                    {new Date(
                                                        userData.joinDate
                                                    ).toLocaleDateString(
                                                        "en-US",
                                                        {
                                                            month: "long",
                                                            year: "numeric",
                                                        }
                                                    )}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <LinkIcon className="h-4 w-4" />
                                                <a
                                                    href={userData.website}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-1 text-primary hover:underline"
                                                >
                                                    {userData.website.replace(
                                                        "https://",
                                                        ""
                                                    )}
                                                    <ExternalLink className="h-3 w-3" />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex items-center gap-3">
                                    {isOwnProfile ? (
                                        <>
                                            <Button className="gap-2 text-xs">
                                                <Edit className="h-4 w-4" />
                                                Edit Profile
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="icon"
                                            >
                                                <Settings className="h-4 w-4" />
                                            </Button>
                                        </>
                                    ) : (
                                        <>
                                            <Button className="gap-2">
                                                <Users className="h-4 w-4" />
                                                Follow
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="icon"
                                            >
                                                <MessageSquare className="h-4 w-4" />
                                            </Button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
                        {[
                            {
                                label: "Projects",
                                value: userData.stats.projects,
                                icon: Code,
                                color: "text-blue-500",
                            },
                            {
                                label: "Followers",
                                value: userData.stats.followers,
                                icon: Users,
                                color: "text-green-500",
                            },
                            {
                                label: "Following",
                                value: userData.stats.following,
                                icon: Users,
                                color: "text-orange-500",
                            },
                            {
                                label: "Stars",
                                value: userData.stats.stars,
                                icon: Star,
                                color: "text-yellow-500",
                            },
                            {
                                label: "Views",
                                value: userData.stats.views,
                                icon: Eye,
                                color: "text-purple-500",
                            },
                            {
                                label: "Likes",
                                value: userData.stats.likes,
                                icon: Heart,
                                color: "text-red-500",
                            },
                        ].map((stat, idx) => (
                            <Card
                                key={idx}
                                className="border-0 bg-card/50 backdrop-blur-sm transition-all hover:bg-card/80"
                            >
                                <CardContent className="p-6 text-center">
                                    <stat.icon
                                        className={cn(
                                            "mx-auto mb-3 h-5 w-5",
                                            stat.color
                                        )}
                                    />
                                    <div className="text-base font-bold">
                                        {stat.value.toLocaleString()}
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                        {stat.label}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Main Content Tabs */}
                    <Card className="border-0 bg-card/50 backdrop-blur-sm">
                        <Tabs
                            value={activeTab}
                            onValueChange={setActiveTab}
                            className="w-full"
                        >
                            <div className="border-b">
                                <TabsList className="h-auto w-full justify-start rounded-none border-0 bg-transparent p-0">
                                    {[
                                        {
                                            value: "overview",
                                            label: "Overview",
                                        },
                                        {
                                            value: "projects",
                                            label: "Projects",
                                        },
                                        {
                                            value: "activity",
                                            label: "Activity",
                                        },
                                        {
                                            value: "achievements",
                                            label: "Achievements",
                                        },
                                    ].map(tab => (
                                        <TabsTrigger
                                            key={tab.value}
                                            value={tab.value}
                                            className="rounded-none border-b-2 border-transparent bg-transparent px-6 py-4 data-[state=active]:border-primary data-[state=active]:bg-transparent"
                                        >
                                            {tab.label}
                                        </TabsTrigger>
                                    ))}
                                </TabsList>
                            </div>

                            <div className="p-6 sm:p-8">
                                <TabsContent
                                    value="overview"
                                    className="mt-0 space-y-8"
                                >
                                    {/* Skills Section */}
                                    <div className="space-y-4">
                                        <h3 className="flex items-center gap-2 text-md font-semibold">
                                            <Code className="h-5 w-5 text-primary" />
                                            Skills & Technologies
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                            {userData.skills.map((skill, i) => (
                                                <Badge
                                                    key={i}
                                                    variant="secondary"
                                                    className="px-3 py-1 text-xs font-medium"
                                                >
                                                    {skill}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                </TabsContent>

                                <TabsContent value="projects" className="mt-0">
                                    <div className="flex flex-col items-center justify-center py-12 text-center">
                                        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                                            <Code className="h-8 w-8 text-primary" />
                                        </div>
                                        <h3 className="mb-2 text-xl font-semibold">
                                            Your Projects
                                        </h3>
                                        <p className="mb-6 max-w-sm text-muted-foreground">
                                            View and manage all your created
                                            projects
                                        </p>
                                        <Button asChild>
                                            <Link href="/dashboard/projects">
                                                View All Projects
                                            </Link>
                                        </Button>
                                    </div>
                                </TabsContent>

                                <TabsContent value="activity" className="mt-0">
                                    <div className="space-y-4">
                                        <h3 className="flex items-center gap-2 text-xl font-semibold">
                                            <Clock className="h-5 w-5 text-primary" />
                                            Recent Activity
                                        </h3>
                                        <div className="space-y-3">
                                            {userData.recentActivity.map(
                                                activity => (
                                                    <div
                                                        key={activity.id}
                                                        className="flex items-start gap-4 rounded-lg border bg-card/30 p-4 transition-colors hover:bg-card/50"
                                                    >
                                                        <div className="mt-0.5">
                                                            {activity.type ===
                                                                "project" && (
                                                                <Code className="h-4 w-4 text-blue-500" />
                                                            )}
                                                            {activity.type ===
                                                                "star" && (
                                                                <Star className="h-4 w-4 text-yellow-500" />
                                                            )}
                                                            {activity.type ===
                                                                "follow" && (
                                                                <Users className="h-4 w-4 text-green-500" />
                                                            )}
                                                            {activity.type ===
                                                                "comment" && (
                                                                <MessageSquare className="h-4 w-4 text-purple-500" />
                                                            )}
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <p className="font-medium text-sm">
                                                                {activity.title}
                                                            </p>
                                                            <p className="text-sm text-muted-foreground">
                                                                {activity.time}
                                                            </p>
                                                        </div>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </div>
                                </TabsContent>

                                <TabsContent
                                    value="achievements"
                                    className="mt-0"
                                >
                                    <div className="space-y-6">
                                        <h3 className="flex items-center gap-2 text-xl font-semibold">
                                            <Trophy className="h-5 w-5 text-primary" />
                                            Achievements
                                        </h3>
                                        <div className="grid gap-6 sm:grid-cols-2 text-sm">
                                            {userData.achievements.map(
                                                achievement => (
                                                    <div
                                                        key={achievement.id}
                                                        className="flex items-start gap-4 rounded-lg border bg-card/30 p-6 transition-colors hover:bg-card/50"
                                                    >
                                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                                                            <achievement.icon className="h-5 w-5 text-primary" />
                                                        </div>
                                                        <div className="flex-1">
                                                            <h4 className="font-semibold">
                                                                {
                                                                    achievement.title
                                                                }
                                                            </h4>
                                                            <p className="mt-1 text-sm text-muted-foreground">
                                                                {
                                                                    achievement.description
                                                                }
                                                            </p>
                                                        </div>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </div>
                                </TabsContent>
                            </div>
                        </Tabs>
                    </Card>
                </div>
            </PageContent>
        </div>
    );
}
