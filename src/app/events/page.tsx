import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import BreadcrumbNav from '@/components/BreadcrumbNav';

export const metadata: Metadata = {
  title: "MMA Events Calendar | Upcoming UFC, Bellator Fights",
  description: "Complete schedule of upcoming MMA events, including UFC, Bellator and more. Get fight cards, times, and viewing information.",
  keywords: ["MMA events", "UFC events", "Bellator events", "MMA schedule", "fight cards"],
  openGraph: {
    title: "MMA Events Calendar | Upcoming Fights",
    description: "Browse upcoming MMA events from around the world. Find fight cards, times, and viewing information.",
    url: "https://www.mma.box/events",
    type: "website"
  },
  alternates: {
    canonical: "https://www.mma.box/events"
  }
};

// Mock data - would be fetched from an API in a real application
const upcomingEvents = [
  { 
    id: 1, 
    title: 'UFC 298', 
    date: 'April 15, 2025', 
    location: 'Las Vegas, NV',
    mainEvent: 'Johnson vs. Thompson',
  },
  { 
    id: 2, 
    title: 'Bellator 300', 
    date: 'April 22, 2025', 
    location: 'Los Angeles, CA',
    mainEvent: 'Davis vs. Rodriguez',
  },
  { 
    id: 3, 
    title: 'UFC Fight Night', 
    date: 'May 5, 2025', 
    location: 'Miami, FL',
    mainEvent: 'Lee vs. Garcia',
  }
];

export default function EventsPage() {
  // Breadcrumb items
  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Events', path: '/events', isCurrentPage: true }
  ];

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="container mx-auto px-6 py-10">
        {/* Breadcrumb navigation */}
        <BreadcrumbNav items={breadcrumbItems} />
        
        <header className="mb-10">
          <h1 className="text-4xl font-bold mb-4">MMA Events Calendar</h1>
          <p className="text-xl text-gray-300">
            Browse upcoming MMA events from around the world. Find complete fight cards, times, and viewing information.
          </p>
        </header>
        
        <section aria-labelledby="upcoming-events-heading">
          <h2 id="upcoming-events-heading" className="text-2xl font-bold mb-6 border-b border-gray-800 pb-2">Upcoming Events</h2>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {upcomingEvents.map((event) => (
              <article key={event.id} className="bg-black/80 rounded-xl overflow-hidden shadow-lg hover:shadow-red-600/20 transition-all border border-gray-800/50 p-5">
                <div className="flex justify-between items-center mb-3">
                  <time dateTime={event.date.replace(/,/g, '').split(' ').join('-')} className="text-red-500 font-medium text-sm">
                    {event.date}
                  </time>
                  <span className="bg-black text-xs px-2 py-1 rounded text-gray-300 border border-gray-800/50">
                    {event.location}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">
                  <Link href={`/events/${event.id}`} className="hover:text-red-500 transition-colors">
                    {event.title}
                  </Link>
                </h3>
                <p className="text-gray-400 mb-4">Main: {event.mainEvent}</p>
                <Link 
                  href={`/events/${event.id}`} 
                  className="inline-block w-full text-center bg-red-600/20 hover:bg-red-600/30 text-red-500 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  View Details
                </Link>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
} 