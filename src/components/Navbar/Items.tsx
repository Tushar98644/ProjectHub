import Link from "next/link";
import { UrlObject } from "url";

type Href = string | UrlObject;
export const NavItem = ({ href, label, onClick, isMobile }: { href: Href; label: string; onClick?: () => void; isMobile?: boolean }) => {
    const mobileClasses = "block px-3 py-3 rounded-md text-base font-medium text-slate-200 hover:bg-slate-700 hover:text-sky-300";
    const desktopClasses = "px-3 py-2 rounded-md text-sm font-medium text-slate-300 hover:text-sky-300 transition-colors";

    return (
        <Link href={href} passHref legacyBehavior>
            <a
                onClick={onClick}
                className={isMobile ? mobileClasses : desktopClasses}
            >
                {label}
            </a>
        </Link>
    );
};

export const NavButton = ({ onClick, label, isPrimary, isMobile }: { onClick: () => void; label: string; isPrimary?: boolean; isMobile?: boolean }) => {
    const baseClasses = "font-medium rounded-md transition-colors duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900";
    const mobileClasses = `block w-full text-left px-3 py-3 text-base ${baseClasses}`;
    const desktopClasses = `px-4 py-2 text-sm ${baseClasses}`;

    const primaryClasses = "bg-sky-500 text-white hover:bg-sky-600 focus:ring-sky-500";
    const secondaryClasses = "bg-slate-700 text-slate-200 hover:bg-slate-600 focus:ring-sky-600"; // Or border-sky-500 text-sky-400 hover:bg-sky-500 hover:text-slate-900

    const currentClasses = isMobile ? mobileClasses : desktopClasses;
    const typeClasses = isPrimary ? primaryClasses : secondaryClasses;

    return (
        <button
            className={`${currentClasses} ${typeClasses}`}
            onClick={onClick}
        >
            {label}
        </button>
    );
};
