"use client";
import { Loader } from "@/components";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function AuthenticationGuard({
    children,
}: {
    children: React.ReactNode;
}) {
    const { status, data: session } = useSession();
    console.log(status);
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        if (status === "authenticated") {
            if (pathname === "/login") {
                router.push("/dashboard/projects");
            }
        } else if (status === "unauthenticated") {
            if (pathname !== "/login") {
                router.push("/login");
            }
        }

        console.log("Session email:", session?.user?.email);
        console.log("Admin email:", process.env.NEXT_PUBLIC_ADMIN_EMAIL);

        const sessionEmail = session?.user?.email?.trim().toLowerCase();
        const adminEmail =
            process.env.NEXT_PUBLIC_ADMIN_EMAIL?.trim().toLowerCase();

        if (
            sessionEmail &&
            adminEmail &&
            sessionEmail !== adminEmail &&
            pathname === "/admin"
        ) {
            router.push("/dashboard/projects");
        }
    }, [status, pathname, session?.user?.email, router]);

    if (status === "loading") {
        return <Loader />;
    }

    return <>{children}</>;
}
