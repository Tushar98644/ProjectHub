"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useGetUsers } from "@/hooks/queries/useUserquery";
import { User } from "@/types/user";
import { UserItem } from "@/features/users/components/user-item";
import { useDebounced } from "@/hooks/useDebounced";

const SearchUsersPage = () => {
    const [q, setQ] = useState("");
    const debouncedQ = useDebounced(q, 350);

    const { data: users = [], isPending } = useGetUsers(debouncedQ);

    const hasQuery = debouncedQ.trim().length > 0;

    const list = useMemo(() => users.map((u: User) => <UserItem key={u._id} u={u} />), [users]);

    const onSubmit: React.FormEventHandler<HTMLFormElement> = e => {
        e.preventDefault();
    };

    return (
        <div className="p-4 sm:p-6 max-w-4xl mx-auto">
            <h2 className="text-xl font-semibold mb-4">Search users</h2>

            <form onSubmit={onSubmit} className="mb-4 flex gap-2 sm:gap-3">
                <Input
                    placeholder="Search by name, username or email..."
                    value={q}
                    onChange={e => setQ(e.target.value)}
                    className="flex-1"
                />
                <Button type="submit" disabled={isPending || q.trim().length === 0}>
                    {isPending ? "Searching…" : "Search"}
                </Button>
            </form>

            <div className="space-y-3">
                {isPending && !users.length && <div className="text-sm text-muted-foreground">Searching…</div>}

                {!isPending && hasQuery && users.length === 0 && (
                    <div className="text-sm text-muted-foreground">No users found.</div>
                )}

                {list}
            </div>
        </div>
    );
};

export default SearchUsersPage;
