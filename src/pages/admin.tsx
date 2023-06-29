import { Navbar } from "@/components";
import { HI, Welcome } from "@/shared";
import Lottie from "lottie-react";

const Admin = () => {
    return (
        <div>
            <Navbar />
            <div className="p-48 text-nav-text text-4xl font-bold flex flex-row gap-10">
                <h1>welcome</h1>
                <Lottie animationData={HI} height={50} width={50} />
            </div>
        </div>
    );
}

export default Admin;