import { User } from "@/types/user";
import { BetterAuthPlugin } from "better-auth";
import { createAuthEndpoint } from "better-auth/api";

export const userSearchPlugin = (): BetterAuthPlugin => ({
    id: "user-search",
    endpoints: {
        searchUsers: createAuthEndpoint("/users", { method: "GET" }, async ctx => {
            const url = new URL(ctx?.request?.url as string);
            const q = url.searchParams.get("query")?.trim() || "";

            if (!q) return ctx.json([]);

            const byName = (await ctx.context.adapter.findMany({
                model: "user",
                where: [{ field: "name", operator: "contains", value: q }],
                limit: 20,
            })) as User[];

            const byEmail = (await ctx.context.adapter.findMany({
                model: "user",
                where: [{ field: "email", operator: "contains", value: q }],
                limit: 20,
            })) as User[];

            const users = [...byName, ...byEmail].filter(
                (u, idx, arr) => arr.findIndex(x => x.email === u.email) === idx
            );

            return ctx.json(users);
        }),
    },
});
