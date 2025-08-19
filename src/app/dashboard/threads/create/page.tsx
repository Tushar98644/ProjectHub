"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Sparkles, Eye, Tag as TagIcon } from "lucide-react";
import { useFetchProjects } from "@/hooks/queries/useProjectQuery";
import { useCreateThread } from "@/hooks/queries/useThreadQuery";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

const CreateThreadPage = () => {
    const router = useRouter();
    const { data: projects = [] } = useFetchProjects();
    const { mutate: createThread, isPending } = useCreateThread();

    const [projectId, setProjectID] = useState("");
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
        if (t.length) setTags(prev => Array.from(new Set([...prev, ...t])));
    };

    const handleTagKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (["Enter", ","].includes(e.key)) {
            e.preventDefault();
            addTag(tagInput);
            setTagInput("");
        } else if (e.key === "Backspace" && !tagInput) {
            setTags(prev => prev.slice(0, -1));
        }
    };

    const reset = () => {
        setTitle("");
        setDescription("");
        setTags([]);
        setTagInput("");
        setError("");
    };

    const handleSubmit = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!title.trim()) return setError("Title is required");
        if (!description.trim()) return setError("Please add the first message for this discussion");

        createThread(
            { projectId, title, description, tags },
            {
                onSuccess: () => {
                    reset();
                    router.push("/dashboard/threads");
                },
            }
        );
    };

    return (
        <div className="max-w-6xl mx-auto py-2 pb-8 px-0 md:px-4 h-full overflow-y-auto">
            <div className="flex flex-col md:flex-row items-start gap-6">
                <div className="flex-1">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="rounded-lg bg-muted/20 p-3">
                            <Sparkles className="h-6 w-6" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-semibold">Create a discussion</h1>
                            <p className="text-sm text-muted-foreground">
                                Start a focused thread to ask questions, request feedback, or report issues.
                            </p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <Card className="p-5">
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
                                <div className="md:col-span-7 space-y-4">
                                    {projects?.length > 0 && (
                                        <>
                                            <label className="text-sm font-medium mx-2">Project</label>
                                            <Select>
                                                <SelectTrigger className="w-[180px]">
                                                    <SelectValue placeholder="Select a Project" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {projects.map(p => (
                                                        <SelectItem key={p._id} value={p._id as string}>
                                                            {p.title}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </>
                                    )}

                                    <Input
                                        value={title}
                                        onChange={e => setTitle(e.target.value)}
                                        placeholder="Short, descriptive title"
                                        aria-label="Title"
                                    />

                                    <Textarea
                                        value={description}
                                        onChange={e => setDescription(e.target.value)}
                                        className="min-h-[180px]"
                                        placeholder="Write the first message of the discussion. Markdown supported."
                                        aria-label="Description"
                                    />

                                    <div className="flex items-center justify-between gap-4">
                                        <div className="w-3/4">
                                            <label className="text-sm font-medium">Tags</label>
                                            <div className="mt-2 flex items-center gap-2 flex-wrap">
                                                {tags.map(t => (
                                                    <button
                                                        key={t}
                                                        type="button"
                                                        onClick={() => setTags(x => x.filter(tag => tag !== t))}
                                                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-sm"
                                                    >
                                                        <TagIcon className="h-4 w-4" /> {t}
                                                    </button>
                                                ))}
                                                <input
                                                    value={tagInput}
                                                    onChange={e => setTagInput(e.target.value)}
                                                    onKeyDown={handleTagKey}
                                                    placeholder="press Enter or comma to add"
                                                    className="flex-1 min-w-[120px] rounded-md border px-3 py-2 bg-background"
                                                />
                                            </div>
                                        </div>

                                        <div className="text-sm text-muted-foreground text-right">
                                            <div>{title.length} / 120</div>
                                            <div className="mt-1">{description.length} chars</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="md:col-span-5">
                                    <div className="md:sticky md:top-6 space-y-4">
                                        {showPreview && (
                                            <div className="rounded-md border p-4">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2">
                                                        <Eye className="h-4 w-4" />
                                                        <span className="text-sm font-medium">Preview</span>
                                                    </div>
                                                    <span className="text-xs text-muted-foreground">Live</span>
                                                </div>
                                                <div className="mt-4 bg-background rounded-lg p-3">
                                                    <div className="flex items-center justify-between gap-3">
                                                        <h3 className="text-sm font-semibold truncate">
                                                            {title || "Untitled discussion"}
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
                                        )}

                                        <div className="rounded-md border p-4">
                                            <div className="text-sm font-medium mb-2">Guidelines</div>
                                            <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
                                                <li>Be respectful and stay on-topic.</li>
                                                <li>Use clear titles and include reproduction steps for bugs.</li>
                                                <li>
                                                    Mention relevant users using @username (notifications are simulated
                                                    in mock).
                                                </li>
                                            </ul>
                                        </div>

                                        <div className="rounded-md border p-4 text-sm text-muted-foreground">
                                            <div className="mb-2">Drafts auto-saved</div>
                                            <div className="flex gap-2">
                                                <Button variant="ghost" size="sm" onClick={reset}>
                                                    Clear draft
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => setShowPreview(prev => !prev)}
                                                >
                                                    {showPreview ? "Hide" : "Show"} preview
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        {error && <div className="text-sm text-destructive">{error}</div>}

                        <div className="flex md:flex-row flex-col gap-6 items-center justify-between">
                            <div className="text-sm text-muted-foreground">
                                By creating a discussion you agree to follow the community guidelines.
                            </div>
                            <div className="flex gap-2">
                                <Button variant="ghost" onClick={() => router.back()}>
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={isPending} className="gap-2">
                                    {isPending ? "Creating..." : "Create discussion"}
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
