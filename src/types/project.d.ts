export interface Project {
    _id: string;
    title: string;
    description: string;
    image: string;
    github: string;
    approved: boolean;
    author: string;
    tags: string[];
    createdAt: Date;
    discussion: function;
    isPublic?: boolean;
    status?: "active" | "completed" | "in-progress";
    authorAvatar?: string;
    lastUpdated?: string;
    likes?: number;
    comments?: number;
    views?: number;
    stars?: number;
}
