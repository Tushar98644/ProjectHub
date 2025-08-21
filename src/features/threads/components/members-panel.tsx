import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Member } from "@/types/member";
import { timeAgo } from "@/utils/timeAgo";

export const MembersPanel = ({ members }: { members: Member[] }) => {
    if (!members?.length) {
        return <p className="text-xs text-muted-foreground">No members</p>;
    }
    return (
        <ul className="space-y-2 max-h-[70vh] overflow-y-auto pr-1">
            {members.map(m => (
                <li key={m.email}>
                    <Card className="p-2">
                        <div className="flex items-center gap-2">
                            <img
                                src={m.avatar || "/assets/logo.png"}
                                alt={m.name || m.email}
                                className="h-8 w-8 rounded-full object-cover"
                            />
                            <div className="min-w-0">
                                <p className="text-sm font-medium truncate">{m.name || m.email}</p>
                                <div className="flex items-center gap-2">
                                    <span className="text-[11px] text-muted-foreground truncate">{m.email}</span>
                                </div>
                                <div className="mt-1 flex items-center gap-2">
                                    <Badge variant="secondary" className="text-[10px]">
                                        {m.role || "member"}
                                    </Badge>
                                    {m.createdAt && (
                                        <span className="text-[10px] text-muted-foreground">
                                            Joined {timeAgo(String(m.createdAt))}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </Card>
                </li>
            ))}
        </ul>
    );
};
