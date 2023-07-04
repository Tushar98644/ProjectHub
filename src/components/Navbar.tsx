import { useState } from 'react';
import { signIn } from 'next-auth/react'
import Link from 'next/link';
import { useEffect } from 'react';

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    window.innerWidth <= 638 ? setIsMobile(true) : setIsMobile(false);
    window.addEventListener("resize", () => {
      window.innerWidth <= 638 ? setIsMobile(true) : setIsMobile(false);
    });
  }, []);

  return (
    <div className='nav font-bold grid sm:grid-cols-7 grid-cols-2 lg:mx-12 xl:mx-12 md:mx-10 mx-6 py-10 fixed items-center md:gap-4 z-10'>
      <p className='sm:col-span-2 sm:block hidden text-center px-2 lg:text-3xl md:text-2xl text-[#ff2bc1] font-black animate-pulse'>PROJECT HUB</p>
      {isMobile ? (
        <>
          <div className=''>
            <button type="button" className=" justify-self-start items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-cta" aria-expanded={isMenuOpen} onClick={toggleMenu}>
              <span className="sr-only">Open main menu</span>
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
              </svg>
            </button>
          </div>
          <div className='items-center'>
            <p className='sm:text-3xl text-2xl text-[#ff2bc1] font-black animate-pulse'>PROJECT HUB</p>
          </div>
          {isMenuOpen && (
            <div className="items-center justify-between w-full md:flex md:w-auto" id="navbar-cta">
              <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li>
                  <a href="#" className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" aria-current="page">Home</a>
                </li>
                <li>
                  <a href="#" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">About</a>
                </li>
                <li>
                  <a href="#" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Services</a>
                </li>
                <li>
                  <a href="#" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Contact</a>
                </li>
              </ul>
            </div>
          )}
        </>
      ) : (
        <><nav className='col-span-3 sm:block hidden'>
          <ul className='sm:grid grid-cols-3 hidden xl:text-xl lg:text-lg text-nav-text cursor-pointer hover:transition items-center gap-6'>
            <li className='hover:text-white'><Link href='/project'>Add project</Link></li>
            <li className='hover:text-white'><Link href='/'>View Projects</Link></li>
            <li className='hover:text-white'><Link href='/admin'>Admin Panel</Link></li>
          </ul>
        </nav><div className='sm:grid grid-cols-2 md:col-span-2 hidden md:gap-8 sm:gap-28'>
            <div className='box w-[12vw] text-center lg:h-12 md:h-10 sm:h-9 h-8'>
              <button className='text-nav-text text-[1.5vw] pt-1 cursor-pointer' onClick={() => signIn('google')}>Log in</button>
            </div>
            <div className='box w-[12vw] text-center lg:h-12 md:h-10 sm:h-9 h-8'>
              <button className='text-nav-text text-[1.4vw] pt-1 cursor-pointer' onClick={() => signIn('github')}>Sign up</button>
            </div>
          </div></>
      )}
    </div >

  );
}

export default Navbar;