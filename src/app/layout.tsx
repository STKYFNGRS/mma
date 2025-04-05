import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { headers } from 'next/headers';
import ContextProvider from '@/context';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: "mma.box - MMA Fan Hub",
  description: "The ultimate destination for MMA fans.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersObj = await headers();
  const cookies = headersObj.get('cookie');

  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased`}
      >
        <ContextProvider cookies={cookies}>{children}</ContextProvider>
      </body>
    </html>
  );
}
