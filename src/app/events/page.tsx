import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "MMA Events Calendar | Upcoming UFC, Bellator Fights",
  description: "Complete schedule of upcoming MMA events, including UFC, Bellator and more. Get fight cards, times, and viewing information.",
  keywords: ["MMA events", "UFC events", "Bellator events", "MMA schedule", "fight cards"],
  openGraph: {
    title: "MMA Events Calendar | Upcoming Fights",
    description: "Browse upcoming MMA events from around the world. Find fight cards, times, and viewing information.",
    url: "https://www.mma.box/events",
    type: "website"
  }
};

export default function EventsPage() {
  return (
    <div className="bg-black text-white min-h-screen">
      <div className="container mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-6">MMA Events</h1>
        <p className="text-xl text-gray-300 mb-8">
          Browse upcoming MMA events from around the world.
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