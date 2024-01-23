'use client'
import { Back, Error } from "@/shared";
import Lottie from "lottie-react";
import Link from "next/link";

const Page_Error = () => {
    return (
            <div className="grid md:grid-cols-5 md:gap-12 gap-0 pt-32 text-gray-400 text-4xl font-bold md:mx-12 mx-8 text-center justify-items-center">
                <div className="flex flex-col gap-4 md:pt-20 items-center md:col-span-3 md:order-first">
                    <h1 className="">404</h1>
                    <h1 className="bg-gradient-to-r from-[#4ca5ff] to-[#b673f8] bg-clip-text text-transparent">
                        Page Not Found
                    </h1>
                    <h1>
                        Ah! Looks like{" "}
                        <span className="bg-gradient-to-r from-[#4ca5ff] to-[#b673f8] bg-clip-text text-transparent">
                            you wandered into
                        </span>{" "}
                        a wrong page.
                        <span className="bg-gradient-to-r from-[#4ca5ff] to-[#b673f8] bg-clip-text text-transparent">
                            {" "}
                            Click the Earth to navigate{" "}
                        </span>
                        back to the homepage
                    </h1>
                    {/* <h1>Click on the <span className="bg-gradient-to-r from-[#4ca5ff] to-[#b673f8] bg-clip-text text-transparent">Earth to land </span>  on the home page</h1> */}
                    <div className="sm:h-[350px] sm:w-[300px] w-80 h-80">
                        <Link href={"/"}>
                            <Lottie animationData={Back} />
                        </Link>
                    </div>
                </div>
                <div className="md:w-[430px] w-80 h-80 md:col-span-2 order-first">
                    <Lottie animationData={Error} />
                </div>
            </div>
    );
};

export default Page_Error;
