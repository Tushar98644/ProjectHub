import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { User } from "@/types/user";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { Card } from "iconsax-reactjs";
import { Mail, UsersIcon } from "lucide-react";

export const UserItem = ({ u }: { u: User }) => {
    return (
        <Card key={u._id} className="p-0">
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
                    <Button size="sm" onClick={() => {}}>
                        <UsersIcon className="mr-2 h-3 w-3" /> Invite to team
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => {}}>
                        Invite to thread
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};
