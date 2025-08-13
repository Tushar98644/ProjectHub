import { projectService } from "@/services/projectService";
import { useQuery } from "@tanstack/react-query";

export const useProjectFetchQuery = () => {
    return useQuery({
        queryKey: ["projects"],
        queryFn: projectService.fetchProjects,
        staleTime: 5 * 1000 * 60,
    });
};
