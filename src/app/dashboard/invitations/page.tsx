"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const receivedInvites = [
    {
        _id: "inv1",
        type: "team",
        senderName: "Alex Chen",
        createdAt: "2025-08-19T12:00:00Z",
    },
    {
        _id: "inv2",
        type: "thread",
        senderName: "Sarah Nguyen",
        createdAt: "2025-08-20T14:30:00Z",
    },
];

const sentInvites = [
    {
        _id: "inv3",
        type: "team",
        targetName: "John Smith",
        createdAt: "2025-08-18T09:15:00Z",
        status: "pending",
    },
    {
        _id: "inv4",
        type: "thread",
        targetName: "Alex Chen",
        createdAt: "2025-08-16T18:05:00Z",
        status: "pending",
    },
];

export default function InvitationsPage() {
    const [tab, setTab] = useState("received");

    return (
        <div className="mx-auto max-w-3xl p-6 space-y-8">
            <h1 className="text-xl font-semibold">Invitations</h1>

            <Tabs value={tab} onValueChange={setTab}>
                <TabsList>
                    <TabsTrigger value="received">Received</TabsTrigger>
                    <TabsTrigger value="sent">Sent</TabsTrigger>
                </TabsList>

                <TabsContent value="received">
                    {receivedInvites.length === 0 ? (
                        <p className="text-sm text-muted-foreground mt-4">No invitations received.</p>
                    ) : (
                        <div className="space-y-3 mt-4">
                            {receivedInvites.map(inv => (
                                <Card key={inv._id}>
                                    <CardContent className="p-4 flex justify-between">
                                        <div>
                                            <p className="font-medium">
                                                {inv.senderName} invited you to a{" "}
                                                {inv.type === "team" ? "team" : "thread"}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                {new Date(inv.createdAt).toLocaleString()}
                                            </p>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button size="sm">Accept</Button>
                                            <Button size="sm" variant="outline">
                                                Decline
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </TabsContent>

                <TabsContent value="sent">
                    {sentInvites.length === 0 ? (
                        <p className="text-sm text-muted-foreground mt-4">You haven’t sent any invitations.</p>
                    ) : (
                        <div className="space-y-3 mt-4">
                            {sentInvites.map(inv => (
                                <Card key={inv._id}>
                                    <CardContent className="p-4 flex justify-between">
                                        <div>
                                            <p className="font-medium">
                                                You invited {inv.targetName} to a{" "}
                                                {inv.type === "team" ? "team" : "thread"}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                {new Date(inv.createdAt).toLocaleString()}
                                            </p>
                                        </div>
                                        <div className="text-xs text-muted-foreground flex items-center">
                                            {inv.status}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </TabsContent>
            </Tabs>
        </div>
    );
}
