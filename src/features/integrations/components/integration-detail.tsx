import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import clsx from "clsx";
import { Plus } from "lucide-react";
import { RecentActivity } from "./recent-activity";
import { linkSocial } from "@/config/auth/client";

export const IntegrationDetail = ({
    integration,
    webhookUrl,
    setWebhookUrl,
    enabledEvents,
    setEnabledEvents,
    onAction,
    isLoading,
}: any) => {
    const toggleEvent = (eventName: string) => {
        setEnabledEvents((prev: string[]) =>
            prev.includes(eventName) ? prev.filter(e => e !== eventName) : [...prev, eventName]
        );
    };

    const connectIntegration = async () => {
        console.log("connectIntegration");
        await linkSocial({
            provider: "github",
        });
    };

    return (
        <ScrollArea className="h-full md:w-4/5">
            <div className="space-y-4 pr-2">
                <Card className="border-0 bg-card/70 backdrop-blur">
                    <CardContent className="p-6">
                        <div className="flex items-start justify-between gap-4 mb-6">
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                                    <integration.logo className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold">{integration.name}</h2>
                                    <p className="text-sm text-muted-foreground mt-1">{integration.description}</p>
                                </div>
                            </div>

                            {/* {integration.connected ? (
                                <Button
                                    size="sm"
                                    onClick={() => onAction(`Disconnected ${integration.name}`)}
                                    disabled={isLoading}
                                    className="rounded-lg bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                                >
                                    Disconnect
                                </Button>
                            ) : ( */}
                            <Button
                                size="sm"
                                onClick={() => connectIntegration}
                                // disabled={isLoading}
                                className="rounded-lg gap-2"
                            >
                                <Plus className="h-3 w-3" /> Connect
                            </Button>
                            {/* )} */}
                        </div>

                        <button onClick={connectIntegration}> connect </button>

                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-4">
                                <div>
                                    <label className="text-xs font-medium">Webhook URL</label>
                                    <Input
                                        value={webhookUrl}
                                        onChange={e => setWebhookUrl(e.target.value)}
                                        placeholder="https://your-endpoint.example/webhook"
                                        className="mt-2"
                                    />
                                </div>

                                <div className="flex gap-2">
                                    <Button
                                        size="sm"
                                        onClick={() => onAction("Webhook settings saved")}
                                        className="rounded-lg"
                                    >
                                        Save
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => onAction("Test event sent")}
                                        className="rounded-lg"
                                    >
                                        Test
                                    </Button>
                                </div>

                                <div>
                                    <label className="text-xs font-medium">Events</label>
                                    <div className="mt-2 space-y-2">
                                        {integration.events.map((ev: string) => (
                                            <button
                                                key={ev}
                                                onClick={() => toggleEvent(ev)}
                                                className={clsx(
                                                    "w-full text-sm rounded-lg px-3 py-2 text-left border transition-colors",
                                                    enabledEvents.includes(ev)
                                                        ? "bg-primary/10 border-primary/30"
                                                        : "bg-background/50 border-border hover:bg-background/80"
                                                )}
                                            >
                                                {ev}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <RecentActivity />
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-0 bg-card/70 backdrop-blur">
                    <CardContent className="p-4">
                        <h4 className="text-sm font-semibold mb-2">Quick Tips</h4>
                        <ul className="space-y-1 text-sm text-muted-foreground">
                            <li>• Use a stable HTTPS endpoint to receive webhook events</li>
                            <li>• Verify payload signatures for security</li>
                            <li>• Start by enabling only the events you need</li>
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </ScrollArea>
    );
};
