import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const SearchBar = ({ placeholder, value, onChange }: any) => (
    <div className="relative w-full">
        <Input
            value={value}
            onChange={(e: any) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full pl-10 rounded-xl focus:ring-0 focus:outline-none"
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        {value && (
            <Button
                variant="ghost"
                size="icon"
                onClick={() => onChange("")}
                className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-lg"
            >
                ×
            </Button>
        )}
    </div>
);
