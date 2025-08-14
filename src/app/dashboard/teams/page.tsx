"use client";

import { useState, useMemo } from "react";
import { Users, Plus, LayoutGrid, Rows } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import MembersTable from "@/features/teams/components/members-table";
import clsx from "clsx";
import { SearchBar } from "@/components/common/search-bar";

export default function TeamsPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [view, setView] = useState<"grid" | "list">("list");
    const [selectedRole, setSelectedRole] = useState("all");

    const mockAction = async (msg: string) => {
        setIsLoading(true);
        await new Promise(r => setTimeout(r, 500));
        setIsLoading(false);
        alert(msg);
    };

    const roles = useMemo(
        () => ["all", "admins", "maintainers", "members", "guests"],
        []
    );

    return (
        <div className="min-h-screen bg-gradient-to-b from-background via-background to-background">
            <div className="space-y-5">
                {/* Header */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                        <h2 className="text-xl font-bold tracking-tight flex items-center gap-2">
                            <Users className="h-5 w-5" /> Team Members
                        </h2>
                        <Badge variant="secondary" className="rounded-full">
                            All
                        </Badge>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="hidden md:flex rounded-xl border bg-background/60 backdrop-blur">
                            {[
                                ["grid", LayoutGrid],
                                ["list", Rows],
                            ].map(([v, Icon], i) => (
                                <Button
                                    key={i}
                                    variant={view === v ? "default" : "ghost"}
                                    size="sm"
                                    onClick={() => setView(v as any)}
                                    className="rounded-xl"
                                >
                                    <Icon className="h-4 w-4" />
                                </Button>
                            ))}
                        </div>

                        <Button
                            variant="outline"
                            size="sm"
                            className="rounded-xl"
                            onClick={() => mockAction("Export triggered")}
                        >
                            Export
                        </Button>

                        <Button
                            size="sm"
                            className="rounded-xl gap-1"
                            onClick={() => mockAction("Invite member")}
                            disabled={isLoading}
                        >
                            <Plus size={14} />
                            <span className="hidden sm:inline">
                                Invite member
                            </span>
                        </Button>
                    </div>
                </div>

                {/* Search + Roles */}
                <div className="flex flex-col gap-3">
                    <SearchBar
                        placeholder={"Search Members..."}
                        value={searchQuery}
                        onChange={setSearchQuery}
                    />

                    <ScrollArea>
                        <div className="flex items-center gap-2 pb-1">
                            {roles.map(role => (
                                <Button
                                    key={role}
                                    variant={
                                        selectedRole === role
                                            ? "default"
                                            : "outline"
                                    }
                                    size="sm"
                                    onClick={() => setSelectedRole(role)}
                                    className={clsx(
                                        "rounded-full border-dashed",
                                        selectedRole === role && "font-semibold"
                                    )}
                                >
                                    {role}
                                </Button>
                            ))}
                        </div>
                        <ScrollBar
                            className="hidden"
                            orientation="horizontal"
                        />
                    </ScrollArea>
                </div>

                {/* Members list */}
                <Card className="rounded-2xl border bg-background/60 p-0">
                    <CardContent className="p-4 h-[60vh] overflow-auto min-h-0">
                        <MembersTable />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
