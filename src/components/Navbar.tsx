import { signIn } from 'next-auth/react'

const Navbar = () => {
  return (
    <div className='nav font-bold flex flex-row xl:gap-56 lg:gap-24 md:gap-20 p-8 pl-24 fixed min-w-full sm:gap-40'>
      <p className='text-3xl text-white font-black animate-pulse'>PROJECT HUB</p>
      <nav className='lg:flex flex-row text-lg text-nav-text gap-16 cursor-pointer hover:transition sm:hidden md:flex xsm:hidden'>
        <ul className='hover:text-white'>Template Pages</ul>
        <ul className='hover:text-white'>Utility Pages</ul>
      </nav>
      <div className='flex flex-row lg:gap-8 xl:gap-10 md:gap-6 sm:gap-6'>
        <div className='box w-[12vw] text-center lg:h-12 md:h-10 sm:h-9'>
          <button className='text-nav-text text-[1.5vw] pt-1 cursor-pointer' onClick={() => signIn('google')}>Log in</button>
        </div>
        <div className='box w-[12vw] text-center lg:h-12 md:h-10 sm:h-9'>
          <button className='text-nav-text text-[1.4vw] pt-1 cursor-pointer' onClick={() => signIn('github')}>Sign up</button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;