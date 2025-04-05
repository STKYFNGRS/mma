import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { headers } from 'next/headers';
import ContextProvider from '@/context';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: {
    default: "mma.box - Ultimate MMA Hub | UFC, Bellator, ONE Championship Coverage",
    template: "%s | mma.box"
  },
  description: "Your premier destination for comprehensive MMA coverage including UFC, Bellator, ONE Championship events, fighter profiles, breaking news, rankings, and exclusive fight analysis.",
  keywords: ["MMA", "UFC", "Bellator", "ONE Championship", "mixed martial arts", "MMA fighters", "UFC fights", "MMA news", "fight results", "MMA rankings", "MMA betting", "MMA training", "boxing", "kickboxing", "jiu-jitsu", "wrestling", "combat sports"],
  openGraph: {
    title: "mma.box - Ultimate Mixed Martial Arts Destination",
    description: "Complete MMA coverage with live events, fighter profiles, exclusive interviews, fight analysis, and the latest breaking news from UFC, Bellator, and global promotions.",
    url: "https://www.mma.box",
    siteName: "mma.box",
    images: [
      {
        url: "/android-chrome-512x512.png",
        width: 512,
        height: 512,
        alt: "mma.box logo"
      }
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "mma.box - Ultimate MMA Coverage | UFC, Bellator & More",
    description: "Follow the latest MMA events, fighters, and breaking news from the world's top promotions",
    creator: "@mmabox",
    images: ["/android-chrome-512x512.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-video-preview': -1,
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: { url: '/apple-touch-icon.png', sizes: '180x180' },
    other: [
      {
        rel: 'android-chrome',
        url: '/android-chrome-192x192.png',
        sizes: '192x192',
      },
      {
        rel: 'android-chrome',
        url: '/android-chrome-512x512.png',
        sizes: '512x512',
      },
    ],
  },
  manifest: '/site.webmanifest',
  alternates: {
    canonical: 'https://www.mma.box',
  }
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Get cookies for wallet state hydration (only used when wallet features are active)
  const headersObj = await headers();
  const cookies = headersObj.get('cookie');

  return (
    <html lang="en" className="h-full bg-black">
      <body className={`${inter.variable} antialiased flex flex-col min-h-screen bg-black text-white`}>
        <ContextProvider cookies={cookies}>
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </ContextProvider>
      </body>
    </html>
  );
}
