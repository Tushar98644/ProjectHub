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
    });
};

export const useCreateThread = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ["newThread"],
        mutationFn: thread => threadService.createThread(thread),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["threads"] });
        },
    });
};
