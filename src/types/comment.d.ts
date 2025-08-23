export interface Comment {
    _id: string;
    threadId: string;
    author: string;
    authorAvatar: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
}
