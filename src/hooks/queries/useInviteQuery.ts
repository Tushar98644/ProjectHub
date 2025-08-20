import inviteService from "@/services/inviteService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useFetchInvites = () => {
    return useQuery({
        queryKey: ["invites"],
        queryFn: () => inviteService.getInvites(),
    });
};

export const useSendInvite = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: { threadId: string; receiverEmail: string; role: "admin" | "member" }) =>
            inviteService.sendInvite(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["invites"] });
        },
    });
};
