"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Loader2, Sparkles } from "lucide-react";
import ProjectDetails from "@/features/projects/components/project-details";
import TagInput from "@/features/projects/components/tag-input";
import ProjectImagePicker from "@/features/projects/components/iamge-picker";
import { Button } from "@/components/ui/button";
import ProjectLinks from "@/features/projects/components/project-links";
import { useCreateProject } from "@/hooks/queries/useProjectQuery";
import { useSession } from "@/config/auth/client";

export default function AddProjectPage() {
    const { data: session } = useSession();

    const router = useRouter();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("active");
    const [image, setImage] = useState("");
    const [githubUrl, setGithubUrl] = useState("");
    const [liveUrl, setLiveUrl] = useState("");
    const [tags, setTags] = useState<string[]>([]);
    const [techStack, setTechStack] = useState<string[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const author = session?.user?.name || "User";
    const authorAvatar = session?.user?.image || "";
    const { mutate } = useCreateProject();

    const onSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        setIsSubmitting(true);
        const payload = {
            author,
            authorAvatar,
            title,
            description,
            status,
            image,
            githubUrl,
            liveUrl,
            tags,
            techStack,
        };
        mutate(payload, {
            onSuccess: () => {
                setIsSubmitting(false);
                router.push("/dashboard/projects");
            },
        });
    };

    return (
        <div className="flex flex-col gap-6 h-full pb-20 overflow-scroll">
            <Card className="flex items-center gap-2 rounded-2xl border bg-background/60 p-5 backdrop-blur">
                <Sparkles className="h-5 w-5" />
                <div>
                    <h2 className="text-lg font-semibold">Project Details</h2>
                    <p className="text-sm text-muted-foreground">
                        Tell us about your project and share it with everyone.
                    </p>
                </div>
            </Card>
            <form onSubmit={onSubmit} className="grid gap-5 lg:grid-cols-[1fr_380px]">
                <div className="space-y-5">
                    <ProjectDetails
                        {...{
                            title,
                            setTitle,
                            description,
                            setDescription,
                            status,
                            setStatus,
                        }}
                    />
                    <TagInput label="Tech Stack" items={techStack} setItems={setTechStack} />
                    <TagInput label="Tags" items={tags} setItems={setTags} />
                </div>
                <div className="space-y-5">
                    <ProjectImagePicker {...{ image, setImage }} />
                    <ProjectLinks {...{ githubUrl, setGithubUrl, liveUrl, setLiveUrl }} />
                    <Card className="flex items-center justify-between rounded-2xl border bg-background/60 p-5 backdrop-blur">
                        <div className="text-sm text-muted-foreground">Review details before submitting</div>
                        <div className="flex gap-2">
                            <Button type="button" variant="outline" onClick={() => router.back()}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={isSubmitting} className="gap-2">
                                {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
                                {isSubmitting ? "Creating…" : "Submit Project"}
                            </Button>
                        </div>
                    </Card>
                </div>
            </form>
        </div>
    );
}
