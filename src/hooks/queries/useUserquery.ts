import { userService } from "@/services/userService";
import { useQuery } from "@tanstack/react-query";

export const useGetUsers = (q: string) => {
    return useQuery({
        queryKey: ["users", q],
        queryFn: () => userService.getUsers(q),
    });
};
