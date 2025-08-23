import { inviteApi } from "@/lib/api/inviteApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useFetchInvites = () => {
    return useQuery({
        queryKey: ["invites"],
        queryFn: () => inviteApi.getInvites(),
    });
};

export const useSendInvite = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: {
            threadId: string;
            threadTitle: string;
            receiverEmail: string;
            role: "admin" | "member";
        }) => inviteApi.sendInvite(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["invites"] });
        },
    });
};

export const useAcceptInvite = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (invitationId: string) => inviteApi.acceptInvite(invitationId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["invites"] });
        },
    });
};

export const useDeclineInvite = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (invitationId: string) => inviteApi.declineInvite(invitationId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["invites"] });
        },
    });
};
