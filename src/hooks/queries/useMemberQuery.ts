import { useQuery } from "@tanstack/react-query";
import { memberApi } from "@/lib/api/memberApi";

export const useFetchMembers = (threadId?: string) => {
    return useQuery({
        queryKey: ["members", threadId],
        queryFn: () => memberApi.getMembers(threadId),
        staleTime: 5 * 60 * 1000,
    });
};
