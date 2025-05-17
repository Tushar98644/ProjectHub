/* eslint-disable @next/next/no-img-element */
'use client'
import { useReducer, useEffect, Fragment } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { NavItem, NavButton } from "./Items"; // Assuming Items.tsx is in the same directory
import { FaBars, FaTimes } from "react-icons/fa";
import { usePathname } from "next/navigation"; // To hide on login page
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link"; // For the logo link

interface State {
    isMobile: boolean | undefined;
    isMenuOpen: boolean;
}

interface Action {
    type: "SET_MOBILE_VIEW" | "TOGGLE_MENU";
    payload?: boolean;
}

const Navbar = () => {
    const pathname = usePathname(); // Get current path
    const initialState: State = {
        isMobile: undefined,
        isMenuOpen: false,
    };

    const reducer = (state: State, action: Action): State => {
        switch (action.type) {
            case "SET_MOBILE_VIEW":
                // Close menu when switching to desktop view
                return { ...state, isMobile: action.payload, isMenuOpen: action.payload === false ? false : state.isMenuOpen };
            case "TOGGLE_MENU":
                return { ...state, isMenuOpen: !state.isMenuOpen };
            default:
                return state;
        }
    };

    const [state, dispatch] = useReducer(reducer, initialState);
    const { data: session } = useSession();

    const toggleMenu = () => {
        dispatch({ type: "TOGGLE_MENU" });
    };

    useEffect(() => {
        const handleResize = () => {
            const mobileView = window.innerWidth <= 768; // md breakpoint
            if (state.isMobile !== mobileView) {
                dispatch({ type: "SET_MOBILE_VIEW", payload: mobileView });
            }
        };

        handleResize(); // Initial check
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [state.isMobile]);

    // Define navigation items (ensure these match your SideNav for consistency if applicable)
    const commonNavItems = [
        { href: "/project/new", label: "Add Project" },
        { href: "/", label: "View Projects" },
    ];
    const userNavItems = [
        ...commonNavItems,
        { href: "/contact", label: "Contact" },
        { href: "/dashboard/profile", label: "Dashboard" },
    ];
    const adminNavItems = [
        ...commonNavItems,
        { href: "/admin", label: "Admin Panel" },
        { href: "/message", label: "Messages" },
    ];
    const mobileNavItems = session
        ? (session?.user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL ? adminNavItems : userNavItems)
        : [ // Logged out mobile items
            { href: "/", label: "Home" },
            { href: "/#features", label: "Features" }, // Example
            { href: "/#about", label: "About" },    // Example
        ];

    // Hide Navbar on login page or while initial state is undefined
    if (pathname === "/login" || state.isMobile === undefined) {
        // Return a minimal placeholder or null if you want nothing to render
        // This placeholder prevents layout shift if navbar has height
        return <div className="fixed top-0 left-0 w-full h-20 bg-transparent z-50 pointer-events-none"></div>;
    }

    const mobileMenuVariants = {
        hidden: { opacity: 0, y: -20, transition: { duration: 0.2, ease: "easeOut" } },
        visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeIn" } },
    };

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="fixed top-0 left-0 w-full bg-slate-900/70 backdrop-blur-lg text-slate-100 shadow-xl z-50 border-b border-slate-700/50"
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo / Brand Name */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="flex-shrink-0"
                    >
                        <Link href="/" className="flex items-center space-x-2 group">
                            <img src="/logo-1.png" alt="Project Hub Logo" className="h-10 w-auto transition-transform duration-300 group-hover:rotate-[15deg] md:hidden" />
                            <span className="text-2xl font-bold bg-gradient-to-r from-sky-400 via-cyan-400 to-purple-500 bg-clip-text text-transparent hidden sm:inline group-hover:brightness-125 transition-all">
                                PROJECT HUB
                            </span>
                        </Link>
                    </motion.div>

                    {/* Desktop Navigation */}
                    {!state.isMobile && (
                        <div className="hidden md:flex items-center space-x-1"> {/* Reduced space for tighter look */}
                            {session ? (
                                <>
                                    {(session?.user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL ? adminNavItems : userNavItems).map(item => (
                                        <NavItem key={item.label} href={item.href} label={item.label} currentPath={pathname ?? undefined} />
                                    ))}
                                    <NavButton onClick={() => signOut()} label="Logout" isPrimary={false} className="ml-2" />
                                </>
                            ) : (
                                <>
                                    {/* Example non-authed desktop links */}
                                    <NavItem href="/#features" label="Features" currentPath={pathname ?? undefined} />
                                    <NavItem href="/#about" label="About Us" currentPath={pathname ?? undefined} />
                                    <NavButton onClick={() => signIn("google")} label="Log In" isPrimary={true} className="ml-3" />
                                    {/* <NavButton onClick={() => signIn("github")} label="Sign Up" isPrimary={false} /> */}
                                </>
                            )}
                        </div>
                    )}

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={toggleMenu}
                            type="button"
                            className="inline-flex items-center justify-center p-2 rounded-md text-slate-300 hover:text-sky-300 hover:bg-slate-700/50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-sky-500 transition-colors"
                            aria-controls="mobile-menu"
                            aria-expanded={state.isMenuOpen}
                        >
                            <span className="sr-only">Open main menu</span>
                            <AnimatePresence mode="wait">
                                {state.isMenuOpen ? (
                                    <motion.div key="times" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                                        <FaTimes className="block h-6 w-6" aria-hidden="true" />
                                    </motion.div>
                                ) : (
                                    <motion.div key="bars" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                                        <FaBars className="block h-6 w-6" aria-hidden="true" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {state.isMobile && state.isMenuOpen && (
                    <motion.div
                        key="mobile-menu"
                        variants={mobileMenuVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        className="md:hidden absolute top-20 left-0 w-full bg-slate-800/95 backdrop-blur-md shadow-2xl pb-4 border-t border-slate-700"
                        id="mobile-menu"
                    >
                        <div className="px-3 pt-3 pb-3 space-y-2">
                            {mobileNavItems.map(item => (
                                <NavItem key={item.label} href={item.href} label={item.label} isMobile={true} onClick={toggleMenu} currentPath={pathname ?? undefined} />
                            ))}
                            <div className="pt-3 mt-2 border-t border-slate-700/50">
                                {session ? (
                                    <NavButton onClick={() => { signOut(); toggleMenu(); }} label="Logout" isMobile={true} isPrimary={false} />
                                ) : (
                                    <div className="space-y-2">
                                        <NavButton onClick={() => { signIn("google"); toggleMenu(); }} label="Log In with Google" isMobile={true} isPrimary={true} />
                                        <NavButton onClick={() => { signIn("github"); toggleMenu(); }} label="Log In with GitHub" isMobile={true} isPrimary={false} />
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;
