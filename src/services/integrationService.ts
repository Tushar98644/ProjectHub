import { getInstallationId } from "@/lib/githubApp";

export interface IntegrationData {
    provider: string;
    title: string;
    description: string;
    integration: Record<string, any>;
}

export const processGitHubIntegration = async (data: any): Promise<IntegrationData> => {
    if (!data.full_name || !data.html_url) {
        throw new Error("For GitHub, data.full_name and data.html_url are required");
    }

    const fullName = data.full_name;
    const [owner, name] = fullName.includes("/") ? fullName.split("/") : ["", fullName];

    const installationId = await getInstallationId(owner, name);
    if (!installationId) {
        throw new Error(`GitHub App is not installed on repository ${fullName}`);
    }

    return {
        provider: "github",
        title: `${name} • GitHub`,
        description: data.description || "",
        integration: {
            provider: "github",
            githubOwner: owner || "",
            githubRepo: name || "",
            githubUrl: data.html_url,
            githubId: String(data.id),
        },
    };
};

export const processSlackIntegration = (data: any): IntegrationData => {
    const channelName = data.channelName || data.name || "";

    return {
        provider: "slack",
        title: `${channelName || "Slack Channel"} • Slack`,
        description: data.description || "",
        integration: {
            provider: "slack",
            slackTeamId: data.teamId || "",
            slackChannelId: data.channelId || "",
            slackChannelName: channelName,
        },
    };
};

export const processIntegration = async (provider: string, data: any): Promise<IntegrationData> => {
    switch (provider) {
        case "github":
            return await processGitHubIntegration(data);
        case "slack":
            return processSlackIntegration(data);
        default:
            throw new Error("Unsupported provider");
    }
};
