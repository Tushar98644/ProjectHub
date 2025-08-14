import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const STATUS_BADGES = {
    active: {
        label: "Active",
        badgeClass:
            "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/15 dark:text-emerald-400 dark:border-emerald-800",
    },
    "in-progress": {
        label: "In Progress",
        badgeClass:
            "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/15 dark:text-amber-400 dark:border-amber-800",
    },
    completed: {
        label: "Completed",
        badgeClass:
            "bg-sky-50 text-sky-700 border-sky-200 dark:bg-sky-900/15 dark:text-sky-400 dark:border-sky-800",
    },
};

export function StatusSelect({
    value,
    onChange,
}: {
    value: string;
    onChange: (v: string) => void;
}) {
    return (
        <Select onValueChange={onChange} defaultValue={value}>
            <SelectTrigger className="rounded-xl">
                <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
                {(
                    Object.keys(STATUS_BADGES) as (keyof typeof STATUS_BADGES)[]
                ).map(s => (
                    <SelectItem key={s} value={s}>
                        <Badge
                            variant="outline"
                            className={`border ${STATUS_BADGES[s].badgeClass}`}
                        >
                            {STATUS_BADGES[s].label}
                        </Badge>
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
