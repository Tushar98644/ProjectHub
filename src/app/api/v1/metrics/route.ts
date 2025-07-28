import { metricsRegistry } from "@/lib/metrics";

export async function GET() {
    const metrics = await metricsRegistry.metrics();

    return new Response(metrics, {
        status: 200,
        headers: {
            "Content-Type": metricsRegistry.contentType,
        },
    });
}
