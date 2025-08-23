import { projectApi } from "@/lib/api/projectApi";
import { Project } from "@/types/project";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useFetchProjects = () => {
    return useQuery({
        queryKey: ["projects"],
        queryFn: projectApi.getProjects,
        staleTime: 5 * 1000 * 60,
    });
};

export const useFetchProject = (id: string) => {
    return useQuery({
        queryKey: ["project", id],
        queryFn: () => projectApi.getProject(id),
        staleTime: 5 * 1000 * 60,
    });
};

export const useCreateProject = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (project: Project) => projectApi.createProject(project),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["projects"] });
        },
    });
};
