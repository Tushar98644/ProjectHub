import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getSession } from 'next-auth/react'
import { redirect } from 'next/navigation';

export default function AuthenticationGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  
  useEffect(() => {
    getSession().then((session) => {
      if (!session && router.pathname !== '/login') {
        router.push('/login');
      } else if (session && router.pathname === '/login') {
        router.push('/');
      }
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  
  return (
    <>
      {children}
    </>
  );
}
