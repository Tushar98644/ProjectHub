import Link from "next/link";
import { UrlObject } from "url";
import { motion } from "framer-motion";

type Href = string | UrlObject;
export const NavItem = ({ href, label, onClick, isMobile, currentPath, className }: { href: Href; label: string; onClick?: () => void; isMobile?: boolean; currentPath?: string; className?: string }) => {
    const isActive = currentPath === href || (href !== "/" && currentPath?.startsWith(href as string));

    const baseClasses = "relative font-medium transition-colors duration-200 ease-in-out group";
    const mobileClasses = `block w-full text-left px-4 py-3.5 rounded-lg text-base ${baseClasses} ${isActive ? "bg-sky-500/20 text-sky-300" : "text-slate-200 hover:bg-slate-700/60 hover:text-sky-300"}`;
    const desktopClasses = `px-3 py-2 rounded-md text-sm ${baseClasses} ${isActive ? "text-sky-300" : "text-slate-300 hover:text-sky-300"}`;

    return (
        <motion.div whileHover={{ y: isMobile ? 0 : -1 }} className={className}>
            <Link href={href} passHref legacyBehavior>
                <a
                    onClick={onClick}
                    className={isMobile ? mobileClasses : desktopClasses}
                    aria-current={isActive ? "page" : undefined}
                >
                    {label}
                    {!isMobile && isActive && (
                        <motion.div
                            className="absolute bottom-[-4px] left-0 right-0 h-[2px] bg-sky-400"
                            layoutId="underline" // For shared layout animation if you have multiple navs
                            initial={false}
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                    )}
                    {isMobile && isActive && (
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-sky-400"></span>
                    )}
                </a>
            </Link>
        </motion.div>
    );
};

export const NavButton = ({ onClick, label, isPrimary, isMobile, className }: { onClick: () => void; label: string; isPrimary?: boolean; isMobile?: boolean; className?: string }) => {
    const base = "font-semibold rounded-lg transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 transform";
    const mobile = `block w-full text-left px-4 py-3.5 text-base ${base}`;
    const desktop = `px-5 py-2.5 text-sm ${base}`;

    const primary = "bg-gradient-to-r from-sky-500 to-blue-600 text-white hover:from-sky-600 hover:to-blue-700 focus:ring-sky-500 shadow-md hover:shadow-lg";
    const secondary = "bg-slate-700 text-slate-200 hover:bg-slate-600 focus:ring-slate-500";
    return (
        <motion.button
            whileHover={{ scale: 1.05, y: -1 }}
            whileTap={{ scale: 0.95 }}
            className={`${isMobile ? mobile : desktop} ${isPrimary ? primary : secondary} ${className || ''}`}
            onClick={onClick}
        >
            {label}
        </motion.button>
    );
};
