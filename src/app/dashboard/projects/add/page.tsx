"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/navbar/navbar";
import PageContent from "@/components/layout/navbar/page-content";
import {
    PageNavbarLeftContent,
    PageNavbarRightContent,
} from "@/components/layout/navbar/page-navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import {
    ArrowLeft,
    Plus,
    Camera,
    Github,
    Link2,
    Tags as TagsIcon,
    Sparkles,
    Loader2,
} from "lucide-react";

const STATUS_BADGES = {
    active: {
        label: "Active",
        badgeClass:
            "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/15 dark:text-emerald-400 dark:border-emerald-800",
    },
    "in-progress": {
        label: "In Progress",
        badgeClass:
            "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/15 dark:text-amber-400 dark:border-amber-800",
    },
    completed: {
        label: "Completed",
        badgeClass:
            "bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-900/15 dark:text-sky-400 dark:border-sky-800",
    },
};

export default function AddProjectPage() {
    const router = useRouter();
    const form = useForm({
        defaultValues: {
            title: "",
            description: "",
            status: "active",
            image: "",
            github: "",
            liveUrl: "",
            tags: [],
            techStack: [],
        },
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [tagInput, setTagInput] = useState("");
    const [techInput, setTechInput] = useState("");
    const [imgOk, setImgOk] = useState(true);
    const values = form.watch();

    const onSubmit = async (v: any) => {
        setIsSubmitting(true);
        setTimeout(() => {
            console.log("Create Project Payload", {
                title: v.title,
                description: v.description,
                tags: v.tags,
                status: v.status,
                image: v.image,
                github: v.github,
                liveUrl: v.liveUrl,
                techStack: v.techStack,
            });
            setIsSubmitting(false);
            router.push("/dashboard/projects");
        }, 1200);
    };

    const pushUnique = (list: string[], entry: string) => {
        const val = entry.trim();
        return !val || list.includes(val) ? list : [...list, val];
    };

    const handleAddTag = () => {
        //@ts-ignore
        form.setValue("tags", pushUnique(values.tags, tagInput));
        setTagInput("");
    };
    const handleAddTech = () => {
        //@ts-ignore
        form.setValue("techStack", pushUnique(values.techStack, techInput));
        setTechInput("");
    };

    const handleKey = (
        e: React.KeyboardEvent<HTMLInputElement>,
        type: "tag" | "tech"
    ) => {
        if (e.key === "Enter") {
            e.preventDefault();
            type === "tag" ? handleAddTag() : handleAddTech();
        }
    };
    const removeFrom = (key: "tags" | "techStack", val: string) => {
        form.setValue(
            key,
            values[key].filter(x => x !== val)
        );
    };

    useEffect(() => {
        if (!values.image) {
            setImgOk(true);
            return;
        }
        const i = new Image();
        i.onload = () => setImgOk(true);
        i.onerror = () => setImgOk(false);
        i.src = values.image;
    }, [values.image]);

    const FormFieldWrapper = ({
        name,
        label,
        children,
        required = false,
    }: any) => (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>
                        {label} {required && "*"}
                    </FormLabel>
                    <FormControl>{children(field)}</FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );

    return (
        <div className="min-h-screen bg-gradient-to-b from-background via-background to-background">
            <div className="pointer-events-none fixed inset-0 -z-10">
                <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-violet-500/20 via-transparent to-transparent blur-2xl" />
                <div className="absolute left-1/2 top-16 size-[720px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.18),transparent_60%)] blur-2xl" />
            </div>

            <Navbar>
                <PageNavbarLeftContent>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => router.back()}
                        className="rounded-full"
                    >
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <div>
                        <h1 className="text-sm font-semibold">
                            Add New Project
                        </h1>
                        <p className="text-xs text-muted-foreground">
                            Share your amazing project with the community
                        </p>
                    </div>
                </PageNavbarLeftContent>
                <PageNavbarRightContent>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    type="button"
                                    disabled={isSubmitting}
                                    onClick={form.handleSubmit(onSubmit)}
                                    className="gap-2 rounded-xl"
                                >
                                    {isSubmitting ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                        <Plus className="h-4 w-4" />
                                    )}
                                    <span className="hidden md:inline text-xs">
                                        {isSubmitting
                                            ? "Creating..."
                                            : "Create Project"}
                                    </span>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent side="bottom">
                                Create project
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </PageNavbarRightContent>
            </Navbar>

            <PageContent>
                <div className="space-y-5">
                    <Card className="rounded-2xl border bg-background/60 p-5 backdrop-blur">
                        <div className="flex items-center gap-2">
                            <Sparkles className="h-5 w-5" />
                            <div>
                                <h2 className="text-lg font-semibold">
                                    Project Details
                                </h2>
                                <p className="text-sm text-muted-foreground">
                                    Tell us about your project and share it with
                                    everyone.
                                </p>
                            </div>
                        </div>
                    </Card>

                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="grid gap-5 lg:grid-cols-[1fr_380px]"
                        >
                            <div className="space-y-5">
                                <Card className="rounded-2xl border bg-background/60 p-5 backdrop-blur">
                                    <div className="space-y-4">
                                        <FormFieldWrapper
                                            name="title"
                                            label="Project Title"
                                            required
                                        >
                                            {(field: any) => (
                                                <Input
                                                    placeholder="Enter your project title…"
                                                    className="rounded-xl"
                                                    {...field}
                                                />
                                            )}
                                        </FormFieldWrapper>
                                        <FormFieldWrapper
                                            name="description"
                                            label="Description"
                                            required
                                        >
                                            {(field: any) => (
                                                <Textarea
                                                    rows={5}
                                                    placeholder="Describe your project…"
                                                    className="rounded-xl"
                                                    {...field}
                                                />
                                            )}
                                        </FormFieldWrapper>
                                        <Separator />
                                        <FormFieldWrapper
                                            name="status"
                                            label="Project Status"
                                        >
                                            {(field: any) => (
                                                <Select
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                    defaultValue={field.value}
                                                >
                                                    <SelectTrigger className="rounded-xl">
                                                        <SelectValue placeholder="Select status" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {(
                                                            [
                                                                "active",
                                                                "in-progress",
                                                                "completed",
                                                            ] as const
                                                        ).map(s => (
                                                            <SelectItem
                                                                key={s}
                                                                value={s}
                                                            >
                                                                <span className="inline-flex items-center gap-2">
                                                                    <Badge
                                                                        variant="outline"
                                                                        className={`border ${STATUS_BADGES[s].badgeClass}`}
                                                                    >
                                                                        {
                                                                            STATUS_BADGES[
                                                                                s
                                                                            ]
                                                                                .label
                                                                        }
                                                                    </Badge>
                                                                </span>
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            )}
                                        </FormFieldWrapper>
                                    </div>
                                </Card>

                                <Card className="rounded-2xl border bg-background/60 p-5 backdrop-blur">
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <FormLabel className="flex items-center gap-2">
                                                <TagsIcon className="h-4 w-4" />
                                                Tags
                                            </FormLabel>
                                            <div className="text-xs text-muted-foreground">
                                                Press{" "}
                                                <kbd className="rounded border px-1">
                                                    Enter
                                                </kbd>{" "}
                                                to add
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <Input
                                                value={tagInput}
                                                onChange={e =>
                                                    setTagInput(e.target.value)
                                                }
                                                onKeyDown={e =>
                                                    handleKey(e, "tag")
                                                }
                                                placeholder="Add a tag (e.g. react)"
                                                className="rounded-xl"
                                            />
                                            <Button
                                                type="button"
                                                variant="secondary"
                                                onClick={handleAddTag}
                                                className="rounded-xl"
                                            >
                                                Add
                                            </Button>
                                        </div>
                                        {!!values.tags?.length && (
                                            <div className="flex flex-wrap gap-2 pt-1">
                                                {values.tags.map(t => (
                                                    <Badge
                                                        key={t}
                                                        variant="secondary"
                                                        className="cursor-pointer rounded-xl"
                                                        onClick={() =>
                                                            removeFrom(
                                                                "tags",
                                                                t
                                                            )
                                                        }
                                                    >
                                                        {t}{" "}
                                                        <span className="ml-1 opacity-70">
                                                            ×
                                                        </span>
                                                    </Badge>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </Card>
                            </div>

                            <div className="space-y-5">
                                <Card className="rounded-2xl border bg-background/60 p-5 backdrop-blur">
                                    <div className="space-y-3">
                                        <FormLabel>Project Image</FormLabel>
                                        <FormFieldWrapper name="image" label="">
                                            {(field: any) => (
                                                <div className="flex gap-2">
                                                    <Input
                                                        placeholder="https://example.com/image.jpg"
                                                        className="rounded-xl"
                                                        {...field}
                                                    />
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        className="rounded-xl"
                                                        onClick={() =>
                                                            form.setValue(
                                                                "image",
                                                                "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=1200&q=80&auto=format&fit=crop"
                                                            )
                                                        }
                                                        title="Use sample image"
                                                    >
                                                        <Camera className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            )}
                                        </FormFieldWrapper>
                                        <div className="overflow-hidden rounded-xl border">
                                            {values.image && imgOk ? (
                                                <img
                                                    src={values.image}
                                                    alt="Preview"
                                                    className="h-48 w-full object-cover"
                                                />
                                            ) : (
                                                <div className="flex h-48 w-full items-center justify-center text-sm text-muted-foreground">
                                                    {values.image
                                                        ? "Could not load image preview"
                                                        : "Image preview will appear here"}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </Card>

                                <Card className="rounded-2xl border bg-background/60 p-5 backdrop-blur">
                                    <div className="space-y-4">
                                        <FormLabel>Links</FormLabel>
                                        <FormFieldWrapper
                                            name="github"
                                            label="GitHub URL"
                                        >
                                            {(field: any) => (
                                                <div className="relative">
                                                    <Github className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                                    <Input
                                                        placeholder="https://github.com/username/repo"
                                                        className="pl-9 rounded-xl"
                                                        {...field}
                                                    />
                                                </div>
                                            )}
                                        </FormFieldWrapper>
                                        <FormFieldWrapper
                                            name="liveUrl"
                                            label="Live URL"
                                        >
                                            {(field: any) => (
                                                <div className="relative">
                                                    <Link2 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                                    <Input
                                                        placeholder="https://your-project.com"
                                                        className="pl-9 rounded-xl"
                                                        {...field}
                                                    />
                                                </div>
                                            )}
                                        </FormFieldWrapper>
                                    </div>
                                </Card>

                                <Card className="rounded-2xl border bg-background/60 p-5 backdrop-blur">
                                    <div className="flex items-center justify-between gap-3">
                                        <div className="text-sm text-muted-foreground">
                                            Review details before submitting
                                        </div>
                                        <div className="flex gap-2">
                                            <Button
                                                type="button"
                                                variant="outline"
                                                className="rounded-xl"
                                                onClick={() => router.back()}
                                            >
                                                Cancel
                                            </Button>
                                            <Button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="gap-2 rounded-xl"
                                            >
                                                {isSubmitting && (
                                                    <Loader2 className="h-4 w-4 animate-spin" />
                                                )}
                                                {isSubmitting
                                                    ? "Creating…"
                                                    : "Create Project"}
                                            </Button>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        </form>
                    </Form>
                </div>
            </PageContent>
        </div>
    );
}
