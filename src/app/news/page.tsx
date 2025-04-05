import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "MMA News | Latest UFC, Bellator & Fighting Updates",
  description: "Get the latest MMA news, fight announcements, results, and analysis from UFC, Bellator, and other major MMA promotions worldwide.",
  keywords: ["MMA news", "UFC news", "Bellator news", "fight results", "MMA analysis", "fighter interviews"],
  openGraph: {
    title: "MMA News | Latest Fighting Updates",
    description: "Stay up to date with the latest news and updates from the world of MMA.",
    url: "https://www.mma.box/news",
    type: "website"
  }
};

export default function NewsPage() {
  return (
    <div className="bg-black text-white min-h-screen">
      <div className="container mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-6">MMA News</h1>
        <p className="text-xl text-gray-300 mb-8">
          Latest news and updates from the world of MMA.
        </p>
        
        <Link 
          href="/"
          className="inline-block px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
} 