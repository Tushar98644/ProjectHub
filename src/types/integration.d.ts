export interface Integration {
    provider: string;
    githubId?: string;
    githubOwner?: string;
    githubRepo?: string;
    githubUrl?: string;
    slackTeamId?: string;
    slackChannelId?: string;
    slackChannelName?: string;
}
