export interface Message {
    _id: string;
    name: string;
    email: string;
    message: string;
    createdAt: Date;
    profileImage?: string;
}
