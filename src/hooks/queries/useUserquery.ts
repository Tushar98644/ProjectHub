import { userApi } from "@/lib/api/userApi";
import { useQuery } from "@tanstack/react-query";

export const useGetUsers = (q: string) => {
    return useQuery({
        queryKey: ["users", q],
        queryFn: () => userApi.getUsers(q),
    });
};
