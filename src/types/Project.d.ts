export interface Project {
    _id: string;
    title: string;
    description: string;
    image: string;
    github: string;
    approved: boolean;
    createdAt: Date;
}
