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

        if (session?.user?.email != process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
            if (pathname === "/admin") {
                router.push("/dashboard/projects");
            }
        }
    }, [status, pathname, session?.user?.email, router]);

    if (status === "loading") {
        return <Loader />;
    }

    return <>{children}</>;
}
