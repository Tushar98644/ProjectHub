"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Mail } from "lucide-react";
import { User } from "@/types/user";
import { Thread } from "@/types/thread";
import { useSession } from "@/config/auth/client";
import { useFetchThreads } from "@/hooks/queries/useThreadQuery";
import { useSendInvite } from "@/hooks/queries/useInviteQuery";

export function InviteDialog({
    open,
    onOpenChange,
    user,
}: {
    open: boolean;
    onOpenChange: (v: boolean) => void;
    user: User;
}) {
    const [threadId, setThreadId] = useState<string>("");
    const [role, setRole] = useState<"admin" | "member">("member");

    const { data: session, isPending } = useSession();
    const { data: threads = [] } = useFetchThreads(session?.user?.email);
    const { mutate: sendInvite } = useSendInvite();

    const threadTitle = threads.filter((x: Thread) => x._id === threadId)[0]?.title;
    const onConfirm = async () => {
        if (!threadId) return toast.error("Pick a thread");
        if (!user.email) return toast.error("User has no email");
        try {
            sendInvite({ threadId, threadTitle, receiverEmail: user.email, role });
            toast.success("Invitation sent");
            onOpenChange(false);
            setThreadId("");
            setRole("member");
        } catch (e) {
            toast.error((e as Error).message);
        } finally {
            toast.success("Invitation sent");
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md p-0 overflow-hidden">
                <DialogHeader className="p-4 pb-2">
                    <DialogTitle>Invite to thread</DialogTitle>
                </DialogHeader>

                <Separator />

                <div className="p-4 space-y-4">
                    <div className="text-sm text-muted-foreground flex items-center gap-2">
                        <Mail className="h-3 w-3" />
                        <span className="truncate">{user.email ?? "—"}</span>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm">Thread</label>
                        <Select value={threadId} onValueChange={setThreadId}>
                            <SelectTrigger>
                                <SelectValue placeholder="Choose a thread" />
                            </SelectTrigger>
                            <SelectContent className="max-h-64">
                                {threads.map((t: Thread) => (
                                    <SelectItem key={t._id} value={t._id}>
                                        {t.title}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm">Role</label>
                        <Select value={role} onValueChange={v => setRole(v as "admin" | "member")}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select role" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="member">Member</SelectItem>
                                <SelectItem value="admin">Admin</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <Separator />

                <DialogFooter className="p-4">
                    <Button variant="ghost" onClick={() => onOpenChange(false)} disabled={isPending}>
                        Cancel
                    </Button>
                    <Button onClick={onConfirm} disabled={isPending || !threadId}>
                        {isPending ? "Sending…" : "Send invite"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
