import { Card } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";

export const EmptyState = () => {
    return (
        <Card className="rounded-2xl border bg-background/60 p-8 text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl border">
                <MessageSquare className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-semibold">No messages yet</h3>
            <p className="mt-1 text-sm text-muted-foreground">Start the conversation.</p>
        </Card>
    );
};
