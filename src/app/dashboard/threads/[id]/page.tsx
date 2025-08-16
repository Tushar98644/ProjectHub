"use client";

import React, { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
    MessageSquare,
    Send,
    Sparkles,
    SlidersHorizontal,
    Heart,
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

const MOCK_COMMENTS = [
    {
        id: "c1",
        author: "Jane Doe",
        avatar: "https://i.pravatar.cc/64?img=10",
        content:
            "This project looks amazing! I tried the demo and noticed a tiny FPS hiccup on level 3 — happy to help profile it.",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
        likes: 3,
        likedByMe: false,
    },
    {
        id: "c2",
        author: "Alex Park",
        avatar: "https://i.pravatar.cc/64?img=12",
        content:
            "Would love to see an option to change controls. Also — add a toggle for retro pixel shaders?",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
        likes: 7,
        likedByMe: true,
    },
    {
        id: "c3",
        author: "Samira",
        avatar: "https://i.pravatar.cc/64?img=18",
        content: "Is there a roadmap for multiplayer?",
        createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
        likes: 1,
        likedByMe: false,
    },
];

type Comment = (typeof MOCK_COMMENTS)[number];

function timeAgo(iso: string) {
    const diff = Date.now() - new Date(iso).getTime();
    const s = Math.floor(diff / 1000);
    if (s < 60) return `${s}s`;
    const m = Math.floor(s / 60);
    if (m < 60) return `${m}m`;
    const h = Math.floor(m / 60);
    if (h < 24) return `${h}h`;
    const d = Math.floor(h / 24);
    return `${d}d`;
}

const ThreadPage = () => {
    const [comments, setComments] = useState<Comment[]>(MOCK_COMMENTS);
    const [isLoading] = useState(false);
    const [sort, setSort] = useState<"recent" | "likes">("recent");
    const [newComment, setNewComment] = useState("");

    const sortedComments = useMemo(() => {
        return [...comments].sort((a, b) => {
            if (sort === "likes") return (b.likes || 0) - (a.likes || 0);
            return (
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            );
        });
    }, [comments, sort]);

    const handlePost = () => {
        const text = newComment.trim();
        if (!text) return;
        const c: Comment = {
            id: `c_${Date.now()}`,
            author: "You",
            avatar: `https://i.pravatar.cc/64?u=${Date.now()}`,
            content: text,
            createdAt: new Date().toISOString(),
            likes: 0,
            likedByMe: false,
        };
        setComments(prev => [c, ...prev]);
        setNewComment("");
    };

    const projectTitle = "Project 1";

    const toggleLike = (id: string) => {
        setComments(prev =>
            prev.map(c =>
                c.id === id
                    ? {
                          ...c,
                          likedByMe: !c.likedByMe,
                          likes: c.likedByMe
                              ? Math.max((c.likes || 1) - 1, 0)
                              : (c.likes || 0) + 1,
                      }
                    : c
            )
        );
    };

    const reset = () => {
        setComments(MOCK_COMMENTS);
        setNewComment("");
        setSort("recent");
    };

    return (
        <div className="flex flex-col gap-5 h-full">
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold tracking-tight flex items-center gap-2">
                        <MessageSquare className="h-5 w-5" /> {projectTitle} —
                        Discussion
                    </h2>
                    <Badge variant="secondary" className="rounded-full">
                        {comments.length} comments
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
                                <SlidersHorizontal className="h-4 w-4" /> Sort
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40">
                            <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => setSort("recent")}>
                                Most recent
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setSort("likes")}>
                                Most liked
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <Button
                        size="sm"
                        variant="ghost"
                        onClick={reset}
                        className="hidden md:inline"
                    >
                        Reset
                    </Button>
                </div>
            </div>

            {/* New Comment Box */}
            <Card className="rounded-xl p-4 flex flex-col gap-3">
                <div className="flex gap-3">
                    <img
                        src={`https://i.pravatar.cc/48?u=you`}
                        alt="you"
                        className="h-10 w-10 rounded-full object-cover"
                    />
                    <Textarea
                        placeholder="Share your thoughts — be respectful and constructive"
                        value={newComment}
                        onChange={e => setNewComment(e.target.value)}
                        className="min-h-[72px] resize-none"
                    />
                </div>

                <div className="flex items-center justify-between">
                    <div className="text-xs text-muted-foreground">
                        Markdown supported • Keep replies on-topic
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            onClick={() => setNewComment("")}
                            variant="ghost"
                            size="sm"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handlePost}
                            className="gap-2 rounded-lg"
                        >
                            <Send className="h-4 w-4" /> Post Comment
                        </Button>
                    </div>
                </div>
            </Card>

            <Separator />

            <div id="comments-section" className="overflow-y-auto pb-24">
                {isLoading ? (
                    <SkeletonList />
                ) : sortedComments.length === 0 ? (
                    <EmptyState onReset={reset} />
                ) : (
                    <div className="flex flex-col gap-3">
                        {sortedComments.map(c => (
                            <Card key={c.id} className="rounded-xl p-4">
                                <div className="flex gap-3">
                                    <img
                                        src={c.avatar}
                                        alt={c.author}
                                        className="h-10 w-10 rounded-full object-cover"
                                    />
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <span className="font-semibold">
                                                    {c.author}
                                                </span>
                                                <span className="text-xs text-muted-foreground">
                                                    • {timeAgo(c.createdAt)}
                                                </span>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() =>
                                                        toggleLike(c.id)
                                                    }
                                                    className="flex items-center gap-1 text-sm"
                                                    aria-label="like"
                                                >
                                                    <Heart
                                                        className={`h-4 w-4 ${c.likedByMe ? "text-red-500" : ""}`}
                                                    />
                                                    <span className="text-xs">
                                                        {c.likes}
                                                    </span>
                                                </button>
                                            </div>
                                        </div>

                                        <p className="mt-2 text-sm whitespace-pre-wrap">
                                            {c.content}
                                        </p>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ThreadPage;

const SkeletonList = () => (
    <div className="space-y-3">
        {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="rounded-xl p-4 flex gap-3">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-1/3" />
                    <Skeleton className="h-4 w-full" />
                </div>
            </Card>
        ))}
    </div>
);

const EmptyState = ({ onReset }: { onReset: () => void }) => (
    <Card className="rounded-2xl border bg-background/60 p-8 text-center">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl border">
            <Sparkles className="h-6 w-6" />
        </div>
        <h3 className="text-lg font-semibold">No comments yet</h3>
        <p className="mt-1 text-sm text-muted-foreground">
            Be the first to start the conversation.
        </p>
        <div className="mt-4 flex justify-center gap-2">
            <Button
                variant="secondary"
                onClick={onReset}
                className="rounded-xl"
            >
                Reset mock data
            </Button>
        </div>
    </Card>
);
