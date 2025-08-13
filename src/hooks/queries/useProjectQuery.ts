import { userService } from "@/services/userService";
import { useQuery } from "@tanstack/react-query";

export const useProjectFetchQuery = () => {
    return useQuery({
        queryKey: ["projects"],
        queryFn: userService.fetchProjects,
        staleTime: 5 * 1000 * 60,
    });
};
