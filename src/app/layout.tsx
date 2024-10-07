import type { Metadata } from "next";
import { Inter } from "next/font/google";
import '@/styles/globals.css';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Layout from "@/components/Layout/Layout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ProjectHub",
  description: "A comprehensive platform that integrates various ai-powered tools and useful websites",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <html lang="en">
      <body className={inter.className}>
        <Layout>
            {children}
            <SpeedInsights />
        </Layout>
      </body>
    </html>
  );
}
