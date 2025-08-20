export interface Member {
    email: string;
    name?: string;
    avatar?: string;
    role?: "member" | "admin";
    joinedAt?: string | Date;
}
