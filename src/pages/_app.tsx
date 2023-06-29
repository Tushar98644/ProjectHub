import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider, getSession } from 'next-auth/react'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getSession()
      .then((session) => {
        if (!session && router.pathname !== '/login') {
          // User is not logged in and not on the login page, redirect to login
          router.push('/login');
        } else if (session && router.pathname === '/login') {
          // User is logged in but on the login page, redirect to homepage
          router.push('/');
        }
        // Stop showing loading spinner
        setLoading(false);
      });
  }, []);

  // If we're still checking the session, show a loading spinner
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
