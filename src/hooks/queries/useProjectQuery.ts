import { projectService } from "@/services/projectService";
import { Project } from "@/types/project";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useFetchProjects = () => {
    return useQuery({
        queryKey: ["projects"],
        queryFn: projectService.getAllProjects,
        staleTime: 5 * 1000 * 60,
    });
};

export const useFetchProject = (id: string) => {
    return useQuery({
        queryKey: ["project", id],
        queryFn: () => projectService.getProject(id),
        staleTime: 5 * 1000 * 60,
    });
};

export const useCreateProject = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (project: Project) => projectService.createProject(project),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["projects"] });
        },
    });
};
