"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { useSession } from "@/config/auth/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, Send, Users } from "lucide-react";
import { timeAgo } from "@/utils/timeAgo";
import { useFetchThread } from "@/hooks/queries/useThreadQuery";
import { useCommentsQuery, useCommentsMuation } from "@/hooks/queries/useCommentQuery";
import { Comment } from "@/types/comment";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet";
import { ChatItem } from "@/features/threads/components/chat-item";
import { MembersPanel } from "@/features/threads/components/members-panel";
import { EmptyState } from "@/features/threads/components/empty-state";
import { Member } from "@/types/member";

const ThreadPage = () => {
    const { id } = useParams<{ id: string }>();
    const { data: session } = useSession();
    const meEmail = session?.user?.email;
    const meAvatar = session?.user?.image || "";

    const { data: thread, isPending, isError } = useFetchThread(id);
    const { data: comments = [] } = useCommentsQuery(id);
    const { mutate: createComment } = useCommentsMuation();

    const [newComment, setNewComment] = useState("");
    const listRef = useRef<HTMLDivElement>(null);

    const members: Member[] = useMemo(() => {
        const raw = Array.isArray(thread?.members) ? thread?.members : [];
        return raw.map((m: any) =>
            typeof m === "string"
                ? { email: m, name: m.split("@")[0], role: "member" }
                : {
                      email: m.email ?? m,
                      name: m.name ?? String(m.email || "").split("@"),
                      avatar: m.avatar ?? "",
                      role: m.role ?? "member",
                      joinedAt: m.joinedAt,
                  }
        );
    }, [thread?.members]);

    const sortedAsc: Comment[] = useMemo(() => {
        const list = [...comments];
        return list.sort((a, b) => +new Date(a.createdAt) - +new Date(b.createdAt));
    }, [comments]);

    useEffect(() => {
        const el = listRef.current;
        if (!el) return;
        const id = requestAnimationFrame(() => {
            el.scrollTop = el.scrollHeight;
        });
        return () => cancelAnimationFrame(id);
    }, [sortedAsc.length]);

    const handlePost = () => {
        const content = newComment.trim();
        if (!content) return;
        createComment({ content, threadId: id });
        setNewComment("");
    };

    if (isPending) return <Skeleton className="h-40" />;
    if (isError) return <div>Error</div>;

    return (
        <div className="flex h-full min-h-[70vh] flex-col rounded-xl border bg-background/60">
            {/* Header */}
            <div className="flex items-center justify-between gap-3 p-4 border-b">
                <div className="min-w-0">
                    <div className="flex items-center gap-2 min-w-0">
                        <MessageSquare className="h-5 w-5 shrink-0" />
                        <h2 className="text-base sm:text-lg font-semibold tracking-tight truncate">{thread.title}</h2>
                        <Badge variant="secondary" className="rounded-full">
                            {comments?.length} messages
                        </Badge>
                    </div>
                    {thread.description && (
                        <p className="mt-1 text-xs sm:text-sm text-muted-foreground line-clamp-2">
                            {thread.description}
                        </p>
                    )}
                </div>

                {/* Members slide-over */}
                <Sheet>
                    <SheetTrigger asChild>
                        <Button size="sm" variant="outline" className="gap-2">
                            <Users className="h-4 w-4" />
                            Members
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-full sm:max-w-sm">
                        <SheetHeader>
                            <SheetTitle className="text-sm font-semibold flex items-center gap-2">
                                <Users className="h-4 w-4" />
                                Members
                            </SheetTitle>
                        </SheetHeader>
                        <div className="mt-3 space-y-3">
                            <MembersPanel members={members} />
                            <SheetClose asChild>
                                <Button className="w-full" variant="secondary">
                                    Close
                                </Button>
                            </SheetClose>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>

            {/* Messages */}
            <div ref={listRef} className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
                {sortedAsc.length === 0 ? (
                    <EmptyState />
                ) : (
                    sortedAsc.map(c => {
                        const isMe =
                            typeof c.author === "string" ? c.author === meEmail : c.author === session?.user?.name;
                        return (
                            <ChatItem
                                key={c._id}
                                me={isMe}
                                avatar={c.authorAvatar}
                                author={c.author}
                                timestamp={timeAgo(c.createdAt.toString())}
                                content={c.content}
                            />
                        );
                    })
                )}
            </div>

            {/* Composer */}
            <div className="sticky bottom-0 border-t bg-background p-3">
                <Card className="p-3">
                    <div className="flex items-start gap-3">
                        <img
                            src={meAvatar || "/assets/logo.png"}
                            alt="you"
                            className="h-8 w-8 rounded-full object-cover"
                        />
                        <div className="flex-1">
                            <Textarea
                                placeholder="Write a message…"
                                value={newComment}
                                onChange={e => setNewComment(e.target.value)}
                                className="min-h-[56px] resize-none text-sm"
                            />
                            <div className="mt-2 flex items-center justify-between">
                                <span className="text-[11px] text-muted-foreground">
                                    Markdown supported • Be respectful
                                </span>
                                <div className="flex gap-2">
                                    <Button
                                        onClick={() => setNewComment("")}
                                        variant="ghost"
                                        size="sm"
                                        className="text-xs"
                                    >
                                        Cancel
                                    </Button>
                                    <Button onClick={handlePost} className="gap-2 rounded-lg text-xs" size="sm">
                                        <Send className="h-4 w-4" /> Send
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default ThreadPage;
