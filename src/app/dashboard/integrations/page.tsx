"use client";

import { useMemo, useState, useEffect } from "react";
import PageContent from "@/components/layout/navbar/page-content";
import {
    PageNavbarLeftContent,
    PageNavbarRightContent,
} from "@/components/layout/navbar/page-navbar";
import Navbar from "@/components/layout/navbar/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
    Search,
    Plus,
    Settings,
    Bell,
    Github,
    Cloud,
    Link,
} from "lucide-react";
import clsx from "clsx";

const integrations = [
    {
        id: "github",
        name: "GitHub",
        description: "Repository events, PRs, issues and CI status",
        connected: true,
        webhookUrl: "https://hooks.example.com/github/abcd",
        logo: Github,
        category: "Development",
        events: ["push", "pull_request", "issues"],
    },
    {
        id: "gdrive",
        name: "Google Drive",
        description: "File changes, new uploads and shared file events",
        connected: false,
        webhookUrl: "",
        logo: Cloud,
        category: "Storage",
        events: ["file_created", "file_deleted", "file_shared"],
    },
    {
        id: "stripe",
        name: "Stripe",
        description: "Payments, subscriptions and invoice events",
        connected: false,
        webhookUrl: "",
        logo: Link,
        category: "Finance",
        events: ["invoice.paid", "payment_intent.succeeded"],
    },
    {
        id: "slack",
        name: "Slack",
        description: "Messages, channel events and app interactions",
        connected: true,
        webhookUrl: "https://hooks.example.com/slack/xyz",
        logo: Link,
        category: "Communication",
        events: ["message_posted", "channel_created"],
    },
    {
        id: "slac",
        name: "Slack",
        description: "Messages, channel events and app interactions",
        connected: true,
        webhookUrl: "https://hooks.example.com/slack/xyz",
        logo: Link,
        category: "Communication",
        events: ["message_posted", "channel_created"],
    },
    {
        id: "sla",
        name: "Slack",
        description: "Messages, channel events and app interactions",
        connected: true,
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

    const selectedIntegration =
        integrations.find(i => i.id === selected) || integrations[0];
    const [localWebhook, setLocalWebhook] = useState(
        selectedIntegration.webhookUrl
    );
    const [enabledEvents, setEnabledEvents] = useState<string[]>(
        selectedIntegration.events
    );

    useEffect(() => {
        setLocalWebhook(selectedIntegration.webhookUrl);
        setEnabledEvents(selectedIntegration.events);
    }, [selected, selectedIntegration]);

    const filteredIntegrations = useMemo(
        () =>
            integrations.filter(it =>
                (it.name + it.description + it.category)
                    .toLowerCase()
                    .includes(query.toLowerCase())
            ),
        [query]
    );

    const mockAction = async (message: string) => {
        setIsLoading(true);
        await new Promise(r => setTimeout(r, 500));
        setIsLoading(false);
        alert(message);
    };

    return (
        <div className="flex flex-col h-screen bg-gradient-to-b from-background via-background to-background">
            <Navbar>
                <PageNavbarLeftContent>
                    <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl border bg-card/70">
                            <Settings size={16} className="text-primary" />
                        </div>
                        <div>
                            <h1 className="text-sm font-semibold">
                                Integrations
                            </h1>
                            <p className="text-xs text-muted-foreground">
                                Connect apps and configure webhooks
                            </p>
                        </div>
                    </div>
                </PageNavbarLeftContent>

                <PageNavbarRightContent className="gap-1">
                    <Button variant="ghost" size="icon" className="rounded-lg">
                        <Search size={16} />
                    </Button>
                    <Button variant="ghost" size="icon" className="rounded-lg">
                        <Bell size={16} />
                    </Button>
                    <Button size="sm" className="gap-2 rounded-lg">
                        <Plus size={16} />
                        <span className="hidden sm:inline">Add</span>
                    </Button>
                </PageNavbarRightContent>
            </Navbar>

            <div className="p-4 md:p-6 h-full overflow-hidden">
                <div className="h-full max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6 h-full pt-5">
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
            </div>
        </div>
    );
}

function IntegrationsList({
    query,
    setQuery,
    integrations,
    selected,
    setSelected,
}: any) {
    return (
        <div className="flex flex-col h-full min-h-0">
            <Card className="border-0 bg-card/70 backdrop-blur flex-1 flex flex-col min-h-0">
                <CardContent className="p-4 flex flex-col h-full min-h-0">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4 flex-shrink-0">
                        <h2 className="text-sm font-semibold">
                            Available Integrations
                        </h2>
                        <Badge variant="secondary">{integrations.length}</Badge>
                    </div>

                    {/* Search */}
                    <div className="relative mb-4 flex-shrink-0">
                        <Input
                            placeholder="Search integrations..."
                            value={query}
                            onChange={e => setQuery(e.target.value)}
                            className="pl-10 rounded-lg"
                        />
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    </div>

                    {/* Scrollable list */}
                    <ScrollArea className="flex-1 min-h-0">
                        <div className="space-y-2 pr-2">
                            {integrations.map((it: any) => (
                                <button
                                    key={it.id}
                                    onClick={() => setSelected(it.id)}
                                    className={clsx(
                                        "w-full rounded-lg p-3 text-left flex items-start gap-3 transition-colors",
                                        selected === it.id
                                            ? "bg-primary/10 border border-primary/20"
                                            : "hover:bg-background/50 border border-transparent"
                                    )}
                                >
                                    <div className="flex h-8 w-8 min-w-[32px] items-center justify-center rounded-lg bg-muted/20">
                                        <it.logo className="h-4 w-4" />
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between gap-2 mb-1">
                                            <h3 className="text-sm font-medium truncate">
                                                {it.name}
                                            </h3>
                                            <div
                                                className={clsx(
                                                    "h-2 w-2 rounded-full flex-shrink-0",
                                                    it.connected
                                                        ? "bg-green-500"
                                                        : "bg-muted-foreground/30"
                                                )}
                                            />
                                        </div>
                                        <p className="text-xs text-muted-foreground line-clamp-2">
                                            {it.description}
                                        </p>
                                        <Badge
                                            variant="outline"
                                            className="mt-1 text-xs h-5"
                                        >
                                            {it.category}
                                        </Badge>
                                    </div>
                                </button>
                            ))}
                        </div>
                        {/* <ScrollBar orientation="vertical" className="hidden opacity-0"/> */}
                    </ScrollArea>
                </CardContent>
            </Card>
        </div>
    );
}

function IntegrationDetail({
    integration,
    webhookUrl,
    setWebhookUrl,
    enabledEvents,
    setEnabledEvents,
    onAction,
    isLoading,
}: any) {
    const toggleEvent = (eventName: string) => {
        setEnabledEvents((prev: string[]) =>
            prev.includes(eventName)
                ? prev.filter(e => e !== eventName)
                : [...prev, eventName]
        );
    };

    return (
        <ScrollArea className="h-full">
            <div className="space-y-4 pr-2">
                <Card className="border-0 bg-card/70 backdrop-blur">
                    <CardContent className="p-6">
                        <div className="flex items-start justify-between gap-4 mb-6">
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                                    <integration.logo className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold">
                                        {integration.name}
                                    </h2>
                                    <p className="text-sm text-muted-foreground mt-1">
                                        {integration.description}
                                    </p>
                                </div>
                            </div>

                            {integration.connected ? (
                                <Button
                                    size="sm"
                                    onClick={() =>
                                        onAction(
                                            `Disconnected ${integration.name}`
                                        )
                                    }
                                    disabled={isLoading}
                                    className="rounded-lg bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                                >
                                    Disconnect
                                </Button>
                            ) : (
                                <Button
                                    size="sm"
                                    onClick={() =>
                                        onAction(
                                            `Connected ${integration.name}`
                                        )
                                    }
                                    disabled={isLoading}
                                    className="rounded-lg gap-2"
                                >
                                    <Plus className="h-3 w-3" /> Connect
                                </Button>
                            )}
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-4">
                                <div>
                                    <label className="text-xs font-medium">
                                        Webhook URL
                                    </label>
                                    <Input
                                        value={webhookUrl}
                                        onChange={e =>
                                            setWebhookUrl(e.target.value)
                                        }
                                        placeholder="https://your-endpoint.example/webhook"
                                        className="mt-2"
                                    />
                                </div>

                                <div className="flex gap-2">
                                    <Button
                                        size="sm"
                                        onClick={() =>
                                            onAction("Webhook settings saved")
                                        }
                                        className="rounded-lg"
                                    >
                                        Save
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() =>
                                            onAction("Test event sent")
                                        }
                                        className="rounded-lg"
                                    >
                                        Test
                                    </Button>
                                </div>

                                <div>
                                    <label className="text-xs font-medium">
                                        Events
                                    </label>
                                    <div className="mt-2 space-y-2">
                                        {integration.events.map(
                                            (ev: string) => (
                                                <button
                                                    key={ev}
                                                    onClick={() =>
                                                        toggleEvent(ev)
                                                    }
                                                    className={clsx(
                                                        "w-full text-sm rounded-lg px-3 py-2 text-left border transition-colors",
                                                        enabledEvents.includes(
                                                            ev
                                                        )
                                                            ? "bg-primary/10 border-primary/30"
                                                            : "bg-background/50 border-border hover:bg-background/80"
                                                    )}
                                                >
                                                    {ev}
                                                </button>
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>

                            <RecentActivity />
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-0 bg-card/70 backdrop-blur">
                    <CardContent className="p-4">
                        <h4 className="text-sm font-semibold mb-2">
                            Quick Tips
                        </h4>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                            <li>
                                • Use a stable HTTPS endpoint to receive webhook
                                events
                            </li>
                            <li>• Verify payload signatures for security</li>
                            <li>
                                • Start by enabling only the events you need
                            </li>
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </ScrollArea>
    );
}

function RecentActivity() {
    const activities = [
        {
            event: "push",
            detail: "6 new commits",
            time: "2m ago",
            meta: "Repository: example-repo",
        },
        {
            event: "pull_request",
            detail: "PR opened",
            time: "1h ago",
            meta: "#42: Fix login bug",
        },
        {
            event: "issue",
            detail: "new issue",
            time: "yesterday",
            meta: "Issue: cannot deploy",
        },
    ];

    return (
        <div>
            <label className="text-xs font-medium">Recent Activity</label>
            <div className="mt-2 space-y-2">
                {activities.map((activity, i) => (
                    <div
                        key={i}
                        className="rounded-lg border p-3 bg-background/50"
                    >
                        <div className="flex items-center justify-between mb-1">
                            <div className="text-sm font-medium">
                                {activity.event} — {activity.detail}
                            </div>
                            <div className="text-xs text-muted-foreground">
                                {activity.time}
                            </div>
                        </div>
                        <div className="text-xs text-muted-foreground">
                            {activity.meta}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
