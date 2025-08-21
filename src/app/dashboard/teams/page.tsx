"use client";

import { useState, useMemo } from "react";
import { Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { SearchBar } from "@/components/common/search-bar";
import { useFetchMembers } from "@/hooks/queries/useMemberQuery";
import { Member } from "@/types/member";

function TeamsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedRole, setSelectedRole] = useState<"all" | "admin" | "member">("all");

    const roles = useMemo(() => ["all", "admin", "member"] as const, []);
    const { data: members = [] } = useFetchMembers();

    const filtered = useMemo(() => {
        const q = searchQuery.trim().toLowerCase();
        return (members as Member[]).filter(m => {
            const matchesRole = selectedRole === "all" || m.role === selectedRole;
            const name = (m.name || "").toLowerCase(); // guard against undefined
            const email = (m.email || "").toLowerCase();
            const thread = (m.threadTitle || "").toLowerCase();
            const matchesSearch = !q || name.includes(q) || email.includes(q) || thread.includes(q);
            return matchesRole && matchesSearch;
        });
    }, [members, selectedRole, searchQuery]);

    return (
        <div className="h-full flex flex-col bg-gradient-to-b from-background via-background to-background">
            <div className="space-y-5">
                <div className="flex items-center gap-3 justify-between">
                    <h2 className="text-xl font-bold tracking-tight flex items-center gap-2">
                        <Users className="h-5 w-5" /> Team Members
                    </h2>
                    <Badge variant="secondary" className="rounded-full">
                        {filtered.length}
                    </Badge>
                </div>

                <div className="flex flex-col gap-3">
                    <SearchBar placeholder="Search members..." value={searchQuery} onChange={setSearchQuery} />
                    <div className="flex items-center gap-2 overflow-x-auto">
                        {roles.map(role => (
                            <Button
                                key={role}
                                size="sm"
                                variant={selectedRole === role ? "default" : "outline"}
                                onClick={() => setSelectedRole(role)}
                            >
                                {role}
                            </Button>
                        ))}
                    </div>
                </div>

                <Card className="h-96 overflow-auto rounded-2xl border bg-background/60 p-0">
                    <CardContent className="p-4 space-y-3">
                        {filtered.map(m => {
                            const initials =
                                (m.name || m.email || "")
                                    .split(" ")
                                    .map(n => n[0])
                                    .join("")
                                    .slice(0, 2)
                                    .toUpperCase() || "U";
                            return (
                                <div key={m._id} className="flex items-center justify-between rounded-md border p-3">
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-8 w-8">
                                            {m.avatar ? (
                                                <AvatarImage src={m.avatar} />
                                            ) : (
                                                <AvatarFallback>{initials}</AvatarFallback>
                                            )}
                                        </Avatar>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-medium">{m.name || m.email}</span>
                                            <span className="text-xs text-muted-foreground capitalize">
                                                {m.threadTitle || "Thread"} · {m.role}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                        {filtered.length === 0 && <p className="text-sm text-muted-foreground">No members found.</p>}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default TeamsPage;
