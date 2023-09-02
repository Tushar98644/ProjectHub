import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Layout } from "@/components";
import { Provider } from "@/providers";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <Provider>
            <Layout />
            <Component {...pageProps} />
        </Provider>
    );
}
