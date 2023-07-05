import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { AuthenticationGuard } from '@/providers';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <AuthenticationGuard >
        <ToastContainer/>
        <Component {...pageProps}/>
      </AuthenticationGuard>
    </SessionProvider >
  );
}
