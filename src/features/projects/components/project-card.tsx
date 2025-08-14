"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter,
    Card,
} from "@/components/ui/card";
import clsx from "clsx";
import { motion } from "framer-motion";
import { Eye, Heart, Star } from "iconsax-reactjs";
import { CalendarDays, MessageCircle, Rocket } from "lucide-react";
import { ProjectActions } from "./project-row";
import { useRouter } from "next/navigation";

export const ProjectCard = ({ project, index }: any) => {
    const router = useRouter();
    return (
        <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.25, delay: index * 0.05 }}
            className="h-full"
        >
            <Card className="group h-full overflow-hidden rounded-2xl border bg-background/60 backdrop-blur transition-all hover:shadow-xl">
                <div className="relative h-40 overflow-hidden">
                    <img
                        src={project.image}
                        alt={project.title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                    <div className="absolute left-3 top-3">
                        <Badge
                            className={clsx(
                                "rounded-full",
                                statusBadge(project.status)
                            )}
                        >
                            {project.status || "unknown"}
                        </Badge>
                    </div>
                    <div className="absolute right-2 top-2">
                        <ProjectActions />
                    </div>
                </div>
                <CardHeader className="space-y-1">
                    <CardTitle className="line-clamp-1 text-base font-semibold">
                        {project.title}
                    </CardTitle>
                    <p className="line-clamp-2 text-sm text-muted-foreground">
                        {project.description}
                    </p>
                </CardHeader>
                <CardContent>
                    <div className="mb-2 flex flex-wrap gap-1">
                        {(project.tags || []).slice(0, 3).map((t: string) => (
                            <Badge
                                key={t}
                                variant="secondary"
                                className="rounded-md"
                            >
                                {t}
                            </Badge>
                        ))}
                        {(project.tags?.length || 0) > 3 && (
                            <Badge variant="outline" className="rounded-md">
                                +{project.tags.length - 3}
                            </Badge>
                        )}
                    </div>
                    <ProjectStats project={project} />
                </CardContent>
                <CardFooter className="flex border-t p-4">
                    <div className="flex justify-center w-full items-center gap-3">
                        <Avatar className="h-8 w-8 flex items-center justify-center border dark:border-white/50">
                            <AvatarFallback className="dark:text-white text-black text-xs">
                                T
                            </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium">
                                Tushar
                            </p>
                            <p className="truncate text-xs text-muted-foreground">
                                Maintainer
                            </p>
                        </div>
                        <Button
                            size="sm"
                            variant="secondary"
                            className="rounded-xl gap-1"
                            onClick={() =>
                                router.push(
                                    `/dashboard/projects/${project._id}`
                                )
                            }
                        >
                            <Rocket className="h-4 w-4" /> View
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        </motion.div>
    );
};

export const ProjectStats = ({ project, showDate = false }: any) => (
    <div
        className={clsx(
            "flex items-center text-xs text-muted-foreground",
            showDate ? "justify-between" : "gap-3"
        )}
    >
        <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1">
                <Star className="h-3.5 w-3.5" /> {project?.stars || 0}
            </span>
            <span className="inline-flex items-center gap-1">
                <Eye className="h-3.5 w-3.5" /> {project?.views || 0}
            </span>
            <span className="inline-flex items-center gap-1">
                <Heart className="h-3.5 w-3.5" /> {project?.likes || 0}
            </span>
            <span className="inline-flex items-center gap-1">
                <MessageCircle className="h-3.5 w-3.5" />{" "}
                {project?.comments || 0}
            </span>
        </div>
        {showDate && (
            <span className="inline-flex items-center gap-1">
                <CalendarDays className="h-3.5 w-3.5" />{" "}
                {project?.lastUpdated || "yesterday"}
            </span>
        )}
    </div>
);

export const statusBadge = (s?: string) =>
    ({
        active: "bg-emerald-500/10 text-emerald-500 ring-1 ring-emerald-500/20",
        completed: "bg-blue-500/10 text-blue-500 ring-1 ring-blue-500/20",
        "in-progress":
            "bg-amber-500/10 text-amber-500 ring-1 ring-amber-500/20",
    })[s || ""] || "bg-muted text-muted-foreground";
