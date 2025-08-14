import { SearchBar } from "@/components/common/search-bar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import clsx from "clsx";

export const IntegrationsList = ({
    query,
    setQuery,
    integrations,
    selected,
    setSelected,
}: any) => {
    return (
        <div className="flex flex-col md:h-[670px] h-screen">
            <Card className="border-0 bg-card/70 backdrop-blur flex flex-col h-full">
                <CardContent className="p-4 flex flex-col h-full flex-1 min-h-0">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4 flex-shrink-0">
                        <h2 className="text-sm font-semibold">
                            Available Integrations
                        </h2>
                        <Badge variant="secondary">{integrations.length}</Badge>
                    </div>

                    {/* Search */}
                    <SearchBar
                        placeholder="Search Integrations..."
                        value={query}
                        onChange={setQuery}
                    />

                    {/* Scrollable list */}
                    <div className="overflow-y-auto py-4">
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
                </CardContent>
            </Card>
        </div>
    );
};
