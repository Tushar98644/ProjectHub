import { threadService } from "@/services/threadService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useFetchThreads = () => {
    return useQuery({
        queryKey: ["threads"],
        queryFn: threadService.getAllThreads,
        staleTime: 5 * 1000 * 60,
    });
};

export const useFetchThread = (id: string) => {
    return useQuery({
        queryKey: ["thread", id],
        queryFn: () => threadService.getThread(id),
        staleTime: 5 * 1000 * 60,
        enabled: !!id,
    });
};

export const useCreateThread = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ projectId, title, description, tags }: any) =>
            threadService.createThread(projectId, title, description, tags),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["threads"] });
        },
    });
};
