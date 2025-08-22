import { Octokit } from "@octokit/rest";
import { createAppAuth } from "@octokit/auth-app";

export const createGitHubApp = () => {
    const privateKey = (process.env.GITHUB_APP_PRIVATE_KEY || "").replace(/\\n/g, "\n");

    if (!process.env.GITHUB_APP_ID || !privateKey) {
        throw new Error("GITHUB_APP_ID or GITHUB_APP_PRIVATE_KEY not configured");
    }

    return new Octokit({
        authStrategy: createAppAuth,
        auth: {
            appId: Number(process.env.GITHUB_APP_ID),
            privateKey,
        },
        userAgent: "Insentra/1.0",
    });
};

export const getInstallationAccessToken = async (installationId: number): Promise<string> => {
    const appOctokit = createGitHubApp();
    const resp = await appOctokit.request("POST /app/installations/{installation_id}/access_tokens", {
        installation_id: installationId,
    });
    return resp.data.token;
};
