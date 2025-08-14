"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tags as TagsIcon } from "lucide-react";
import { useState } from "react";

interface TagInputProps {
    label: string;
    items: string[];
    setItems: (items: string[]) => void;
}

const pushUnique = (list: string[], value: string) => {
    const v = value.trim();
    return v && !list.includes(v) ? [...list, v] : list;
};

export default function TagInput({ label, items, setItems }: TagInputProps) {
    const [input, setInput] = useState("");

    const addItem = () => {
        setItems(pushUnique(items, input));
        setInput("");
    };
    const handleKey = (e: { key: string; preventDefault: () => void }) => {
        if (e.key === "Enter") {
            e.preventDefault();
            addItem();
        }
    };
    const remove = (val: string) => {
        setItems(items.filter(x => x !== val));
    };

    return (
        <Card className="space-y-3 rounded-2xl border bg-background/60 p-5 backdrop-blur">
            <div className="flex items-center justify-between">
                <label className="flex items-center gap-2">
                    <TagsIcon className="h-4 w-4" /> {label}
                </label>
                <div className="text-xs text-muted-foreground">
                    Press <kbd className="rounded border px-1">Enter</kbd> to
                    add
                </div>
            </div>

            <div className="flex gap-2">
                <Input
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={handleKey}
                    placeholder={`Add ${label.toLowerCase()}`}
                />
                <Button type="button" variant="secondary" onClick={addItem}>
                    Add
                </Button>
            </div>

            {!!items.length && (
                <div className="flex flex-wrap gap-2">
                    {items.map(item => (
                        <Badge
                            key={item}
                            variant="secondary"
                            className="cursor-pointer"
                            onClick={() => remove(item)}
                        >
                            {item} ×
                        </Badge>
                    ))}
                </div>
            )}
        </Card>
    );
}
