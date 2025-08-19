"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Github, Plus, Check } from "lucide-react";
import { Repo } from "@/types/repo";
import { useFetchRepos } from "@/hooks/queries/useGithubQuery";

const GithubImportPage = () => {
    const [connected, setConnected] = useState<boolean | null>(null);
    const [query, setQuery] = useState("");
    const [selected, setSelected] = useState<Record<string, boolean>>({});
    const [importing, setImporting] = useState(false);

    const { data: repos, isPending, refetch, isRefetching } = useFetchRepos();

    const filtered: Repo[] = repos.filter((r: Repo) =>
        `${r.full_name} ${r.description || ""}`.toLowerCase().includes(query.toLowerCase())
    );

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
                                        Select repositories to import into your workspace.
                                    </p>
                                </div>
                            </div>

                            {connected === false ? (
                                <Button className="gap-2">
                                    <Plus className="h-4 w-4" /> Connect GitHub
                                </Button>
                            ) : (
                                <Button variant="outline" onClick={() => refetch()} disabled={isPending}>
                                    Refresh
                                </Button>
                            )}
                        </div>

                        {/* Search */}
                        <Input
                            placeholder="Search repositories..."
                            value={query}
                            onChange={e => setQuery(e.target.value)}
                            className="mb-4"
                        />

                        {/* Repo List */}
                        <div className="space-y-2 max-h-96 overflow-auto">
                            {isPending ||
                                (isRefetching && (
                                    <div className="p-4 text-sm text-muted-foreground">Loading repos…</div>
                                ))}

                            {!isPending && filtered.length === 0 && (
                                <div className="p-4 text-sm text-muted-foreground">No repositories found.</div>
                            )}

                            {!isPending &&
                                !isRefetching &&
                                filtered.map(repo => (
                                    <div
                                        key={repo.full_name}
                                        className="flex items-center justify-between gap-4 p-3 rounded-md border hover:shadow-sm"
                                    >
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <button
                                                    onClick={() =>
                                                        setSelected(prev => ({
                                                            ...prev,
                                                            [repo.full_name]: !prev[repo.full_name],
                                                        }))
                                                    }
                                                    className={`h-6 w-6 rounded-sm border flex items-center justify-center ${
                                                        selected[repo.full_name] ? "bg-primary/10 border-primary" : ""
                                                    }`}
                                                >
                                                    {selected[repo.full_name] && <Check className="h-3 w-3" />}
                                                </button>
                                                <a
                                                    href={repo.html_url}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="font-medium truncate hover:underline"
                                                >
                                                    {repo.full_name}
                                                </a>
                                            </div>
                                            <p className="text-xs text-muted-foreground mx-8 truncate">
                                                {repo.description}
                                            </p>
                                        </div>
                                        <div className="text-xs text-muted-foreground shrink-0">
                                            {repo.private ? "Private" : "Public"}
                                        </div>
                                    </div>
                                ))}
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row justify-end gap-2 mt-4">
                            <Button variant="ghost" onClick={() => setSelected({})} className="sm:w-auto">
                                Clear
                            </Button>
                            <Button onClick={() => {}} disabled={importing || !connected} className="sm:w-auto">
                                {importing ? "Importing…" : "Import selected"}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default GithubImportPage;
