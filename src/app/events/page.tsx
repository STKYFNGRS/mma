import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import { fetchPublishedEvents } from '@/lib/eventServices';
import { formatEventDate } from '../../utils/dateUtils';

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

export default async function EventsPage() {
  const events = await fetchPublishedEvents();

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
          
          {events.length === 0 ? (
            <p className="text-center text-gray-400">No published events found.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <Link href={`/events/${event.id}`} key={event.id} className="block bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  {/* Use next/image */}
                  {event.image_url && (
                    <div className="relative w-full h-48"> {/* Container for Image */} 
                      <Image 
                        src={event.image_url} 
                        alt={event.event_name || 'Event Image'} 
                        fill 
                        style={{ objectFit: 'cover' }}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <p className="text-sm text-indigo-400 font-semibold">{event.league}</p>
                    <h2 className="text-xl font-bold text-white mt-1 mb-2 truncate" title={event.event_name || event.main_card || 'Event'}>{event.event_name || event.main_card || 'Event'}</h2>
                    <p className="text-gray-400 text-sm mb-1">{formatEventDate(event.date)}</p>
                    <p className="text-gray-400 text-sm truncate">{event.location || 'Location TBD'}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
} 