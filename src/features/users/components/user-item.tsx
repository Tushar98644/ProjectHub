import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, UsersIcon } from "lucide-react";
import { User } from "@/types/user";
import { InviteDialog } from "./invite-dialog";

export const UserItem = ({ u }: { u: User }) => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Card key={u._id} className="p-0 text-sm">
                <CardContent className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-3">
                    <div className="flex items-center gap-3 min-w-0">
                        <Avatar className="h-10 w-10 shrink-0">
                            {u.image ? (
                                <AvatarImage src={u.image} />
                            ) : (
                                <AvatarFallback>{(u.name || "User").slice(0, 2)}</AvatarFallback>
                            )}
                        </Avatar>
                        <div className="min-w-0">
                            <div className="font-medium truncate">{u.name ?? "Unnamed"}</div>
                            <div className="text-xs text-muted-foreground flex items-center gap-2 truncate">
                                <Mail className="h-3 w-3 shrink-0" />
                                <span className="truncate">{u.email ?? "—"}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-2 flex-wrap">
                        <Button size="sm" className="text-xs" onClick={() => setOpen(true)}>
                            <UsersIcon className="mr-2 h-3 w-3" /> Invite
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <InviteDialog open={open} onOpenChange={setOpen} user={u} />
        </>
    );
};
