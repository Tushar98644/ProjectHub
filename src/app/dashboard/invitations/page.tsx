"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useFetchInvites } from "@/hooks/queries/useInviteQuery";

export default function InvitationsPage() {
    const [tab, setTab] = useState<"received" | "sent">("received");
    const { data, isLoading, isError } = useFetchInvites();

    const receivedInvites = Array.isArray(data?.received) ? data!.received : [];
    const sentInvites = Array.isArray(data?.sent) ? data!.sent : [];

    return (
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-4 sm:py-6 space-y-6 sm:space-y-8">
            <h1 className="text-xl font-semibold">Invitations</h1>

            {isLoading ? (
                <p className="text-sm text-muted-foreground">Loading…</p>
            ) : isError ? (
                <p className="text-sm text-destructive">Failed to load invitations.</p>
            ) : (
                <Tabs value={tab} onValueChange={v => setTab(v as "received" | "sent")} className="w-full">
                    <TabsList className="w-full sm:w-auto">
                        <TabsTrigger value="received" className="flex-1 sm:flex-none">
                            Received
                        </TabsTrigger>
                        <TabsTrigger value="sent" className="flex-1 sm:flex-none">
                            Sent
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="received" className="mt-4 sm:mt-6">
                        {receivedInvites.length === 0 ? (
                            <p className="text-sm text-muted-foreground">No invitations received.</p>
                        ) : (
                            <ul className="space-y-3 sm:space-y-4">
                                {receivedInvites.map((inv: any) => (
                                    <li key={inv._id}>
                                        <Card>
                                            <CardContent className="p-4 sm:p-5">
                                                <div className="flex flex-col gap-3 sm:gap-4 sm:flex-row sm:items-center sm:justify-between">
                                                    <div className="min-w-0">
                                                        <p className="font-medium truncate">
                                                            {inv.senderEmail} invited you to a thread
                                                        </p>
                                                        <p className="text-xs text-muted-foreground mt-1">
                                                            {new Date(inv.createdAt).toLocaleString()}
                                                        </p>
                                                    </div>
                                                    <div className="flex gap-2 sm:shrink-0">
                                                        <Button size="sm" aria-label="Accept invitation">
                                                            Accept
                                                        </Button>
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            aria-label="Decline invitation"
                                                        >
                                                            Decline
                                                        </Button>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </TabsContent>

                    <TabsContent value="sent" className="mt-4 sm:mt-6">
                        {sentInvites.length === 0 ? (
                            <p className="text-sm text-muted-foreground">You haven’t sent any invitations.</p>
                        ) : (
                            <ul className="space-y-3 sm:space-y-4">
                                {sentInvites.map((inv: any) => (
                                    <li key={inv._id}>
                                        <Card>
                                            <CardContent className="p-4 sm:p-5">
                                                <div className="flex flex-col gap-3 sm:gap-4 sm:flex-row sm:items-center sm:justify-between">
                                                    <div className="min-w-0">
                                                        <p className="font-medium truncate">
                                                            You invited {inv.receiverEmail} to a thread
                                                        </p>
                                                        <p className="text-xs text-muted-foreground mt-1">
                                                            {new Date(inv.createdAt).toLocaleString()}
                                                        </p>
                                                    </div>
                                                    <div className="text-xs text-muted-foreground sm:shrink-0">
                                                        {inv.status ?? "PENDING"}
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </TabsContent>
                </Tabs>
            )}
        </div>
    );
}
