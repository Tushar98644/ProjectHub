export interface Project {
    _id: string;
    title: string;
    description: string;
    image: string;
    github: string;
    approved: boolean;
    name: string;
    tags: string[];
    createdAt: Date;
    discussion: function;
    isPublic?: boolean;
}
