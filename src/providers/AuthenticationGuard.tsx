import {Loader} from '@/components';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function AuthenticationGuard({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      if (router.pathname === '/login') {
        router.push('/');
      }
    } 
    else if (status === 'unauthenticated') {
      if (router.pathname !== '/login') {
        router.push('/login');
      }
    }
  }, [status, router]);

  if (status === 'loading') {
    return <Loader />;
  }
  
  return (
    <>
      {children}
    </>
  );
}
