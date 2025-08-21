export interface Member {
    _id: string;
    threadId: string;
    threadTitle: string;
    email: string;
    name: string;
    avatar: string;
    authorEmail: string;
    role?: "member" | "admin";
    createdAt: Date;
    updatedAt: Date;
}
