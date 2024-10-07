"use client"
import { Sparkles, Chatbot } from "@/components";
import Navbar from "../Navbar/Navbar";
import { Provider } from "@/providers";
import { usePathname } from "next/navigation";
import SideNav from "../SideNav/SideNav";

const Layout = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();
    const isDashboard = pathname?.includes("/dashboard");

    return (
        <div className="relative w-full bg-black">
            <div className="w-full absolute inset-0 z-0">
                <Sparkles
                    id="tsparticlesfullpage"
                    background="transparent"
                    minSize={0.6}
                    maxSize={1.4}
                    particleDensity={100}
                    className="w-full h-full"
                    particleColor="#FFFFFF"
                />
            </div>
            <>
                <Provider>
                    {!isDashboard && <Navbar />}
                    {isDashboard && <Chatbot />}
                    {children}
                </Provider>
            </>
        </div>
    );
}

export const DashLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex h-screen">
            <SideNav />
            <div className="ml-[25vw] flex items-start justify-center">
                {children}
            </div>
        </div>
    );
};

export default Layout;