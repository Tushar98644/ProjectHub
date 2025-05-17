/* eslint-disable @next/next/no-img-element */
'use client'
import { useReducer, useEffect, Fragment } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { NavItem, NavButton } from "./Items";
import { FaBars, FaTimes } from "react-icons/fa";

interface State {
    isMobile: boolean | undefined;
    isMenuOpen: boolean;
}

interface Action {
    type: "SET_MOBILE_VIEW" | "TOGGLE_MENU";
    payload?: boolean;
}

const Navbar = () => {
    const initialState: State = {
        isMobile: undefined,
        isMenuOpen: false,
    };

    const reducer = (state: State, action: Action): State => {
        switch (action.type) {
            case "SET_MOBILE_VIEW":
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
            const mobileView = window.innerWidth <= 768;
            if (state.isMobile !== mobileView) {
                dispatch({ type: "SET_MOBILE_VIEW", payload: mobileView });
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [state.isMobile]);

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
        : [
            { href: "/", label: "Home" },
            { href: "/#about", label: "About" },
        ];

    if (state.isMobile === undefined) {
        return <div className="fixed top-0 left-0 w-full h-16 bg-slate-900 z-50"></div>;
    }

    return (
        <nav className="fixed top-0 left-0 w-full bg-slate-900/80 backdrop-blur-md text-slate-100 shadow-lg z-50 opacity-70">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex-shrink-0">
                        <a href="/" className="flex items-center space-x-2">
                            <img src="/logo-1.png" alt="Project Hub Logo" className="h-10 w-auto" />
                            <span className="text-2xl font-bold bg-gradient-to-r from-sky-400 to-purple-500 bg-clip-text text-transparent hidden sm:inline">
                                PROJECT HUB
                            </span>
                        </a>
                    </div>

                    {!state.isMobile && (
                        <div className="hidden md:flex items-center space-x-4">
                            {session ? (
                                <>
                                    {(session?.user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL ? adminNavItems : userNavItems).map(item => (
                                        <NavItem key={item.label} href={item.href} label={item.label} />
                                    ))}
                                    <NavButton onClick={() => signOut()} label="Logout" isPrimary={false} />
                                </>
                            ) : (
                                <>
                                    <NavButton onClick={() => signIn("google")} label="Log In" isPrimary={true} />
                                    <NavButton onClick={() => signIn("github")} label="Sign Up" isPrimary={false} />
                                </>
                            )}
                        </div>
                    )}

                    <div className="md:hidden flex items-center">
                        <button
                            onClick={toggleMenu}
                            type="button"
                            className="inline-flex items-center justify-center p-2 rounded-md text-slate-300 hover:text-sky-400 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-sky-500"
                            aria-controls="mobile-menu"
                            aria-expanded={state.isMenuOpen}
                        >
                            <span className="sr-only">Open main menu</span>
                            {state.isMenuOpen ? (
                                <FaTimes className="block h-6 w-6" aria-hidden="true" />
                            ) : (
                                <FaBars className="block h-6 w-6" aria-hidden="true" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {state.isMobile && state.isMenuOpen && (
                <div className="md:hidden absolute top-20 left-0 w-full bg-slate-800 shadow-xl pb-4" id="mobile-menu">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {mobileNavItems.map(item => (
                            <NavItem key={item.label} href={item.href} label={item.label} isMobile={true} onClick={toggleMenu} />
                        ))}
                        {session ? (
                            <NavButton onClick={() => { signOut(); toggleMenu(); }} label="Logout" isMobile={true} isPrimary={false} />
                        ) : (
                            <>
                                <NavButton onClick={() => { signIn("google"); toggleMenu(); }} label="Log In" isMobile={true} isPrimary={true} />
                                <NavButton onClick={() => { signIn("github"); toggleMenu(); }} label="Sign Up" isMobile={true} isPrimary={false} />
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
