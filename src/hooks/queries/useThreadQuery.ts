import { threadService } from "@/services/threadService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useFetchThreads = (email?: string) => {
    const hasEmail = typeof email === "string" && email.trim().length > 0;

    return useQuery({
        queryKey: ["threads", hasEmail ? { email } : { all: true }],
        queryFn: () => (hasEmail ? threadService.getThreadsByEmail(email!) : threadService.getAllThreads()),
        enabled: hasEmail ? true : true,
        staleTime: 5 * 60 * 1000,
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
