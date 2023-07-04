import { signIn } from 'next-auth/react'
import Link from 'next/link';

const Navbar = () => {
  return (
    <div className='nav font-bold flex flex-row xl:gap-24 lg:gap-16 md:gap-12 lg:mx-12 xl:mx-20 md:mx-10 mx-6 py-10 fixed'>
      <p className='lg:text-3xl md:text-2xl text-white font-black animate-pulse'>PROJECT HUB</p>
      <nav className='flex'>
        <ul className='flex-row xl:text-xl lg:text-lg text-nav-text lg:gap-8 xl:gap-16  md:gap-12 cursor-pointer hover:transition hidden md:flex'>
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