"use client";

import { useState, useMemo } from "react";
import { Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { SearchBar } from "@/components/common/search-bar";

type Member = {
    id: string;
    name: string;
    role: "admin" | "team" | "member";
    image?: string;
    context: "team" | "thread";
};

const dummyMembers: Member[] = [
    {
        id: "1",
        name: "Tushar Banik",
        role: "admin",
        context: "team",
        image: "https://i.pravatar.cc/150?img=3",
    },
    {
        id: "2",
        name: "Alex Chen",
        role: "member",
        context: "thread",
        image: "https://i.pravatar.cc/150?img=4",
    },
    {
        id: "3",
        name: "Sarah Nguyen",
        role: "team",
        context: "thread",
        image: "https://i.pravatar.cc/150?img=5",
    },
    {
        id: "4",
        name: "John Doe",
        role: "member",
        context: "team",
        image: "https://i.pravatar.cc/150?img=6",
    },
];

function TeamsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedRole, setSelectedRole] = useState("all");

    const roles = useMemo(() => ["all", "admin", "team", "member"], []);

    const filtered = dummyMembers.filter(m => {
        const matchesRole = selectedRole === "all" || m.role === selectedRole;
        const matchesSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesRole && matchesSearch;
    });

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
                        {filtered.map(m => (
                            <div key={m.id} className="flex items-center justify-between rounded-md border p-3">
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-8 w-8">
                                        {m.image ? (
                                            <AvatarImage src={m.image} />
                                        ) : (
                                            <AvatarFallback>
                                                {m.name
                                                    .split(" ")
                                                    .map(n => n[0])
                                                    .join("")}
                                            </AvatarFallback>
                                        )}
                                    </Avatar>

                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium">{m.name}</span>
                                        <span className="text-xs text-muted-foreground capitalize">
                                            {m.context === "thread" ? "Thread" : "Team"} · {m.role}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {filtered.length === 0 && <p className="text-sm text-muted-foreground">No members found.</p>}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default TeamsPage;
