import { commentService } from "@/services/commentService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const commentKeys = {
    list: (threadId: string) => ["comments", threadId] as const,
};

export const useCommentsQuery = (threadId: string) => {
    return useQuery({
        queryKey: commentKeys.list(threadId),
        queryFn: () => commentService.getComments(threadId),
        staleTime: 1 * 1000 * 60,
    });
};

export const useCommentsMuation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ content, threadId }: { content: string; threadId: string }) =>
            commentService.createComment(content, threadId),
        onSuccess: (_, { threadId }) => {
            queryClient.invalidateQueries({
                queryKey: commentKeys.list(threadId),
            });
        },
    });
};
