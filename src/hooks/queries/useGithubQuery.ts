import { githubService } from "@/services/githubService";
import { useQuery } from "@tanstack/react-query";

export const useFetchRepos = () => {
    return useQuery({
        queryKey: ["github"],
        queryFn: githubService.getAllRepos,
        staleTime: 1 * 60 * 1000 * 60,
    });
};
