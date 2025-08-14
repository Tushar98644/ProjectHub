import { projectService } from "@/services/projectService";
import { Project } from "@/types/project";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useFetchProjects = () => {
    return useQuery({
        queryKey: ["projects"],
        queryFn: projectService.getAllProjects,
        staleTime: 5 * 1000 * 60,
    });
};

export const useFetchProjectById = (id: string) => {
    return useQuery({
        queryKey: ["project", id],
        queryFn: () => projectService.getProject(id),
        staleTime: 5 * 1000 * 60,
    });
};

export const useCreateProject = () => {
    return useMutation({
        mutationKey: ["newProject"],
        mutationFn: (project: Project) => projectService.createProject(project),
    });
};
