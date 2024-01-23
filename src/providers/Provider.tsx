'use client'
import { SessionProvider } from "next-auth/react";
import AuthenticationGuard from "./AuthenticationGuard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppProps } from "@/types/app-props";

const Provider = ({ children, session }: AppProps) => {
    return (
        <SessionProvider session={session}>
            <AuthenticationGuard>
                <ToastContainer />
                {children}
            </AuthenticationGuard>
        </SessionProvider>
    );
};

export default Provider;
