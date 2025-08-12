"use client";

import React from "react";
import cn from "mxcn";

// Table Wrapper
const Table = React.forwardRef<
    HTMLTableElement,
    React.ComponentPropsWithoutRef<"table">
>(({ className, ...props }, ref) => (
    <table
        ref={ref}
        className={cn(
            "w-full overflow-x-auto text-sm rounded-md text-gray-800 dark:text-gray-100",
            className
        )}
        {...props}
    />
));
Table.displayName = "Table";

// Table Body
const TableBody = React.forwardRef<
    HTMLTableSectionElement,
    React.ComponentPropsWithoutRef<"tbody">
>(({ className, ...props }, ref) => (
    <tbody
        ref={ref}
        className={cn(
            "space-y-2 divide-y divide-gray-200 dark:divide-gray-700",
            className
        )}
        {...props}
    />
));
TableBody.displayName = "TableBody";

const TableHeader = React.forwardRef<
    HTMLTableRowElement,
    React.ComponentPropsWithoutRef<"tr">
>(({ className, ...props }, ref) => (
    <tr ref={ref} {...props}>
        <div
            ref={ref}
            className={cn(
                "bg-gray-100 dark:bg-gray-800 rounded-lg px-2 py-2 flex items-center justify-between text-gray-500 dark:text-gray-400",
                className
            )}
            {...props}
        />
    </tr>
));
TableHeader.displayName = "TableHeader";

const TableRow = React.forwardRef<
    HTMLTableRowElement,
    React.ComponentPropsWithoutRef<"tr">
>(({ className, ...props }, ref) => (
    <tr
        ref={ref}
        className={cn(
            "flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-150",
            className
        )}
        {...props}
    />
));
TableRow.displayName = "TableRow";

const TableItem = React.forwardRef<
    HTMLTableCellElement,
    React.ComponentPropsWithoutRef<"td">
>(({ className, ...props }, ref) => (
    <td
        ref={ref}
        className={cn(
            "flex gap-2 items-center w-[220px] text-sm py-1.5 px-2 text-gray-700 dark:text-gray-200",
            className
        )}
        {...props}
    />
));
TableItem.displayName = "TableItem";

export { Table, TableBody, TableHeader, TableRow, TableItem };
