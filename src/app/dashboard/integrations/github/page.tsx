"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Github, Check, Sparkles, RefreshCw, Search } from "lucide-react";
import { Repo } from "@/types/repo";
import { useFetchRepos } from "@/hooks/queries/useGithubQuery";
import { useImportRepo } from "@/hooks/queries/useGithubQuery";
import { useRouter } from "next/navigation";

const GITHUB_APP_NAME = "/insentra-ai-assistant";

const GithubImportPage = () => {
    const [connected, setConnected] = useState<boolean | null>(true);
    const [query, setQuery] = useState("");
    const [selected, setSelected] = useState<string | null>(null);
    const [enableAI, setEnableAI] = useState(false);
    const [appInstalled, setAppInstalled] = useState(false);

    const router = useRouter();

    const { data: repos = [], isPending, refetch, isRefetching } = useFetchRepos();
    const importRepo = useImportRepo();

    const filtered: Repo[] = repos.filter((r: Repo) =>
        `${r.full_name} ${r.description || ""}`.toLowerCase().includes(query.toLowerCase())
    );

    const installAppForRepo = (repoId: number) => {
        const installationUrl = `https://github.com/apps/${GITHUB_APP_NAME}/installations/new/`;
        window.location.assign(installationUrl);
        setAppInstalled(true);
    };

    const handleImport = async () => {
        if (!selected) return;

        const selectedRepo = repos.find((r: any) => r.full_name === selected);
        if (!selectedRepo) return;

        if (enableAI && !appInstalled) {
            installAppForRepo(selectedRepo.id);
            return;
        }

        try {
            await importRepo.mutateAsync(
                {
                    provider: "github",
                    data: {
                        id: selectedRepo.id,
                        full_name: selectedRepo.full_name,
                        html_url: selectedRepo.html_url,
                        description: selectedRepo.description || "",
                        tags: selectedRepo.topics,
                        enableAI,
                    },
                },
                {
                    onSuccess: data => {
                        console.log("Import successful", data);
                        router.push(`/dashboard/threads/${data.threadId}`);
                    },
                }
            );

            setSelected(null);
            setAppInstalled(false);
        } catch (err) {
            console.error("Import failed", err);
        }
    };

    return (
        <div className="p-2 sm:p-2 h-full">
            <div className="max-w-4xl mx-auto">
                <Card className="border-0 bg-card/70 backdrop-blur">
                    <CardContent className="p-4 sm:p-6">
                        {/* Header */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                                    <Github className="text-primary" />
                                </div>
                                <div>
                                    <h1 className="text-lg font-semibold">Import projects from GitHub</h1>
                                    <p className="text-sm text-muted-foreground">
                                        Select one repository to import into your workspace.
                                    </p>
                                </div>
                            </div>

                            <Button variant="outline" onClick={() => refetch()} disabled={isPending || isRefetching}>
                                <RefreshCw className={`h-4 w-4 mr-2 ${isRefetching ? "animate-spin" : ""}`} />
                                Refresh
                            </Button>
                        </div>

                        {/* Search */}
                        <div className="relative mb-4">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search repositories..."
                                value={query}
                                onChange={e => setQuery(e.target.value)}
                                className="pl-10"
                            />
                        </div>

                        {/* Enable AI */}
                        <div className="mb-4 p-3 border rounded-lg bg-muted/30">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="font-medium flex items-center gap-2">
                                        <Sparkles className="h-4 w-4" />
                                        AI Features
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        Get AI-generated summaries for commits and pull requests
                                    </p>
                                </div>
                                <Button
                                    variant={enableAI ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setEnableAI(!enableAI)}
                                >
                                    {enableAI ? (
                                        <>
                                            <Check className="h-3 w-3 mr-1" />
                                            Enabled
                                        </>
                                    ) : (
                                        "Enable"
                                    )}
                                </Button>
                            </div>
                        </div>

                        {/* Repo List */}
                        <div className="space-y-2 max-h-96 overflow-auto mb-4">
                            {(isPending || isRefetching) && (
                                <div className="p-4 text-sm text-muted-foreground text-center">
                                    <RefreshCw className="h-4 w-4 animate-spin mx-auto mb-2" />
                                    Loading repos…
                                </div>
                            )}

                            {!isPending && filtered.length === 0 && !isRefetching && (
                                <div className="p-4 text-sm text-muted-foreground text-center">
                                    No repositories found.
                                </div>
                            )}

                            {!isPending &&
                                !isRefetching &&
                                filtered.map(repo => (
                                    <div
                                        key={repo.full_name}
                                        className={`flex items-center justify-between gap-4 p-3 rounded-md border hover:shadow-sm cursor-pointer ${
                                            selected === repo.full_name ? "border-primary bg-primary/5" : ""
                                        }`}
                                        onClick={() => {
                                            setSelected(repo.full_name);
                                            setAppInstalled(false);
                                        }}
                                    >
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <div
                                                    className={`h-6 w-6 rounded-sm border flex items-center justify-center ${
                                                        selected === repo.full_name
                                                            ? "bg-primary/10 border-primary"
                                                            : ""
                                                    }`}
                                                >
                                                    {selected === repo.full_name && <Check className="h-3 w-3" />}
                                                </div>
                                                <a
                                                    href={repo.html_url}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="font-medium truncate hover:underline"
                                                    onClick={e => e.stopPropagation()}
                                                >
                                                    {repo.full_name}
                                                </a>
                                                <Badge
                                                    variant={repo.private ? "secondary" : "outline"}
                                                    className="text-xs"
                                                >
                                                    {repo.private ? "Private" : "Public"}
                                                </Badge>
                                            </div>
                                            <p className="text-xs text-muted-foreground mx-8 truncate">
                                                {repo.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row justify-end gap-2">
                            <Button
                                variant="ghost"
                                onClick={() => {
                                    setSelected(null);
                                    setAppInstalled(false);
                                }}
                            >
                                Clear
                            </Button>

                            <Button onClick={handleImport} disabled={importRepo.isPending || !connected || !selected}>
                                {importRepo.isPending ? (
                                    <>
                                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                                        Importing…
                                    </>
                                ) : enableAI && !appInstalled ? (
                                    <>
                                        <Github className="h-4 w-4 mr-2" />
                                        Install App & Import
                                    </>
                                ) : enableAI ? (
                                    <>
                                        <Sparkles className="h-4 w-4 mr-2" />
                                        Import with AI ✨
                                    </>
                                ) : (
                                    "Import selected"
                                )}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default GithubImportPage;
