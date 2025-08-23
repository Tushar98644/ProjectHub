import { threadApi } from "@/lib/api/threadApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useFetchThreads = (email?: string) => {
    return useQuery({
        queryKey: ["threads", email],
        queryFn: () => threadApi.getThreads(email),
        staleTime: 5 * 60 * 1000,
    });
};

export const useFetchThread = (id: string) => {
    return useQuery({
        queryKey: ["thread", id],
        queryFn: () => threadApi.getThread(id),
        staleTime: 5 * 1000 * 60,
        enabled: !!id,
    });
};

export const useCreateThread = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: { title: string; description: string; tags: string[] }) => threadApi.createThread(data),
        onSuccess: () => {
            queryClient.removeQueries({ queryKey: ["threads"] });
            queryClient.invalidateQueries({ queryKey: ["threads"] });
            queryClient.refetchQueries({ queryKey: ["threads"] });
        },
    });
};
