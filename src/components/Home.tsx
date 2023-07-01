import { signOut } from "next-auth/react";
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] })

const Home = ({ children }:any) => {
  return (
    <div>  
        {children}
    </div>
  );
}

export default Home;