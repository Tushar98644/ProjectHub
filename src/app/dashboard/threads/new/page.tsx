"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Sparkles } from "lucide-react";

// Mock projects (pick one when creating thread)
const MOCK_PROJECTS = [
    { id: "p1", title: "ReZero" },
    { id: "p2", title: "Pixel Quest" },
    { id: "p3", title: "Ribo-Replicator" },
];

// Utility: read/write mock threads to localStorage (so new thread persists across pages)
const LS_KEY = "mock_threads_v1";
function readMockThreads() {
    try {
        const raw = localStorage.getItem(LS_KEY);
        if (!raw) return [];
        return JSON.parse(raw);
    } catch (e) {
        return [];
    }
}
function writeMockThreads(arr: any[]) {
    try {
        localStorage.setItem(LS_KEY, JSON.stringify(arr));
    } catch (e) {
        // ignore
    }
}

const NewDiscussionPage = () => {
    const router = useRouter();
    const [project, setProject] = useState(MOCK_PROJECTS[0].id);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [tags, setTags] = useState("");
    const [pinned, setPinned] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const reset = () => {
        setTitle("");
        setContent("");
        setTags("");
        setPinned(false);
        setError("");
    };

    const handleSubmit = (e?: React.FormEvent) => {
        e?.preventDefault();
        setError("");
        if (!title.trim()) return setError("Title is required");
        if (!content.trim())
            return setError("Please add the first message for this discussion");

        setLoading(true);

        // create thread object
        const threadId = `t_${Date.now()}`;
        const thread = {
            id: threadId,
            project: project,
            projectTitle:
                MOCK_PROJECTS.find(p => p.id === project)?.title || "Unknown",
            title: title.trim(),
            excerpt: content.trim().slice(0, 220),
            author: "You",
            commentsCount: 1,
            likes: 0,
            pinned: pinned,
            tags: tags
                .split(",")
                .map(t => t.trim())
                .filter(Boolean),
            lastUpdated: new Date().toISOString(),
        };

        // persist into localStorage mock store (prepend)
        try {
            const existing = readMockThreads();
            writeMockThreads([thread, ...existing]);
        } catch (e) {
            /* ignore */
        }

        // small delay to show loading state
        setTimeout(() => {
            setLoading(false);
            reset();
            // navigate to the (mock) discussion route used by the PopularThreads mock
            router.push(
                `/dashboard/projects/${project}/discussion/${threadId}`
            );
        }, 600);
    };

    return (
        <div className="max-w-3xl mx-auto py-8">
            <div className="flex items-center gap-4 mb-6">
                <div className="rounded-md bg-muted/20 p-2">
                    <Sparkles className="h-5 w-5" />
                </div>
                <div>
                    <h1 className="text-2xl font-semibold">
                        Start a new discussion
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Create a thread to discuss ideas, report bugs, or ask
                        for feedback.
                    </p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <Card className="p-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
                        <label className="text-sm text-muted-foreground">
                            Project
                        </label>
                        <select
                            value={project}
                            onChange={e => setProject(e.target.value)}
                            className="md:col-span-2 w-full rounded-md border px-3 py-2 bg-background"
                        >
                            {MOCK_PROJECTS.map(p => (
                                <option key={p.id} value={p.id}>
                                    {p.title}
                                </option>
                            ))}
                        </select>

                        <label className="text-sm text-muted-foreground">
                            Title
                        </label>
                        <input
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            placeholder="Short, descriptive title"
                            className="md:col-span-2 w-full rounded-md border px-3 py-2 bg-background"
                        />

                        <label className="text-sm text-muted-foreground">
                            Tags
                        </label>
                        <input
                            value={tags}
                            onChange={e => setTags(e.target.value)}
                            placeholder="comma,separated,tags"
                            className="md:col-span-2 w-full rounded-md border px-3 py-2 bg-background"
                        />

                        <label className="text-sm text-muted-foreground">
                            Pin thread
                        </label>
                        <div className="md:col-span-2">
                            <label className="inline-flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={pinned}
                                    onChange={e => setPinned(e.target.checked)}
                                    className="h-4 w-4"
                                />
                                <span className="text-sm">
                                    Keep this thread at the top of the project's
                                    discussions
                                </span>
                            </label>
                        </div>

                        <label className="text-sm text-muted-foreground">
                            First message
                        </label>
                        <div className="md:col-span-2">
                            <Textarea
                                value={content}
                                onChange={e => setContent(e.target.value)}
                                className="min-h-[140px]"
                                placeholder="Write the first message of the discussion. Markdown is allowed."
                            />
                        </div>
                    </div>
                </Card>

                {error && (
                    <div className="text-sm text-destructive">{error}</div>
                )}

                <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                        Be respectful. Follow the community guidelines.
                    </div>
                    <div className="flex gap-2">
                        <Button variant="ghost" onClick={() => router.back()}>
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={loading}
                            className="gap-2"
                        >
                            {loading ? "Creating..." : "Create discussion"}
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default NewDiscussionPage;
