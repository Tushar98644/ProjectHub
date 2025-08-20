"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useFetchInvites, useAcceptInvite, useDeclineInvite } from "@/hooks/queries/useInviteQuery";
import { toast } from "sonner";
import { Invite } from "@/types/invitation";
import { InviteItem } from "@/features/invitations/components/invite-item";

export default function InvitationsPage() {
    const [tab, setTab] = useState<"received" | "sent">("received");
    const { data, isPending, isError } = useFetchInvites();
    const accept = useAcceptInvite();
    const decline = useDeclineInvite();

    const receivedInvites: Invite[] = Array.isArray(data?.received) ? data!.received : [];
    const sentInvites: Invite[] = Array.isArray(data?.sent) ? data!.sent : [];

    const isActingOn = (id: string) =>
        (accept.isPending && accept.variables === id) || (decline.isPending && decline.variables === id);

    const onAccept = (id: string) =>
        accept.mutate(id, {
            onSuccess: () => toast.success("Invitation accepted!"),
            onError: () => toast.error("Failed to accept invitation."),
        });

    const onDecline = (id: string) =>
        decline.mutate(id, {
            onSuccess: () => toast.success("Invitation declined!"),
            onError: () => toast.error("Failed to decline invitation."),
        });

    return (
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-4 sm:py-6 space-y-5 sm:space-y-7">
            <h1 className="text-lg sm:text-xl font-semibold">Invitations</h1>

            {isPending ? (
                <p className="text-xs sm:text-sm text-muted-foreground">Loading…</p>
            ) : isError ? (
                <p className="text-xs sm:text-sm text-destructive">Failed to load invitations.</p>
            ) : (
                <Tabs value={tab} onValueChange={v => setTab(v as "received" | "sent")} className="w-full">
                    <TabsList className="w-full sm:w-auto">
                        <TabsTrigger value="received" className="flex-1 sm:flex-none text-xs sm:text-sm">
                            Received
                        </TabsTrigger>
                        <TabsTrigger value="sent" className="flex-1 sm:flex-none text-xs sm:text-sm">
                            Sent
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="received" className="mt-4 sm:mt-5">
                        {receivedInvites.length === 0 ? (
                            <p className="text-xs sm:text-sm text-muted-foreground">No invitations received.</p>
                        ) : (
                            <ul className="space-y-3 sm:space-y-4">
                                {receivedInvites.map(inv => (
                                    <InviteItem
                                        key={inv._id}
                                        inv={inv}
                                        variant="received"
                                        isActing={isActingOn(inv._id)}
                                        onAccept={onAccept}
                                        onDecline={onDecline}
                                    />
                                ))}
                            </ul>
                        )}
                    </TabsContent>

                    <TabsContent value="sent" className="mt-4 sm:mt-5">
                        {sentInvites.length === 0 ? (
                            <p className="text-xs sm:text-sm text-muted-foreground">
                                You haven’t sent any invitations.
                            </p>
                        ) : (
                            <ul className="space-y-3 sm:space-y-4">
                                {sentInvites.map(inv => (
                                    <InviteItem
                                        key={inv._id}
                                        inv={inv}
                                        variant="sent"
                                        isActing={false}
                                        onAccept={() => {}}
                                        onDecline={() => {}}
                                    />
                                ))}
                            </ul>
                        )}
                    </TabsContent>
                </Tabs>
            )}
        </div>
    );
}
