export interface Project {
    _id?: string;
    title: string;
    description: string;
    image: string;
    githubUrl: string;
    liveUrl?: string;
    approved?: boolean;
    author: string;
    tags?: string[];
    techStack: string[];
    createdAt?: Date;
    isPublic?: boolean;
    status: string;
    authorAvatar: string;
    lastUpdated?: Date;
    likes?: number;
    comments?: number;
    views?: number;
    stars?: number;
}
