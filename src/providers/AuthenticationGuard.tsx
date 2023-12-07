import { Loader } from "@/components";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function AuthenticationGuard({
    children,
}: {
    children: React.ReactNode;
}) {
    const { status, data: session } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "authenticated") {
            if (router.pathname === "/login") {
                router.push("/");
            }
        } else if (status === "unauthenticated") {
            if (router.pathname !== "/login") {
                router.push("/login");
            }
        }

        if (session?.user?.email != process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
            if (router.pathname === "/admin") {
                router.push("/");
            }
        }
    }, [status, router, session?.user?.email]);

    if (status === "loading") {
        return <Loader />;
    }

    return <>{children}</>;
}
