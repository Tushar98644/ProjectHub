export interface ImportRequestBody {
    data: any;
    provider: string;
}

export const validateImportRequest = (body: any): { isValid: boolean; error?: string } => {
    const { data, provider } = body || {};

    if (!data || !provider) {
        return { isValid: false, error: "provider and data are required" };
    }

    return { isValid: true };
};

export const validateSession = (session: any): { isValid: boolean; error?: string; email?: string } => {
    if (!session) {
        return { isValid: false, error: "Unauthorized" };
    }

    const email = session.user?.email as string;
    if (!email) {
        return { isValid: false, error: "Invalid session" };
    }

    return { isValid: true, email };
};
