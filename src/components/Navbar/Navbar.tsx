/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link';
import { useEffect } from 'react';

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session } = useSession();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    window.innerWidth <= 768 ? setIsMobile(true) : setIsMobile(false);
    window.addEventListener("resize", () => {
      window.innerWidth <= 768 ? setIsMobile(true) : setIsMobile(false);
    });
  }, []);

  return (
    <div className='nav font-bold grid md:grid-cols-7 grid-cols-2 py-7 px-6 z-10 gap-2 border-b border-black shadow-xl bg-black items-center fixed w-full'>
      <span className='bg-gradient-to-r from-[#4ca5ff] to-[#b673f8] md:col-span-2 md:block hidden text-center px-2 lg:text-4xl md:text-2xl font-black animate-pulse bg-clip-text text-transparent'>PROJECT HUB</span>
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
          <div className='justify-self-end'>
            <img src="/logo-1.png" alt="" width={100} height={100} />
          </div>
          {isMenuOpen && (
            <div className="items-center justify-between w-full md:flex md:w-auto" id="navbar-cta">
              <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li>
                  <Link href="/" className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" aria-current="page">Home</Link>
                </li>
                <li>
                  <Link href="/project" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Add project</Link>
                </li>
                <li>
                  <Link href="/admin" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Admin</Link>
                </li>
              </ul>
            </div>
          )}
        </>
      ) : (
        <>
          <nav className='col-span-3 md:block hidden'>
            <ul className='md:grid grid-cols-3 hidden xl:text-xl lg:text-lg text-nav-text cursor-pointer hover:transition items-center gap-6'>
              {session && (
                <>
                  {session?.user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL ? (
                    <><li className='hover:text-white'><Link href='/project'>Add project</Link></li><li className='hover:text-white'><Link href='/'>View Projects</Link></li><li className='hover:text-white'>
                      <Link href='/admin'>
                        Admin Panel
                      </Link>
                    </li></>
                  ) : (
                    <><li className='hover:text-white'><Link href='/project'>Add project</Link></li><li className='hover:text-white'><Link href='/'>View Projects</Link></li><li className='hover:text-white'>
                      <Link href='/contact'>
                        Contact Admin
                      </Link>
                    </li></>
                  )
                  }
                </>
              )}
            </ul>
          </nav>
          {session ? (
            <div className='grid grid-cols-1 col-span-2 justify-items-center'>
              <div className='box w-[12vw] text-center lg:h-12 md:h-10 sm:h-9 h-8 justify-center'>
                <button className='text-nav-text text-[1.4vw] pt-1 cursor-pointer' onClick={() => signOut()}>Log out</button>
              </div>
            </div>
          ) : (
            <div className='md:grid grid-cols-2 md:col-span-2 hidden md:gap-8 sm:gap-28'>
              <div className='box w-[12vw] text-center lg:h-12 md:h-10 sm:h-9 h-8'>
                <button className='text-nav-text text-[1.5vw] pt-1 cursor-pointer' onClick={() => signIn('google')}>Log in</button>
              </div>
              <div className='box w-[12vw] text-center lg:h-12 md:h-10 sm:h-9 h-8'>
                <button className='text-nav-text text-[1.4vw] pt-1 cursor-pointer' onClick={() => signIn('github')}>Sign up</button>
              </div>
            </div>
          )}
        </>
      )}
    </div >

  );
}

export default Navbar;