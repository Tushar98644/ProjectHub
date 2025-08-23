import { commentApi } from "@/lib/api/commentApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const commentKeys = {
    list: (threadId: string) => ["comments", threadId] as const,
};

export const useGetComments = (threadId: string) => {
    return useQuery({
        queryKey: commentKeys.list(threadId),
        queryFn: () => commentApi.getComments(threadId),
        staleTime: 1 * 1000 * 60,
    });
};

export const useCreateComment = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ content, threadId }: { content: string; threadId: string }) =>
            commentApi.createComment(content, threadId),
        onSuccess: (_, { threadId }) => {
            queryClient.invalidateQueries({
                queryKey: commentKeys.list(threadId),
            });
        },
    });
};
