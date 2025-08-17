"use client";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";
import { useEffect, useState } from "react";

interface ImagePickerProps {
    image: string;
    setImage: (image: string) => void;
}

export default function ProjectImagePicker({ image, setImage }: ImagePickerProps) {
    const [imgOk, setImgOk] = useState(true);

    useEffect(() => {
        if (!image) return setImgOk(true);
        const img = new Image();
        img.onload = () => setImgOk(true);
        img.onerror = () => setImgOk(false);
        img.src = image;
    }, [image]);

    return (
        <Card className="space-y-3 rounded-2xl border bg-background/60 p-5 backdrop-blur">
            <label className="block font-medium mb-2">Project Image</label>
            <div className="flex gap-2">
                <Input value={image} onChange={e => setImage(e.target.value)} placeholder="Image URL" />
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => setImage("https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=1200&q=80")}
                >
                    <Camera className="h-4 w-4" />
                </Button>
            </div>

            <div className="rounded-xl border">
                {image && imgOk ? (
                    <img src={image} alt="Preview" className="h-48 w-full object-cover" />
                ) : (
                    <div className="flex h-48 items-center justify-center text-sm text-muted-foreground">
                        {image ? "Could not load image preview" : "Image preview will appear here"}
                    </div>
                )}
            </div>
        </Card>
    );
}
