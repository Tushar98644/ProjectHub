import { SessionProvider } from "next-auth/react";
import AuthenticationGuard from "./AuthenticationGuard";
import { Session } from "next-auth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface CustomAppProps {
    session?: Session;
    children?: React.ReactNode;
}

const Provider = ({ children, session }: CustomAppProps) => {
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
