"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Github, Link2 } from "lucide-react";

interface ProjectLinksProps {
    githubUrl: string;
    setGithubUrl: (github: string) => void;
    liveUrl: string;
    setLiveUrl: (liveUrl: string) => void;
}

export default function ProjectLinks({ githubUrl, setGithubUrl, liveUrl, setLiveUrl }: ProjectLinksProps) {
    return (
        <Card className="space-y-4 rounded-2xl border bg-background/60 p-5 backdrop-blur">
            <div>
                <label className="block mb-2 text-muted-foreground">GitHub URL</label>
                <div className="relative">
                    <Github className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        value={githubUrl}
                        onChange={e => setGithubUrl(e.target.value)}
                        placeholder="https://github.com/username/repo"
                        className="pl-9"
                    />
                </div>
            </div>

            <div>
                <label className="block mb-2 text-muted-foreground">Live URL</label>
                <div className="relative">
                    <Link2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        value={liveUrl}
                        onChange={e => setLiveUrl(e.target.value)}
                        placeholder="https://your-project.com"
                        className="pl-9"
                    />
                </div>
            </div>
        </Card>
    );
}
