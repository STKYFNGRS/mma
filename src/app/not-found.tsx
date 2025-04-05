import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Not Found | mma.box',
  description: 'The page you are looking for cannot be found. Return to mma.box for MMA news, events, and fighter profiles.',
  robots: {
    index: false,
    follow: true,
  }
};

export default function NotFound() {
  return (
    <div className="bg-black text-white min-h-screen">
      <div className="container mx-auto px-6 py-20 text-center">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-red-600 text-5xl md:text-7xl font-extrabold mb-6">404</h1>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Page Not Found</h2>
          <p className="text-gray-300 text-xl mb-8">
            The page you are looking for might have been removed, had its name changed, 
            or is temporarily unavailable.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Link 
              href="/"
              className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-all"
            >
              Return Home
            </Link>
            <Link 
              href="/events"
              className="px-8 py-4 bg-gray-800 hover:bg-gray-700 text-white font-bold rounded-lg transition-all border border-gray-700"
            >
              Browse Events
            </Link>
          </div>
          
          <div className="border-t border-gray-800 pt-10">
            <h3 className="text-xl font-bold mb-6">Looking for something else?</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { title: 'Latest News', href: '/news' },
                { title: 'Fighter Profiles', href: '/fighters' },
                { title: 'Community', href: '/community' },
                { title: 'Shop', href: '/shop' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="p-4 bg-black/50 border border-gray-800 rounded hover:border-red-600/50 transition-colors"
                >
                  {link.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 