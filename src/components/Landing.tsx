import Lottie from 'lottie-react';
import { Navbar } from '.';
import { AI } from '@/shared';

const Landing = () => {
    return ( 
        <div className='flex flex-col min-h-screen w-full'>
        <Navbar />
        <div className='flex flex-row'>
          <div className='flex flex-col lg:pt-60 lg:pl-32 gap-8 md:pt-48 md:pl-20 w-2/3 sm:'>
            <div className='lg:text-5xl font-extrabold md:text-4xl sm:text-2xl'>AI Tools for  <span className='text-[#ff2bc1]'>Every Endeavor</span>: Streamline Your Projects, Amplify   <span className='text-[#ff2bc1]'>Success</span></div>
            <div className='text-nav-text text-2xl font-serif'>Efficiency Meets Intelligence: Revolutionize Your Workflow with AI Tools</div>
          </div>
          <div className='w-1/3 flex mt-72'>
            <Lottie animationData={AI} height={100} width={100} />
          </div>
        </div>
      </div> 
     );
}
 
export default Landing;