"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";
import { ArrowSwapVertical, Slash, TickCircle } from "iconsax-reactjs";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

function MembersTable() {
    const members = [
        {
            avatar: "/assets/profile.png",
            name: "James Brown",
            email: "james@example.com",
            title: "Marketing manager",
            since: "Since Aug, 2020",
            projectLogo: "/assets/logos/loom.svg",
            projectName: "Loom",
            projectDesc: "Data analysis",
            doc: "brown-james.pdf",
            size: "2.3 MB",
            status: "active",
        },
        {
            avatar: "/assets/profile.png",
            name: "Sophia Williams",
            email: "sophia@example.com",
            title: "HR Assistant",
            since: "Since Oct, 2023",
            projectLogo: "/assets/logos/slack.svg",
            projectName: "Slack",
            projectDesc: "Team management",
            doc: "sophia-williams.pdf",
            size: "1.2 MB",
            status: "absent",
        },
        {
            avatar: "/assets/profile.png",
            name: "Arthur Taylor",
            email: "arthur@example.com",
            title: "Entrepreneur / CEO",
            since: "Since Dec, 2018",
            projectLogo: "/assets/logos/sketch.svg",
            projectName: "Sketch",
            projectDesc: "Vision & Goal setting",
            doc: "arthur-taylor.pdf",
            size: "2.8 MB",
            status: "active",
        },
    ];

    return (
        <Card className="rounded-2xl border bg-background/60 shadow-sm">
            <CardContent className="p-4">
                <div className="w-full overflow-x-auto text-sm">
                    <Table>
                        {/* Header */}
                        <TableHeader>
                            <TableRow>
                                {["Member name", "Title", "Project", "Member Document", "Status"].map((label, i) => (
                                    <TableHead key={label} className={i === 4 ? "w-[180px]" : ""}>
                                        <div className="inline-flex items-center gap-2">
                                            <span className="text-xs font-medium text-muted-foreground">{label}</span>
                                            <ArrowSwapVertical size={12} className="text-muted-foreground/70" />
                                        </div>
                                    </TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {members.map((m, i) => (
                                <TableRow key={i} className="hover:bg-muted/50">
                                    {/* Member Name */}
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={m.avatar}
                                                alt={m.name}
                                                width={40}
                                                height={40}
                                                className="w-10 h-10 rounded-full"
                                            />
                                            <div className="min-w-0">
                                                <p className="text-sm font-medium text-foreground truncate">{m.name}</p>
                                                <p className="text-xs text-muted-foreground truncate">{m.email}</p>
                                            </div>
                                        </div>
                                    </TableCell>

                                    {/* Title */}
                                    <TableCell>
                                        <p className="text-sm font-medium text-foreground">{m.title}</p>
                                        <p className="text-xs text-muted-foreground">{m.since}</p>
                                    </TableCell>

                                    {/* Project */}
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <div className="rounded-full p-1.5 border border-muted-foreground/20 bg-background/50 shrink-0">
                                                <Image src={m.projectLogo} alt={m.projectName} width={28} height={28} />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-sm font-medium text-foreground truncate">
                                                    {m.projectName}
                                                </p>
                                                <p className="text-xs text-muted-foreground truncate">
                                                    {m.projectDesc}
                                                </p>
                                            </div>
                                        </div>
                                    </TableCell>

                                    {/* Document */}
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Image src="/assets/icons/pdfIcon.svg" alt="pdf" width={28} height={28} />
                                            <div className="min-w-0">
                                                <p className="text-sm font-medium text-foreground truncate">{m.doc}</p>
                                                <p className="text-xs text-muted-foreground">{m.size}</p>
                                            </div>
                                        </div>
                                    </TableCell>

                                    {/* Status */}
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            {m.status === "active" ? (
                                                <Badge
                                                    variant="secondary"
                                                    className="rounded-full bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
                                                >
                                                    <div className="inline-flex items-center gap-2">
                                                        <TickCircle
                                                            size={14}
                                                            variant="Bold"
                                                            className="text-emerald-500"
                                                        />
                                                        <span className="text-xs font-medium">Active</span>
                                                    </div>
                                                </Badge>
                                            ) : (
                                                <Badge
                                                    variant="outline"
                                                    className="rounded-full text-muted-foreground hover:bg-muted/30"
                                                >
                                                    <div className="inline-flex items-center gap-2">
                                                        <Slash
                                                            size={14}
                                                            variant="Bold"
                                                            className="text-muted-foreground"
                                                        />
                                                        <span className="text-xs font-medium">Absent</span>
                                                    </div>
                                                </Badge>
                                            )}
                                            <div className="ml-auto">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="rounded-md hover:bg-muted/40"
                                                    aria-label="More options"
                                                >
                                                    <Image
                                                        src="/assets/icons/more.svg"
                                                        width={18}
                                                        height={18}
                                                        alt="options"
                                                    />
                                                </Button>
                                            </div>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    );
}

export default MembersTable;
