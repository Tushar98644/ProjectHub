import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_API_KEY,
});

export const generateCommitSummary = async (commit: any, diff: string, repoFullName: string): Promise<string> => {
    const prompt = `
Analyze this commit and provide a concise summary of what changed:

Repository: ${repoFullName}
Commit Message: ${commit.message}
Author: ${commit.author?.name}

Code Changes:
${diff}

Please provide a brief, technical summary of what this commit does. Focus on:
1. What functionality was added/changed/removed
2. Key technical changes shown in the code changes
3. Impact on the codebase

Keep it under 150 words and use simple, clear language.`;

    const stream = await ai.models.generateContentStream({
        model: "gemini-2.5-flash",
        contents: prompt,
    });

    let result = "";
    for await (const chunk of stream) {
        if (chunk.text) result += chunk.text;
    }
    return result;
};

export const generatePRSummary = async (
    pr: any,
    action: string,
    diff: string,
    repoFullName: string
): Promise<string> => {
    const prompt = `
Analyze this pull request and provide a concise summary:

Repository: ${repoFullName}
PR Title: ${pr.title}
Action: ${action}
Description: ${pr.body || "No description"}

Code Changes:
${diff}

Please provide a brief summary covering:
1. What this PR accomplishes
2. Key changes made showing the code changes
3. Potential impact

Keep it under 200 words and use clear, non-technical language when possible.`;

    const stream = await ai.models.generateContentStream({
        model: "gemini-2.5-flash",
        contents: prompt,
    });

    let result = "";
    for await (const chunk of stream) {
        if (chunk.text) result += chunk.text;
    }
    return result;
};
