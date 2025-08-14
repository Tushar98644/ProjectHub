import { discussionService } from "@/services/discussionService";
import { useQuery } from "@tanstack/react-query";

export const useFetchDiscussionById = (id: string) => {
    return useQuery({
        queryKey: ["discussions"],
        queryFn: () => discussionService.getDiscussion(id),
        staleTime: 5 * 1000 * 60,
    });
};
