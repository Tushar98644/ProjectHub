"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Github, MessageSquare, Calendar, Database, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { linkSocial } from "@/config/auth/client";

const availableIntegrations = [
    {
        id: "github",
        name: "GitHub",
        description: "Sync repository events, PRs, and issues",
        logo: Github,
        status: "available",
        category: "Development",
        color: "bg-gray-900",
    },
    {
        id: "slack",
        name: "Slack",
        description: "Team communication and notifications",
        logo: MessageSquare,
        status: "coming-soon",
        category: "Communication",
        color: "bg-purple-600",
    },
    {
        id: "calendar",
        name: "Google Calendar",
        description: "Schedule and meeting integrations",
        logo: Calendar,
        status: "coming-soon",
        category: "Productivity",
        color: "bg-blue-600",
    },
    {
        id: "notion",
        name: "Notion",
        description: "Document and workspace sync",
        logo: Database,
        status: "coming-soon",
        category: "Productivity",
        color: "bg-gray-800",
    },
];

const IntegrationsPage = () => {
    const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});
    const router = useRouter();

    const handleConnect = async (integration: (typeof availableIntegrations)[0]) => {
        if (integration.status !== "available") return;

        setLoadingStates(prev => ({ ...prev, [integration.id]: true }));

        try {
            console.log(`Initiating ${integration.name} connection...`);

            if (integration.id === "github") {
                linkSocial({
                    provider: "github",
                    callbackURL: `${window.location.origin}/dashboard/integrations/github/`,
                });
            }
        } catch (error) {
            console.error(`Failed to connect to ${integration.name}:`, error);
            alert(`Connection to ${integration.name} failed. Please try again.`);
            setLoadingStates(prev => ({ ...prev, [integration.id]: false }));
        }
    };

    return (
        <div className="p-2 sm:p-2 h-full">
            <div className="max-w-4xl mx-auto">
                <Card className="border-0 bg-card/70 backdrop-blur">
                    <CardContent className="p-4 sm:p-6">
                        {/* Header */}
                        <div className="mb-4">
                            <h1 className="text-lg font-semibold mb-1">Integrations</h1>
                            <p className="text-sm text-muted-foreground">
                                Connect your favorite tools and services to streamline your workflow
                            </p>
                        </div>

                        {/* Stats */}
                        <div className="grid gap-3 md:grid-cols-3 mb-4">
                            <Card className="p-3">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-xs font-medium text-muted-foreground">Available</p>
                                        <p className="text-lg font-semibold">
                                            {availableIntegrations.filter(i => i.status === "available").length}
                                        </p>
                                    </div>
                                    <Zap className="h-4 w-4 text-muted-foreground" />
                                </div>
                            </Card>
                            <Card className="p-3">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-xs font-medium text-muted-foreground">Coming Soon</p>
                                        <p className="text-lg font-semibold">
                                            {availableIntegrations.filter(i => i.status === "coming-soon").length}
                                        </p>
                                    </div>
                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                </div>
                            </Card>
                            <Card className="p-3">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-xs font-medium text-muted-foreground">Connected</p>
                                        <p className="text-lg font-semibold">0</p>
                                    </div>
                                    <Database className="h-4 w-4 text-muted-foreground" />
                                </div>
                            </Card>
                        </div>

                        {/* Integrations */}
                        <div className="space-y-3">
                            <h2 className="font-medium">Available Integrations</h2>
                            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                                {availableIntegrations.map(integration => {
                                    const isLoading = loadingStates[integration.id] || false;
                                    const isAvailable = integration.status === "available";

                                    return (
                                        <Card key={integration.id} className="p-3">
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="flex items-center gap-2">
                                                    <div className={`p-1.5 rounded-md ${integration.color} text-white`}>
                                                        <integration.logo className="h-4 w-4" />
                                                    </div>
                                                    <div>
                                                        <h3 className="font-medium text-sm">{integration.name}</h3>
                                                        <Badge
                                                            variant={isAvailable ? "default" : "secondary"}
                                                            className="text-xs h-4"
                                                        >
                                                            {integration.status === "available"
                                                                ? "Available"
                                                                : "Coming Soon"}
                                                        </Badge>
                                                    </div>
                                                </div>
                                            </div>
                                            <p className="text-xs text-muted-foreground mb-3">
                                                {integration.description}
                                            </p>
                                            <Button
                                                onClick={() => handleConnect(integration)}
                                                disabled={!isAvailable || isLoading}
                                                className="w-full"
                                                size="sm"
                                                variant={isAvailable ? "default" : "outline"}
                                            >
                                                {isLoading ? (
                                                    <span className="animate-pulse">Connecting...</span>
                                                ) : isAvailable ? (
                                                    "Connect"
                                                ) : (
                                                    "Coming Soon"
                                                )}
                                            </Button>
                                        </Card>
                                    );
                                })}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default IntegrationsPage;
