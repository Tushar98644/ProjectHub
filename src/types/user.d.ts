export interface User {
    _id: string;
    name: string;
    email: string;
    emailVerified: boolean;
    image: string;
    createdAt: Date;
    updatedAt: Date;
    // integrations: {
    //     github: boolean;
    //     slack: boolean;
    // };
}
