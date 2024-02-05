"use client"
import { Sparkles,Chatbot } from "@/components";
import Navbar from "../Navbar/Navbar";
import { Provider } from "@/providers";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="relative w-full bg-black">
            <div className="w-full absolute inset-0">
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
                    <Navbar />
                    <Chatbot />
                    {children}
                </Provider>
            </>
        </div>
    );
}

export default Layout;