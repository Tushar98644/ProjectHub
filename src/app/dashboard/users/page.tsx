"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Mail, Users as UsersIcon } from "lucide-react";

export default function SearchUsersPage() {
    const [q, setQ] = useState("");
    const [loading, setLoading] = useState(false);

    const results = [
        {
            _id: "68a48d0b22b1f4a0556c3ec0",
            name: "Tushar Banik",
            username: "tushar",
            email: "evilden982@gmail.com",
            image: "https://i.pravatar.cc/150?u=tushar",
        },
        {
            _id: "68a48d0b22b1f4a0556c3ec1",
            name: "Alex Chen",
            username: "alexchen",
            email: "alex@example.com",
            image: "https://i.pravatar.cc/150?u=alex",
        },
    ];

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h2 className="text-xl font-semibold mb-4">Search users</h2>

            <div className="mb-4 flex gap-3">
                <Input
                    placeholder="Search by name, username or email..."
                    value={q}
                    onChange={e => setQ(e.target.value)}
                />
                <Button onClick={() => {}} disabled={loading || q.trim().length === 0}>
                    Search
                </Button>
            </div>

            <div className="space-y-3">
                {loading && <div className="text-sm text-muted-foreground">Searching…</div>}
                {!loading && results.length === 0 && q.trim().length > 0 && (
                    <div className="text-sm text-muted-foreground">No users found.</div>
                )}

                {results.map(u => (
                    <Card key={u._id} className="p-3">
                        <CardContent className="flex items-center justify-between gap-4 p-3">
                            <div className="flex items-center gap-3">
                                <Avatar className="h-10 w-10">
                                    {u.image ? (
                                        <AvatarImage src={u.image} />
                                    ) : (
                                        <AvatarFallback>{(u.name || u.username || "U").slice(0, 2)}</AvatarFallback>
                                    )}
                                </Avatar>

                                <div>
                                    <div className="font-medium">{u.name ?? u.username ?? "Unnamed"}</div>
                                    <div className="text-xs text-muted-foreground flex items-center gap-2">
                                        <Mail className="h-3 w-3" /> {u.email ?? "—"}
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <Button size="sm" onClick={() => {}}>
                                    <UsersIcon className="mr-2 h-3 w-3" /> Invite to team
                                </Button>
                                <Button size="sm" variant="ghost" onClick={() => {}}>
                                    Invite to thread
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
