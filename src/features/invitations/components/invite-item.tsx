import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Invitation } from "@/types/invitation";
import { memo } from "react";

export const InviteItem = memo(function InviteItem({
    inv,
    isActing,
    onAccept,
    onDecline,
    variant,
}: {
    inv: Invitation;
    isActing: boolean;
    onAccept: (id: string) => void;
    onDecline: (id: string) => void;
    variant: "received" | "sent";
}) {
    const created = new Date(inv.createdAt).toLocaleString();
    const status = inv.status ?? "PENDING";
    const disabled = isActing || status !== "PENDING";

    return (
        <li>
            <Card>
                <CardContent className="p-4 sm:p-5">
                    <div className="flex flex-col gap-3 sm:gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="min-w-0">
                            <p className="font-medium text-sm sm:text-base truncate">
                                {variant === "received"
                                    ? `${inv.senderEmail} invited you to a thread`
                                    : `You invited ${inv.receiverEmail} to a thread`}
                            </p>
                            <p className="text-[11px] sm:text-xs text-muted-foreground mt-1">
                                {created}
                                {variant === "received" ? ` • Status: ${status}` : ""}
                            </p>
                        </div>

                        {variant === "received" ? (
                            <div className="flex gap-2 sm:shrink-0">
                                <Button
                                    size="sm"
                                    className="text-xs"
                                    aria-label="Accept invitation"
                                    disabled={disabled}
                                    onClick={() => onAccept(inv._id)}
                                >
                                    {isActing ? "Accepting…" : "Accept"}
                                </Button>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    className="text-xs"
                                    aria-label="Decline invitation"
                                    disabled={disabled}
                                    onClick={() => onDecline(inv._id)}
                                >
                                    {isActing ? "Declining…" : "Decline"}
                                </Button>
                            </div>
                        ) : (
                            <div className="text-[11px] sm:text-xs text-muted-foreground sm:shrink-0">{status}</div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </li>
    );
});
