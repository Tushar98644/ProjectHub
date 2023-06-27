import Lottie from 'lottie-react';
import { Navbar } from '.';
import { AI } from '@/shared';
import { signIn } from 'next-auth/react';

const Landing = () => {
    return (
        <div className='flex flex-col min-h-screen w-full'>
            <Navbar />
            <div className='flex md:flex-row sm:flex-col-reverse'>
                <div className='flex flex-col lg:pt-60 lg:pl-32 gap-8 md:pt-48 md:pl-20 w-2/3 sm:'>
                    <div className='lg:text-5xl font-extrabold md:text-4xl sm:text-2xl'>AI Tools for  <span className='text-[#ff2bc1]'>Every Endeavor</span>: Streamline <span className='text-[#ff2bc1]'>Your </span>Projects, Amplify   <span className='text-[#ff2bc1]'>Success</span></div>
                    <div className='text-nav-text text-2xl font-serif'>Efficiency Meets Intelligence: Revolutionize Your Workflow with AI Tools</div>
                </div>
                <div className='w-1/3 flex mt-44'>
                    <Lottie animationData={AI} height={100} width={100} />
                </div>
            </div>
            <div className='text-center pl-96 w-1/2 mt-0'>
                <button className='text-nav-text text-lg cursor-pointer mt-[-5vw] pt-2 pl-12 pr-12 pb-2 border border-gray-700 hover:text-white hover:border-white' onClick={() => signIn()}>Log in</button>
            </div>
        </div>
    );
}

export default Landing;