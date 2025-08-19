"use client";

import { useMemo, useState, useEffect } from "react";
import { Github, Cloud, Link } from "lucide-react";
import { IntegrationsList } from "@/features/integrations/components/integrations-list";
import { IntegrationDetail } from "@/features/integrations/components/integration-detail";
import { linkSocial } from "@/config/auth/client";

const integrations = [
    {
        id: "github",
        name: "GitHub",
        description: "Repository events, PRs, issues and CI status",
        connected: false,
        webhookUrl: "https://hooks.example.com/github/abcd",
        logo: Github,
        category: "Development",
        events: ["push", "pull_request", "issues"],
    },
    {
        id: "slack",
        name: "Slack",
        description: "Messages, channel events and app interactions",
        connected: false,
        webhookUrl: "https://hooks.example.com/slack/xyz",
        logo: Link,
        category: "Communication",
        events: ["message_posted", "channel_created"],
    },
];

export default function IntegrationsPage() {
    const [query, setQuery] = useState("");
    const [selected, setSelected] = useState<string>("github");
    const [isLoading, setIsLoading] = useState(false);

    const selectedIntegration = integrations.find(i => i.id === selected) || integrations[0];
    const [localWebhook, setLocalWebhook] = useState(selectedIntegration.webhookUrl);
    const [enabledEvents, setEnabledEvents] = useState<string[]>(selectedIntegration.events);

    useEffect(() => {
        setLocalWebhook(selectedIntegration.webhookUrl);
        setEnabledEvents(selectedIntegration.events);
    }, [selected, selectedIntegration]);

    const filteredIntegrations = useMemo(
        () =>
            integrations.filter(it =>
                (it.name + it.description + it.category).toLowerCase().includes(query.toLowerCase())
            ),
        [query]
    );

    const mockAction = async (message: string) => {
        setIsLoading(true);
        await new Promise(r => setTimeout(r, 500));
        setIsLoading(false);
        alert(message);
    };

    const connectIntegration = async () =>
        await linkSocial({
            provider: "github",
        });

    return (
        <div className="h-full bg-gradient-to-b from-background via-background to-background">
            <div className="flex flex-col md:flex-row gap-6 pt-3 md:px-8 overflow-scroll">
                {/* Left Sidebar */}
                <IntegrationsList
                    query={query}
                    setQuery={setQuery}
                    integrations={filteredIntegrations}
                    selected={selected}
                    setSelected={setSelected}
                />

                {/* Right Detail Panel */}
                <IntegrationDetail
                    integration={selectedIntegration}
                    webhookUrl={localWebhook}
                    setWebhookUrl={setLocalWebhook}
                    enabledEvents={enabledEvents}
                    setEnabledEvents={setEnabledEvents}
                    onAction={mockAction}
                    isLoading={isLoading}
                />
            </div>
        </div>
    );
}
