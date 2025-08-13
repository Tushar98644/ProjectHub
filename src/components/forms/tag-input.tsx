import { useState } from "react";
import { Add, CloseCircle } from "iconsax-reactjs";

interface TagInputProps {
    tags: string[];
    onAddTag: (tag: string) => void;
    onRemoveTag: (tag: string) => void;
    placeholder: string;
    error?: string;
}

export const TagInput = ({
    tags,
    onAddTag,
    onRemoveTag,
    placeholder,
    error,
}: TagInputProps) => {
    const [inputValue, setInputValue] = useState("");

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            if (inputValue.trim()) {
                onAddTag(inputValue);
                setInputValue("");
            }
        }
    };

    const handleAddClick = () => {
        if (inputValue.trim()) {
            onAddTag(inputValue);
            setInputValue("");
        }
    };

    return (
        <div className="space-y-3">
            <div className="flex gap-2">
                <input
                    type="text"
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={placeholder}
                    className={`flex-1 px-4 py-3 border rounded-xl bg-white dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 ${
                        error
                            ? "border-red-300 dark:border-red-600"
                            : "border-gray-200 dark:border-gray-700"
                    }`}
                />
                <button
                    type="button"
                    onClick={handleAddClick}
                    className="px-4 py-3 bg-violet-500 text-white rounded-xl hover:bg-violet-600 transition-colors"
                >
                    <Add size={16} />
                </button>
            </div>

            {tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                    {tags.map(tag => (
                        <span
                            key={tag}
                            className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                        >
                            {tag}
                            <button
                                type="button"
                                onClick={() => onRemoveTag(tag)}
                                className="hover:text-red-500 transition-colors"
                            >
                                <CloseCircle size={14} />
                            </button>
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
};
