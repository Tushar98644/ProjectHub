// components/InputField.tsx
import React from "react";

interface InputFieldProps {
    label: string;
    type: string;
    value: string;
    onChange: (value: string) => void;
    required?: boolean;
    textarea?: boolean;
    placeholder?: string;
}

const InputField: React.FC<InputFieldProps> = ({
    label,
    type,
    value,
    onChange,
    required = false,
    textarea = false,
}) => {
    const commonStyles = "w-full bg-gray-300 text-gray-500 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline";

    return (
        <div className="mt-8">
            <span className="uppercase text-sm text-gray-300 font-bold">{label}</span>
            {textarea ? (
                <textarea
                    className={`${commonStyles} h-32`}
                    required={required}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                />
            ) : (
                <input
                    className={commonStyles}
                    type={type}
                    required={required}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                />
            )}
        </div>
    );
};

export default InputField;