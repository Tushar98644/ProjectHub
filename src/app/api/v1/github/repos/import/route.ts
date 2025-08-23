import connectToDB from "@/lib/mongoose";
import { requireAuth } from "@/lib/requireAuth";
import { validateImportRequest, validateSession } from "@/utils/validation";
import { processIntegration } from "@/services/integrationService";
import { threadService } from "@/services/threadService";
import { memberService } from "@/services/memberService";

export async function POST(req: Request) {
    try {
        const session = await requireAuth(req);
        const sessionValidation = validateSession(session);
        if (!sessionValidation.isValid) {
            return Response.json({ message: sessionValidation.error }, { status: 401 });
        }

        await connectToDB();

        const body = await req.json();
        const requestValidation = validateImportRequest(body);
        if (!requestValidation.isValid) {
            return Response.json({ message: requestValidation.error }, { status: 400 });
        }

        const { data, provider } = body;
        const { enableAI = false } = data;
        const tags = Array.isArray(data.tags) ? data.tags : [];

        let thread;

        if (enableAI) {
            const integrationData = await processIntegration(provider, data);
            thread = await threadService.createThreadWithIntegration(integrationData, sessionValidation.email!, tags);
        } else {
            const basicRepoData = {
                id: data.id,
                full_name: data.full_name,
                html_url: data.html_url,
                description: data.description || "",
                provider,
            };

            thread = await threadService.createBasicThread(basicRepoData, sessionValidation.email!, tags);
        }

        await memberService.createThreadAdmin(String(thread._id), thread.title, session.user);

        return Response.json(
            {
                ok: true,
                threadId: String(thread._id),
                title: thread.title,
                aiEnabled: enableAI,
            },
            { status: 201 }
        );
    } catch (err: any) {
        console.error("Error in import API:", err);

        if (err.message.includes("not installed") || err.message.includes("required")) {
            return Response.json(
                {
                    message:
                        "GitHub App installation required for AI features. Please install the app or disable AI features.",
                    requiresApp: true,
                },
                { status: 400 }
            );
        }

        if (err.message.includes("GitHub App") && err.message.includes("AI")) {
            return Response.json(
                {
                    message: "AI features require GitHub App installation. Import without AI or install the app first.",
                    requiresApp: true,
                },
                { status: 400 }
            );
        }

        return Response.json({ message: "Error creating thread" }, { status: 500 });
    }
}
