import { Comment } from "./comment";

export interface Thread {
    _id: string;
    projectId: string;
    author: string;
    title: string;
    description: string;
    comments: Comment[];
    popular: boolean;
    createdAt: Date;
    updatedAt: Date;
}
