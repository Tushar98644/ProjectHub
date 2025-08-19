"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Github, Link as LinkIcon } from "lucide-react";
import Link from "next/link";

type Integration = {
    id: string;
    name: string;
    description?: string;
    connected?: boolean;
    account?: { accountName?: string; avatarUrl?: string } | null;
};

type ImportedResource = {
    providerId: string;
    resourceType: string;
    resourceId: string;
    displayName?: string;
    url?: string;
    importedAt?: string;
};

const minimalUser = {
    name: "Tushar Banik",
    username: "tushar",
    avatar: "/avatar-placeholder.png",
    bio: "Building things. Loves clean UX and good defaults.",
    joinDate: "2025-08-19",
    stats: { projects: 3 },
};

const ProfilePage = () => {
    const [tab, setTab] = useState("overview");
    const [integrations, setIntegrations] = useState<Integration[]>([]);
    const [imports, setImports] = useState<ImportedResource[]>([]);
    const [loadingInt, setLoadingInt] = useState(true);
    const [loadingImp, setLoadingImp] = useState(true);

    useEffect(() => {
        fetchIntegrations();
        fetchImports();
    }, []);

    async function fetchIntegrations() {
        setLoadingInt(true);
        try {
            const res = await fetch("/api/integrations");
            if (!res.ok) {
                setIntegrations([]);
                return;
            }
            const json = await res.json();
            setIntegrations(json);
        } catch (e) {
            console.error(e);
            setIntegrations([]);
        } finally {
            setLoadingInt(false);
        }
    }

    async function fetchImports() {
        setLoadingImp(true);
        try {
            const res = await fetch("/api/imports");
            if (!res.ok) {
                setImports([]);
                return;
            }
            const json = await res.json();
            setImports(json);
        } catch (e) {
            console.error(e);
            setImports([]);
        } finally {
            setLoadingImp(false);
        }
    }

    const importedFor = (providerId: string) => imports.filter(i => i.providerId === providerId).slice(0, 3); // show up to 3

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <div className="mb-6 flex items-center gap-4">
                <Avatar className="h-20 w-20 shadow">
                    <AvatarImage src={minimalUser.avatar} />
                    <AvatarFallback>
                        {minimalUser.name
                            .split(" ")
                            .map(n => n[0])
                            .join("")}
                    </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                    <h1 className="text-2xl font-semibold">{minimalUser.name}</h1>
                    <p className="text-sm text-muted-foreground">
                        @{minimalUser.username} · Joined {new Date(minimalUser.joinDate).getFullYear()}
                    </p>
                    <p className="mt-2 text-sm text-foreground max-w-xl">{minimalUser.bio}</p>
                </div>
                <div>
                    <Button size="sm" asChild>
                        <Link href="/settings">Settings</Link>
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
                <Card className="col-span-1">
                    <CardContent className="p-4 text-center">
                        <div className="text-xs text-muted-foreground">Projects</div>
                        <div className="text-xl font-semibold mt-1">{minimalUser.stats.projects}</div>
                    </CardContent>
                </Card>
                <Card className="col-span-2">
                    <CardContent className="p-4">
                        <div className="text-xs text-muted-foreground">Quick</div>
                        <div className="flex gap-3 mt-2">
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
                                {loadingInt ? (
                                    <div className="text-sm text-muted-foreground p-4">Loading integrations…</div>
                                ) : integrations.length === 0 ? (
                                    <div className="text-sm text-muted-foreground p-4">No integrations connected.</div>
                                ) : (
                                    integrations.map(it => (
                                        <Card key={it.id} className="p-3">
                                            <CardContent className="p-3 flex items-start justify-between">
                                                <div className="flex items-start gap-3">
                                                    <div className="h-10 w-10 grid place-items-center rounded-md bg-primary/10">
                                                        {it.id === "github" ? (
                                                            <Github className="h-5 w-5 text-primary" />
                                                        ) : (
                                                            <LinkIcon className="h-5 w-5 text-primary" />
                                                        )}
                                                    </div>
                                                    <div>
                                                        <div className="flex items-center gap-2">
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

                                                <div className="text-right">
                                                    <div className="text-xs text-muted-foreground mb-2">
                                                        {importedFor(it.id).length} imported
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <Button size="sm" asChild>
                                                            <Link href={`/integrations/${it.id}`}>Manage</Link>
                                                        </Button>
                                                        <Button size="sm" variant="ghost" asChild>
                                                            <Link href={`/integrations/${it.id}/import`}>Import</Link>
                                                        </Button>
                                                    </div>
                                                </div>

                                                {/* imported items dropdown-like (minimal) */}
                                                <div className="w-full mt-3 col-span-3">
                                                    {loadingImp ? null : (
                                                        <div className="mt-3 space-y-2">
                                                            {importedFor(it.id).length === 0 ? (
                                                                <div className="text-xs text-muted-foreground">
                                                                    No imported items
                                                                </div>
                                                            ) : (
                                                                importedFor(it.id).map(item => (
                                                                    <div
                                                                        key={item.resourceId}
                                                                        className="flex items-center justify-between text-sm"
                                                                    >
                                                                        <div className="truncate">
                                                                            {item.displayName ?? item.resourceId}
                                                                        </div>
                                                                        {item.url ? (
                                                                            <a
                                                                                className="text-xs text-primary hover:underline ml-4"
                                                                                href={item.url}
                                                                                target="_blank"
                                                                                rel="noreferrer"
                                                                            >
                                                                                View
                                                                            </a>
                                                                        ) : null}
                                                                    </div>
                                                                ))
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))
                                )}
                            </div>
                        </TabsContent>
                    </div>
                </Tabs>
            </Card>
        </div>
    );
};

export default ProfilePage;
