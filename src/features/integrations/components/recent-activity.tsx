export const RecentActivity = () => {
    const activities = [
        {
            event: "push",
            detail: "6 new commits",
            time: "2m ago",
            meta: "Repository: example-repo",
        },
        {
            event: "pull_request",
            detail: "PR opened",
            time: "1h ago",
            meta: "#42: Fix login bug",
        },
        {
            event: "issue",
            detail: "new issue",
            time: "yesterday",
            meta: "Issue: cannot deploy",
        },
    ];

    return (
        <div>
            <label className="text-xs font-medium">Recent Activity</label>
            <div className="mt-2 space-y-2">
                {activities.map((activity, i) => (
                    <div
                        key={i}
                        className="rounded-lg border p-3 bg-background/50"
                    >
                        <div className="flex items-center justify-between mb-1">
                            <div className="text-sm font-medium">
                                {activity.event} — {activity.detail}
                            </div>
                            <div className="text-xs text-muted-foreground">
                                {activity.time}
                            </div>
                        </div>
                        <div className="text-xs text-muted-foreground">
                            {activity.meta}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
