import { SessionProvider } from "next-auth/react";
import AuthenticationGuard from "./AuthenticationGuard";
import { Session } from "next-auth";

interface CustomAppProps {
    session?: Session;
    children?: React.ReactNode;
}

const Provider = ({ children, session }: CustomAppProps) => {
    return (
        <SessionProvider session={session}>
            <AuthenticationGuard>{children}</AuthenticationGuard>
        </SessionProvider>
    );
};

export default Provider;
