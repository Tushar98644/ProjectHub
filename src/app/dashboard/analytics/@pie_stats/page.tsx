import { PieGraph } from "@/features/dashboard/components/overview/pie-graph";

export const delay = (ms: number) =>
    new Promise(resolve => setTimeout(resolve, ms));

export default async function Stats() {
    await delay(1000);
    return <PieGraph />;
}
