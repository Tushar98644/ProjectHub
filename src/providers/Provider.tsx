"use client";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppProps } from "@/types/app-props";
import AuthGaurd from "./AuthGaurd";

const Provider = ({ children, session }: AppProps) => {
    return (
        <SessionProvider session={session}>
            <AuthGaurd>
                <ToastContainer />
                {children}
            </AuthGaurd>
        </SessionProvider>
    );
};

export default Provider;
