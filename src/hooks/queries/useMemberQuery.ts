import { useQuery } from "@tanstack/react-query";
import { memberService } from "@/services/memberService";

export const useFetchMembers = (threadId?: string) => {
    const hasThreadId = typeof threadId === "string" && threadId.trim().length > 0;

    return useQuery({
        queryKey: hasThreadId ? ["members", threadId] : ["members"],
        queryFn: () => (hasThreadId ? memberService.getMembers(threadId!) : memberService.getTeamMembers()),
        staleTime: 5 * 60 * 1000,
        enabled: hasThreadId ? true : true,
    });
};
