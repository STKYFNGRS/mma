import type { Metadata } from 'next';

const metadata: Metadata = {
  title: "mma.box - Your Ultimate MMA Destination | Live Events, News & Fighters",
  description: "Follow live MMA events, fighter stats, breaking news, exclusive content, and join the growing community of MMA fans at mma.box.",
  keywords: ["MMA", "UFC", "Bellator", "fighters", "mixed martial arts", "MMA events", "MMA news", "MMA community"],
  metadataBase: new URL('https://mma.box'),
  openGraph: {
    title: "mma.box - Your Ultimate MMA Destination",
    description: "Follow live events, fighter stats, breaking news, and exclusive content in one place.",
    url: "https://www.mma.box",
    type: "website",
    images: [
      {
        url: "/android-chrome-512x512.png",
        width: 512,
        height: 512,
        alt: "mma.box logo"
      }
    ],
  }
};

export default metadata;