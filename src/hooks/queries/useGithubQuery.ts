import { githubService } from "@/services/githubService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useFetchRepos = () => {
    return useQuery({
        queryKey: ["github"],
        queryFn: githubService.getAllRepos,
        staleTime: 1 * 60 * 1000 * 60,
    });
};

export const useImportRepo = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ provider, data }: { provider: string; data: any }) => githubService.importRepo(provider, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["github"] });
        },
    });
};
