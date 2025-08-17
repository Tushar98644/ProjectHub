export interface Comment {
    _id: string;
    threadId: string;
    author: string;
    authorAvatar: string;
    content: string;
    likes: number;
    createdAt: Date;
    updatedAt: Date;
}
