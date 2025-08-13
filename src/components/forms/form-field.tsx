interface FormFieldProps {
    label: string;
    error?: string;
    required?: boolean;
    children: React.ReactNode;
}

export const FormField = ({
    label,
    error,
    required,
    children,
}: FormFieldProps) => (
    <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        {children}
        {error && (
            <p className="text-sm text-red-500 dark:text-red-400">{error}</p>
        )}
    </div>
);
