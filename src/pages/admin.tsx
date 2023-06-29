import { Navbar } from "@/components";
import { HI } from "@/shared";
import Lottie from "lottie-react";

const Admin = () => {
    return (
        <div>
            <Navbar />
            <div className="p-48 text-nav-text text-5xl font-bold flex flex-row items-center gap-0">
                <div className="w-[15vw]">
                    <Lottie animationData={HI} height={50} width={50} className=""/>
                </div>
                <p>welcome </p>
            </div>
        </div>
    );
}

export default Admin;