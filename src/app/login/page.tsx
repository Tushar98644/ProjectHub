'use client'
import { AI } from "@/shared";
import Lottie from "lottie-react";
import { signIn } from "next-auth/react";

const Login = () => {
    return (
        <div className="pb-28">
            <div className="md:grid grid-cols-3 flex flex-col-reverse lg:mx-20 md:mx-12 mx-8 sm:mx-12 gap-0 md:pt-60 pt-24 items-center">
                <div className="flex flex-col gap-6 col-span-2">
                    <div className="lg:text-5xl font-extrabold sm:text-3xl text-2xl">
                        AI Tools for{" "}
                        <span className="text-[#ff2bc1]">Every Endeavor</span>:
                        Streamline <span className="text-[#ff2bc1]">Your </span>
                        Projects, Amplify{" "}
                        <span className="text-[#ff2bc1]">Success</span>
                    </div>
                    <div className="text-nav-text lg:text-2xl text-xl font-serif">
                        Efficiency Meets Intelligence: Revolutionize Your
                        Workflow with AI Tools
                    </div>
                </div>
                <div className="col-span-1 justify-center">
                    <Lottie animationData={AI} height={150} width={150} />
                </div>
            </div>
            <div className="text-center pt-12">
                <button
                    className="text-nav-text text-lg cursor-pointer pt-2 pl-12 pr-12 pb-2 border border-gray-700 hover:text-white hover:border-white"
                    onClick={() => signIn()}
                >
                    Log in
                </button>
            </div>
        </div>
    );
};

export default Login;