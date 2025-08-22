import { Thread } from "@/db/models";
import Comment from "@/db/models/comment";
import { getInstallationAccessToken } from "@/lib/githubApp";
import { generateCommitSummary, generatePRSummary } from "./aiService";
import { formatCommitComment, formatPRComment } from "@/utils/commentFormatters";
import { githubService } from "./githubService";

export const handlePushEvent = async (payload: any, thread: any): Promise<void> => {
    const installationId = payload.installation?.id;
    const repoFullName = payload.repository?.full_name;

    const token = await getInstallationAccessToken(installationId);

    for (const commit of payload.commits || []) {
        const diffUrl = `${commit.url}.diff`;
        const diff = await githubService.fetchDiff(diffUrl, token);
        const aiSummary = await generateCommitSummary(commit, diff, repoFullName);
        const formattedComment = formatCommitComment(commit, aiSummary, repoFullName);

        await Comment.create({
            threadId: String(thread._id),
            author: "AI Assistant",
            authorAvatar: "https://www.shutterstock.com/image-vector/chat-bot-icon-virtual-smart-600nw-2478937555.jpg",
            content: formattedComment,
        });
    }
};

export const handlePullRequestEvent = async (payload: any, thread: any): Promise<void> => {
    const installationId = payload.installation?.id;
    const repoFullName = payload.repository?.full_name;
    const pr = payload.pull_request;

    const token = await getInstallationAccessToken(installationId);
    const diff = await githubService.fetchDiff(pr.diff_url, token);
    const aiSummary = await generatePRSummary(pr, payload.action, diff, repoFullName);
    const formattedComment = formatPRComment(pr, payload.action, aiSummary, repoFullName);

    await Comment.create({
        threadId: String(thread._id),
        author: "AI Assistant",
        authorAvatar: "https://www.shutterstock.com/image-vector/chat-bot-icon-virtual-smart-600nw-2478937555.jpg",
        content: formattedComment,
    });
};
