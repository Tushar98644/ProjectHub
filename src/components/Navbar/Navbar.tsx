/* eslint-disable @next/next/no-img-element */
'use client'
import { useReducer, useEffect, Fragment } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { NavItem, NavButton } from "./Items";

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
        isMobile: false,
        isMenuOpen: false,
    };

    const reducer = (state: State, action: Action): State => {
        switch (action.type) {
            case "SET_MOBILE_VIEW":
                return { ...state, isMobile: action.payload };
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
            if (window.innerWidth <= 768) {
                dispatch({ type: "SET_MOBILE_VIEW", payload: true });
            } else {
                dispatch({ type: "SET_MOBILE_VIEW", payload: false });
            }
        };
    
        handleResize();
    
        window.addEventListener("resize", handleResize);
    
        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div className="nav font-bold grid md:grid-cols-7 grid-cols-2 md:py-7 py-1 px-0 z-10 gap-2 shadow-xl  items-center fixed w-full">
            <span className="bg-gradient-to-r from-[#4ca5ff] to-[#b673f8] md:col-span-2 md:block hidden text-center px-2 lg:text-3xl md:text-2xl font-black animate-pulse bg-clip-text text-transparent">
                PROJECT HUB
            </span>
            {state.isMobile ? (
                <Fragment>
                    <div>
                        <button
                            type="button"
                            className=" justify-self-start items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                            aria-controls="navbar-cta"
                            aria-expanded={state.isMenuOpen}
                            onClick={toggleMenu}
                        >
                            <svg
                                className="w-5 h-5"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 17 14"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M1 1h15M1 7h15M1 13h15"
                                />
                            </svg>
                        </button>
                    </div>
                    <div className="justify-self-end">
                        <img
                            src="/logo-1.png"
                            alt=""
                            width={100}
                            height={100}
                        />
                    </div>
                    {state.isMenuOpen && (
                        <div className="">
                            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                                <NavItem href="/" label="Home" />
                                <NavItem href="/project/new" label="Add project" />
                                <NavItem href="/contact" label="Contact" />
                                <NavButton label="Logout" onClick={() => signOut()} />
                            </ul>
                        </div>
                    )}
                </Fragment>
            ) : (
                <Fragment>
                    <nav className={session ? "col-span-4" : "col-span-3"}>
                        <ul className="grid grid-cols-4 xl:text-xl lg:text-lg text-nav-text cursor-pointer hover:transition items-center gap-">
                            {session && (
                                <>
                                    {session?.user?.email ===
                                        process.env.NEXT_PUBLIC_ADMIN_EMAIL ? (
                                        <>
                                            <NavItem href="/project/new" label="Add project" />
                                            <NavItem href="/" label="View Projects" />
                                            <NavItem href="/admin" label="Admin Panel" />
                                            <NavItem href="/message" label="Messages" />
                                        </>
                                    ) : (
                                        <>
                                            <NavItem href="/project/new" label="Add project" />
                                            <NavItem href="/" label="View Projects" />
                                            <NavItem href="/contact" label="Contact" />
                                            <NavItem href="/dashboard/profile" label="Dashboard" />
                                        </>
                                    )}
                                </>
                            )}
                        </ul>
                    </nav>
                    {session ? (
                        <NavButton onClick={() => signOut()} label="Log out" />
                    ) : (
                        <div className="md:grid grid-cols-2 md:col-span-2 hidden md:gap-8 sm:gap-28">
                            <NavButton onClick={() => signIn("google")} label="Log in" />
                            <NavButton onClick={() => signIn("github")} label="Sign up" />
                        </div>
                    )}
                </Fragment>
            )}
        </div>
    );
};

export default Navbar;
