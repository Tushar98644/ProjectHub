"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

interface ProjectDeatilsProps {
    title: string;
    setTitle: (title: string) => void;
    description: string;
    setDescription: (description: string) => void;
    status: string;
    setStatus: (status: string) => void;
}

export const STATUS_BADGES = {
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
        badgeClass: "bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-900/15 dark:text-sky-400 dark:border-sky-800",
    },
};

export default function ProjectDetails({
    title,
    setTitle,
    description,
    setDescription,
    status,
    setStatus,
}: ProjectDeatilsProps) {
    return (
        <Card className="flex flex-col space-y-5 rounded-2xl border bg-background/60 p-5 backdrop-blur">
            <div>
                <label className="block mb-2 font-medium">Project Title *</label>
                <Input value={title} onChange={e => setTitle(e.target.value)} className="rounded-lg" />
            </div>

            <div>
                <label className="block mb-2 font-medium">Description *</label>
                <Textarea
                    rows={5}
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    className="rounded-lg"
                />
            </div>

            <Separator />

            <div>
                <label className="block mb-2 font-medium">Project Status</label>
                <Select value={status} onValueChange={setStatus}>
                    <SelectTrigger className="rounded-lg">
                        <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                        {Object.entries(STATUS_BADGES).map(([key, val]) => (
                            <SelectItem key={key} value={key}>
                                <Badge variant="outline" className={`border ${val.badgeClass}`}>
                                    {val.label}
                                </Badge>
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </Card>
    );
}
