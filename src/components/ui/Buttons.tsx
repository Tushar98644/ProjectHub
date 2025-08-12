import React from "react";

const PrimaryButton = React.forwardRef<
    HTMLButtonElement,
    React.ComponentPropsWithoutRef<"button">
>(({ className, ...props }, ref) => (
    <button
        ref={ref}
        className={`h-8 gap-1 bg-primary hidden py-1 px-2 duration-200 text-white rounded-lg text-xs md:flex items-center justify-center dark:bg-indigo-600 ${className ?? ""}`}
        {...props}
    />
));
PrimaryButton.displayName = "PrimaryButton";

const OutlineButton = React.forwardRef<
    HTMLButtonElement,
    React.ComponentPropsWithoutRef<"button">
>(({ className, ...props }, ref) => (
    <button
        ref={ref}
        className={`h-8 w-8 gap-1 md:w-auto border border-gray-300 dark:border-gray-600 py-1 px-2 duration-200 rounded-lg text-xs all-center text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 ${className ?? ""}`}
        {...props}
    />
));
OutlineButton.displayName = "OutlineButton";

export { PrimaryButton, OutlineButton };
