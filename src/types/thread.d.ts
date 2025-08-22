import { Comment } from "./comment";

export interface Thread {
    _id: string;
    projectId: string;
    author: string;
    title: string;
    description: string;
    comments: Comment[];
    tags: string[];
    likes: number;
    popular: boolean;
    isPublic: boolean;
    integration: any;
    createdAt: Date;
    updatedAt: Date;
}
