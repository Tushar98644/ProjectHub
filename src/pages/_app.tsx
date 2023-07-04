import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { AuthenticationGuard } from '@/providers';

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      {/* <AuthenticationGuard > */}
        <Component {...pageProps} />
      {/* </AuthenticationGuard> */}
    </SessionProvider>
  );
}
