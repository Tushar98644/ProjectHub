import { BarGraph } from "@/features/dashboard/components/overview/bar-graph";

export const delay = (ms: number) =>
    new Promise(resolve => setTimeout(resolve, ms));

export default async function BarStats() {
    await await delay(1000);

    return <BarGraph />;
}
