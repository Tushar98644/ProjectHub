"use client";

import React, { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Sparkles, Eye, Tag as TagIcon } from "lucide-react";
import { useFetchProjects } from "@/hooks/queries/useProjectQuery";
import { useCreateThread } from "@/hooks/queries/useThreadQuery";

const CreateThreadPage = () => {
    const router = useRouter();

    const { data: projects } = useFetchProjects();
    const { mutate: createThread, isPending } = useCreateThread();

    const [projectId, setProjectID] = useState<string>("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [tagInput, setTagInput] = useState("");
    const [tags, setTags] = useState<string[]>([]);
    const [error, setError] = useState("");
    const [showPreview, setShowPreview] = useState(true);

    const addTag = (raw: string) => {
        const t = raw
            .split(",")
            .map(s => s.trim())
            .filter(Boolean);
        if (!t.length) return;
        setTags(prev => Array.from(new Set([...prev, ...t])));
    };

    const handleTagKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            addTag(tagInput);
            setTagInput("");
        }
        if (e.key === "Backspace" && !tagInput) {
            setTags(prev => prev.slice(0, -1));
        }
    };

    const removeTag = (t: string) => setTags(prev => prev.filter(x => x !== t));

    const reset = () => {
        setTitle("");
        setDescription("");
        setTags([]);
        setTagInput("");
        setError("");
    };

    const handleSubmit = (e?: React.FormEvent) => {
        e?.preventDefault();
        setError("");

        if (!title.trim()) return setError("Title is required");
        if (!description.trim())
            return setError("Please add the first message for this discussion");

        const data = { projectId, title, description, tags };
        createThread(data, {
            onSuccess: () => {
                reset();
                router.push("/dashboard/threads");
            },
        });
    };

    return (
        <div className="max-w-6xl mx-auto py-8 px-4 h-full">
            <div className="flex items-start gap-6">
                <div className="flex-1">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="rounded-lg bg-muted/20 p-3">
                            <Sparkles className="h-6 w-6" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-semibold">
                                Create a discussion
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                Start a focused thread to ask questions, request
                                feedback, or report issues.
                            </p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <Card className="p-5">
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
                                <div className="md:col-span-7 space-y-4">
                                    <label className="text-sm font-medium">
                                        Project
                                    </label>
                                    {projects?.length &&
                                        projects?.length > 0 && (
                                            <div className="flex items-center gap-3">
                                                <select
                                                    value={projectId}
                                                    onChange={e =>
                                                        setProjectID(
                                                            e.target.value
                                                        )
                                                    }
                                                    className="rounded-md border px-3 py-2 bg-background"
                                                >
                                                    {projects?.map(p => (
                                                        <option
                                                            key={p._id}
                                                            value={p._id}
                                                        >
                                                            {p.title}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        )}

                                    <label className="text-sm font-medium">
                                        Title
                                    </label>
                                    <Input
                                        value={title}
                                        onChange={e => setTitle(e.target.value)}
                                        placeholder="Short, descriptive title"
                                    />

                                    <label className="text-sm font-medium">
                                        Short Description
                                    </label>
                                    <Textarea
                                        value={description}
                                        onChange={e =>
                                            setDescription(e.target.value)
                                        }
                                        className="min-h-[180px]"
                                        placeholder="Write the first message of the discussion. Markdown supported."
                                    />

                                    <div className="flex items-center justify-between gap-4">
                                        <div className="w-3/4">
                                            <label className="text-sm font-medium">
                                                Tags
                                            </label>
                                            <div className="mt-2 flex items-center gap-2 flex-wrap">
                                                {tags.map(t => (
                                                    <button
                                                        key={t}
                                                        type="button"
                                                        onClick={() =>
                                                            removeTag(t)
                                                        }
                                                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-sm"
                                                    >
                                                        <TagIcon className="h-4 w-4" />{" "}
                                                        {t}
                                                    </button>
                                                ))}

                                                <input
                                                    value={tagInput}
                                                    onChange={e =>
                                                        setTagInput(
                                                            e.target.value
                                                        )
                                                    }
                                                    onKeyDown={handleTagKey}
                                                    placeholder="press Enter or comma to add"
                                                    className="flex-1 min-w-[120px] rounded-md border px-3 py-2 bg-background"
                                                />
                                            </div>
                                        </div>

                                        <div className="text-sm text-muted-foreground text-right">
                                            <div>{title.length} / 120</div>
                                            <div className="mt-1">
                                                {description.length} chars
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="md:col-span-5">
                                    <div className="sticky top-6 space-y-4">
                                        <div className="rounded-md border p-4">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <Eye className="h-4 w-4" />
                                                    <div className="text-sm font-medium">
                                                        Preview
                                                    </div>
                                                </div>

                                                <div className="text-xs text-muted-foreground">
                                                    Live
                                                </div>
                                            </div>

                                            <div className="mt-4">
                                                <div className="bg-background rounded-lg p-3">
                                                    <div className="flex items-center justify-between gap-3">
                                                        <h3 className="text-sm font-semibold truncate">
                                                            {title ||
                                                                "Untitled discussion"}
                                                        </h3>
                                                        <div className="text-xs text-muted-foreground">
                                                            {tags.join(", ")}
                                                        </div>
                                                    </div>
                                                    <p className="mt-2 text-sm text-muted-foreground line-clamp-4">
                                                        {description ||
                                                            "Preview of your first message will appear here..."}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="rounded-md border p-4">
                                            <div className="text-sm font-medium mb-2">
                                                Guidelines
                                            </div>
                                            <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
                                                <li>
                                                    Be respectful and stay
                                                    on-topic.
                                                </li>
                                                <li>
                                                    Use clear titles and include
                                                    reproduction steps for bugs.
                                                </li>
                                                <li>
                                                    Mention relevant users using
                                                    @username (notifications are
                                                    simulated in mock).
                                                </li>
                                            </ul>
                                        </div>

                                        <div className="rounded-md border p-4 text-sm text-muted-foreground">
                                            <div className="mb-2">
                                                Drafts auto-saved
                                            </div>
                                            <div className="flex gap-2">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => {
                                                        reset();
                                                    }}
                                                >
                                                    Clear draft
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => {
                                                        setShowPreview(
                                                            prev => !prev
                                                        );
                                                    }}
                                                >
                                                    {showPreview
                                                        ? "Hide"
                                                        : "Show"}{" "}
                                                    preview
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        {error && (
                            <div className="text-sm text-destructive">
                                {error}
                            </div>
                        )}

                        <div className="flex items-center justify-between">
                            <div className="text-sm text-muted-foreground">
                                By creating a discussion you agree to follow the
                                community guidelines.
                            </div>
                            <div className="flex gap-2">
                                <Button
                                    variant="ghost"
                                    onClick={() => router.back()}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    onClick={handleSubmit}
                                    disabled={isPending}
                                    className="gap-2"
                                >
                                    {isPending
                                        ? "Creating..."
                                        : "Create discussion"}
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateThreadPage;
