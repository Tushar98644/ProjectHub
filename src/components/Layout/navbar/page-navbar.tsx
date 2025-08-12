/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

const PageNavbarLeftContent = React.forwardRef<
    HTMLDivElement,
    React.ComponentPropsWithoutRef<"div">
>((props, ref) => (
    <div
        ref={ref}
        className="flex items-center justify-between gap-2 h-10"
        {...props}
    />
));

PageNavbarLeftContent.displayName = "PageNavbarLeftContent";

const PageNavbarRightContent = React.forwardRef<
    HTMLDivElement,
    React.ComponentPropsWithoutRef<"div">
>((props, ref) => (
    <div ref={ref} className="text-gray-500 hidden md:flex gap-2" {...props} />
));

PageNavbarRightContent.displayName = "PageNavbarRightContent";

const PageNavbarIconButton = React.forwardRef<
    HTMLButtonElement,
    React.ComponentPropsWithoutRef<"button">
>(({ className, ...props }, ref) => (
    <button
        ref={ref}
        className="all-center h-8 w-8 duration-200 hover:bg-gray-100 rounded-lg"
        {...props}
    />
));

PageNavbarIconButton.displayName = "PageNavbarIconButton";

export { PageNavbarLeftContent, PageNavbarRightContent, PageNavbarIconButton };
