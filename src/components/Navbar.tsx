import { signIn } from 'next-auth/react'

const Navbar = () => {
    return ( 
        <div className='nav font-bold flex flex-row gap-56 p-8 pl-24 fixed w-full'>
          <p className='text-3xl text-white font-black animate-pulse'>PROJECT HUB</p>
          <nav className='flex flex-row text-lg text-nav-text gap-16 cursor-pointer hover:transition '>
            <ul className='hover:text-white'>Template Pages</ul>
            <ul className='hover:text-white'>Utility Pages</ul>
          </nav>
          <div className='flex flex-row gap-10 text-center'>
            <div className='box'>
              <button className='text-nav-text text-lg cursor-pointer' onClick={() => signIn()}>Log in</button>
            </div>
            <div className='box'>
              <p className='text-nav-text text-lg justify-center rounded-lg hover:border-white cursor-pointer'>Sign up</p>
            </div>
          </div>
        </div>
     );
}
 
export default Navbar;