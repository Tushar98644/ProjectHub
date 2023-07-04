import { useState } from 'react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='nav font-bold flex flex-row xl:gap-24 lg:gap-16 md:gap-12 lg:mx-12 xl:mx-20 md:mx-10 mx-6 py-10 fixed'>
      <p className='lg:text-3xl md:text-2xl text-white font-black animate-pulse'>PROJECT HUB</p>
      
      <div className="md:hidden flex items-center">
        <button className="outline-none mobile-menu-button" onClick={() => setIsOpen(!isOpen)}>
          <svg
            className="w-6 h-6 text-gray-500"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>

      <nav className={`${
        isOpen ? '' : 'hidden'
      } md:flex items-center space-x-3`}>
        <ul className='flex-row xl:text-xl lg:text-lg text-nav-text lg:gap-8 xl:gap-16  md:gap-12 cursor-pointer hover:transition'>
          <li className='hover:text-white'><Link href='/project'>Add project</Link></li>
          <li className='hover:text-white'><Link href='/'>View Projects</Link></li>
          <li className='hover:text-white'><Link href='/admin'>Admin Panel</Link></li>
        </ul>
      </nav>

      <div className='flex flex-row lg:gap-8 xl:gap-10 md:gap-6 sm:gap-2 gap-1'>
        <div className='box w-[12vw] text-center lg:h-12 md:h-10 sm:h-9 h-8'>
          <button className='text-nav-text text-[1.5vw] pt-1 cursor-pointer' onClick={() => signIn('google')}>Log in</button>
        </div>
        <div className='box w-[12vw] text-center lg:h-12 md:h-10 sm:h-9 h-8'>
          <button className='text-nav-text text-[1.4vw] pt-1 cursor-pointer' onClick={() => signIn('github')}>Sign up</button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
