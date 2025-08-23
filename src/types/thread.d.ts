import { Comment } from "./comment";

export interface Thread {
    _id: string;
    author: string;
    title: string;
    description: string;
    tags: string[];
    likes: number;
    popular: boolean;
    isPublic: boolean;
    integration?: Object;
    createdAt: Date;
    updatedAt: Date;
}
