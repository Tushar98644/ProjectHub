import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import clsx from "clsx";
import { motion } from "framer-motion";
import { MoreHorizontal, Rocket } from "lucide-react";
import { statusBadge, ProjectStats } from "./project-card";
import { Badge } from "@/components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card } from "@/components/ui/card";

export const ProjectRow = ({ project, index }: any) => (
    <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, delay: index * 0.03 }}
    >
        <Card className="overflow-hidden rounded-2xl border bg-background/60 backdrop-blur hover:shadow-lg">
            <div className="grid grid-cols-1 gap-0 p-4 md:grid-cols-[160px_1fr_auto] md:gap-4">
                <div className="relative h-28 w-full overflow-hidden rounded-xl md:h-24">
                    <img src={project.image} alt={project.title} className="h-full w-full object-cover" />
                    <div className="absolute left-2 top-2">
                        <Badge className={clsx("rounded-full", statusBadge(project.status))}>
                            {project.status || "unknown"}
                        </Badge>
                    </div>
                </div>
                <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                        <div>
                            <p className="text-base font-semibold leading-tight">{project.title}</p>
                            <p className="line-clamp-2 text-sm text-muted-foreground">{project.description}</p>
                        </div>
                        <ProjectActions />
                    </div>
                    <div className="flex flex-wrap gap-1">
                        {(project.tags || []).slice(0, 4).map((t: string) => (
                            <Badge key={t} variant="secondary" className="rounded-md">
                                {t}
                            </Badge>
                        ))}
                        {(project.tags?.length || 0) > 4 && (
                            <Badge variant="outline" className="rounded-md">
                                +{project.tags.length - 4}
                            </Badge>
                        )}
                    </div>
                    <ProjectStats project={project} showDate />
                </div>
                <div className="flex items-center justify-end gap-2 md:flex-col md:items-end">
                    <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8 flex items-center rounded-full justify-center border dark:border-white/50">
                            <AvatarFallback className="dark:text-white text-black text-xs">T</AvatarFallback>
                        </Avatar>
                        <div className="hidden text-right md:block">
                            <p className="text-sm font-medium">Tushar</p>
                            <p className="text-xs text-muted-foreground">Maintainer</p>
                        </div>
                    </div>
                    <Button size="sm" variant="secondary" className="rounded-xl gap-1">
                        <Rocket className="h-4 w-4" /> View
                    </Button>
                </div>
            </div>
        </Card>
    </motion.div>
);

export const ProjectActions = () => (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                <MoreHorizontal className="h-4 w-4" />
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuItem>View Project</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
);
