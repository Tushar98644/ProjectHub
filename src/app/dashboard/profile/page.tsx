"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Github, Link as LinkIcon } from "lucide-react";
import Link from "next/link";
import { useSession } from "@/config/auth/client";

type ImportedResource = {
    providerId: string;
    resourceType: string;
    resourceId: string;
    displayName?: string;
    url?: string;
    importedAt?: string;
};

const integrations = [
    {
        id: "github",
        name: "GitHub",
        description: "Repository events, PRs, issues and CI status",
        connected: false,
        account: { accountName: "tusharbanik", avatarUrl: "/avatar-placeholder.png" },
    },
    {
        id: "slack",
        name: "Slack",
        description: "Messages, channel events and app interactions",
        connected: false,
        account: { accountName: "tusharbanik", avatarUrl: "/avatar-placeholder.png" },
    },
];

const ProfilePage = () => {
    const [tab, setTab] = useState("overview");
    const [imports, setImports] = useState<ImportedResource[]>([]);
    const { data: session } = useSession();
    const user = session?.user!;

    const importedFor = (providerId: string) => imports.filter(i => i.providerId === providerId).slice(0, 3);

    return (
        <div className="p-4 sm:p-6 max-w-4xl mx-auto">
            {/* Profile Header */}
            <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <Avatar className="h-16 w-16 sm:h-20 sm:w-20 shadow">
                    <AvatarImage src={user?.image || "/avatar-placeholder.png"} />
                    <AvatarFallback>
                        {user?.name
                            .split(" ")
                            .map(n => n[0])
                            .join("")}
                    </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                    <h1 className="text-xl sm:text-2xl font-semibold">{user?.name}</h1>
                    <p className="text-sm text-muted-foreground">
                        {user?.email} · Joined {new Date(user?.createdAt).getFullYear()}
                    </p>
                    <p className="mt-2 text-sm text-foreground max-w-xl">{"Bio"}</p>
                </div>
                <Button size="sm" asChild className="self-start sm:self-auto">
                    <Link href="/settings">Settings</Link>
                </Button>
            </div>

            {/* Stats & Quick Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <Card>
                    <CardContent className="p-4 text-center">
                        <div className="text-xs text-muted-foreground">Projects</div>
                        <div className="text-xl font-semibold mt-1">{}</div>
                    </CardContent>
                </Card>
                <Card className="sm:col-span-2">
                    <CardContent className="p-4">
                        <div className="text-xs text-muted-foreground">Quick</div>
                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-2">
                            <Button size="sm" asChild>
                                <Link href="/dashboard/projects">My Projects</Link>
                            </Button>
                            <Button size="sm" variant="outline" asChild>
                                <Link href="/integrations">Manage Integrations</Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Tabs */}
            <Card>
                <Tabs value={tab} onValueChange={setTab}>
                    <div className="border-b px-4">
                        <TabsList className="p-0">
                            <TabsTrigger value="overview" className="px-4 py-3">
                                Overview
                            </TabsTrigger>
                            <TabsTrigger value="integrations" className="px-4 py-3">
                                Integrations
                            </TabsTrigger>
                        </TabsList>
                    </div>

                    <div className="p-4">
                        <TabsContent value="overview">
                            <div className="text-sm text-muted-foreground">
                                Overview — minimal view focused on your projects and activity.
                            </div>
                        </TabsContent>

                        <TabsContent value="integrations">
                            <div className="space-y-4">
                                {/* {loading.int ? (
                                    <div className="text-sm text-muted-foreground p-4">Loading integrations…</div>
                                ) : integrations.length === 0 ? (
                                    <div className="text-sm text-muted-foreground p-4">No integrations connected.</div>
                                ) : ( */}
                                {integrations.map(it => (
                                    <Card key={it.id} className="p-3">
                                        <CardContent className="p-3">
                                            <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                                                <div className="flex items-start gap-3">
                                                    <div className="h-10 w-10 grid place-items-center rounded-md bg-primary/10">
                                                        {it.id === "github" ? (
                                                            <Github className="h-5 w-5 text-primary" />
                                                        ) : (
                                                            <LinkIcon className="h-5 w-5 text-primary" />
                                                        )}
                                                    </div>
                                                    <div>
                                                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                                                            <div className="font-medium">{it.name}</div>
                                                            <div className="text-xs text-muted-foreground">
                                                                {it.connected ? "Connected" : "Not connected"}
                                                            </div>
                                                        </div>
                                                        {it.connected && it.account?.accountName && (
                                                            <div className="text-xs text-muted-foreground mt-1">
                                                                as{" "}
                                                                <span className="font-medium">
                                                                    {it.account.accountName}
                                                                </span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="text-left sm:text-right w-full sm:w-auto">
                                                    <div className="text-xs text-muted-foreground mb-2">
                                                        {importedFor(it.id).length} imported
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <Button size="sm" asChild>
                                                            <Link href={`/dashboard/integrations`}>Manage</Link>
                                                        </Button>
                                                        <Button size="sm" variant="ghost" asChild>
                                                            <Link href={`/dashboard/integrations/${it.id}`}>
                                                                Import
                                                            </Link>
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* {!loading.imp && (
                                                    <div className="mt-3 space-y-2">
                                                        {importedFor(it.id).length === 0 ? (
                                                            <div className="text-xs text-muted-foreground">No imported items</div>
                                                        ) : (
                                                            importedFor(it.id).map(item => (
                                                                <div key={item.resourceId} className="flex items-center justify-between text-sm">
                                                                    <div className="truncate">{item.displayName ?? item.resourceId}</div>
                                                                    {item.url && (
                                                                        <a
                                                                            className="text-xs text-primary hover:underline ml-4 shrink-0"
                                                                            href={item.url}
                                                                            target="_blank"
                                                                            rel="noreferrer"
                                                                        >
                                                                            View
                                                                        </a>
                                                                    )}
                                                                </div>
                                                            ))
                                                        )}
                                                    </div>
                                                )} */}
                                        </CardContent>
                                    </Card>
                                ))}
                                {/* )} */}
                            </div>
                        </TabsContent>
                    </div>
                </Tabs>
            </Card>
        </div>
    );
};

export default ProfilePage;
