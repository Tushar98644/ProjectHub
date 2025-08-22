import jwt from "jsonwebtoken";

export function generateAppToken(): string {
    const privateKey = process.env.GITHUB_APP_PRIVATE_KEY?.replace(/\\n/g, "\n") || "";
    const appId = process.env.GITHUB_APP_ID || "";

    return jwt.sign(
        {
            iat: Math.floor(Date.now() / 1000) - 60,
            exp: Math.floor(Date.now() / 1000) + 600,
            iss: appId,
        },
        privateKey,
        { algorithm: "RS256" }
    );
}

export async function getInstallationToken(installationId: string): Promise<string> {
    const appToken = generateAppToken();

    const response = await fetch(`https://api.github.com/app/installations/${installationId}/access_tokens`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${appToken}`,
            Accept: "application/vnd.github+json",
        },
    });

    const data = await response.json();
    return data.token;
}

export async function createWebhook(repoFullName: string, installationId: string): Promise<any> {
    const installationToken = await getInstallationToken(installationId);
    const webhookUrl = `${process.env.BETTER_AUTH_URL}/api/v1/github/webhook`;
    const secret = process.env.GITHUB_WEBHOOK_SECRET;

    const response = await fetch(`https://api.github.com/repos/${repoFullName}/hooks`, {
        method: "POST",
        headers: {
            Authorization: `token ${installationToken}`,
            Accept: "application/vnd.github+json",
        },
        body: JSON.stringify({
            config: {
                url: webhookUrl,
                content_type: "json",
                secret: secret,
            },
            events: ["push", "pull_request"],
            active: true,
        }),
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(`Failed to create webhook: ${error.message}`);
    }

    return response.json();
}
