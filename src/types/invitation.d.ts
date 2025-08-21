export interface Invite {
    _id: string;
    threadId: string;
    threadTitle: string;
    senderEmail: string;
    receiverEmail: string;
    status?: "PENDING" | "ACCEPTED" | "DECLINED";
    role: "admin" | "member";
    createdAt: string;
    updatedAt: string;
}
