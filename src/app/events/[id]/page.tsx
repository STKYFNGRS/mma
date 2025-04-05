import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

// Mock data for event details
const eventData = {
  1: {
    id: 1,
    title: 'UFC 298',
    date: 'April 15, 2025',
    location: 'Las Vegas, NV',
    venue: 'UFC Apex',
    mainEvent: 'Johnson vs. Thompson',
    description: 'An epic championship showdown at the UFC Apex.',
    startTime: '10:00:00',
    promotion: 'UFC',
    imageUrl: '/next.svg' // placeholder
  },
  2: {
    id: 2,
    title: 'Bellator 300',
    date: 'April 22, 2025',
    location: 'Los Angeles, CA',
    venue: 'Kia Forum',
    mainEvent: 'Davis vs. Rodriguez',
    description: 'Bellator celebrates its 300th event with a stacked card.',
    startTime: '10:00:00',
    promotion: 'Bellator',
    imageUrl: '/next.svg' // placeholder
  },
  3: {
    id: 3,
    title: 'UFC Fight Night',
    date: 'May 5, 2025',
    location: 'Miami, FL',
    venue: 'Kaseya Center',
    mainEvent: 'Lee vs. Garcia',
    description: 'Rising stars clash in this exciting Fight Night event.',
    startTime: '10:00:00',
    promotion: 'UFC',
    imageUrl: '/next.svg' // placeholder
  },
};

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const eventId = Number(params.id);
  const event = eventData[eventId as keyof typeof eventData];
  
  if (!event) {
    return {
      title: 'Event Not Found',
    };
  }
  
  return {
    title: `${event.title}: ${event.mainEvent} | MMA Fight Card`,
    description: `Watch ${event.mainEvent} and the complete ${event.title} fight card on ${event.date} at ${event.venue}, ${event.location}. Get tickets, stream info, and fight details.`,
    keywords: [`${event.title}`, `${event.mainEvent}`, `${event.promotion} event`, 'MMA event', 'fight card', event.location],
    openGraph: {
      title: `${event.title}: ${event.mainEvent}`,
      description: event.description,
      url: `https://www.mma.box/events/${eventId}`,
      type: 'website',
      images: [
        {
          url: event.imageUrl,
          width: 1200,
          height: 630,
          alt: `${event.title} fight poster`,
        },
      ],
    },
  };
}

export default function EventPage({ params }: { params: { id: string } }) {
  const eventId = Number(params.id);
  
  // Check if event exists in our data
  if (!eventData[eventId as keyof typeof eventData]) {
    notFound();
  }
  
  const event = eventData[eventId as keyof typeof eventData];
  const eventDateObject = new Date(`${event.date} ${event.startTime}`);
  const isoDate = eventDateObject.toISOString();
  
  // Schema.org structured data for the event
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'SportsEvent',
    'name': event.title,
    'description': event.description,
    'startDate': isoDate,
    'location': {
      '@type': 'Place',
      'name': event.venue,
      'address': {
        '@type': 'PostalAddress',
        'addressLocality': event.location
      }
    },
    'competitor': [
      {
        '@type': 'Person',
        'name': event.mainEvent.split(' vs. ')[0]
      },
      {
        '@type': 'Person',
        'name': event.mainEvent.split(' vs. ')[1]
      }
    ],
    'organizer': {
      '@type': 'Organization',
      'name': event.promotion
    }
  };
  
  return (
    <div className="bg-black text-white min-h-screen">
      {/* Add structured data script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />
      
      <div className="container mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-2">{event.title}</h1>
        <div className="flex items-center gap-4 text-gray-400 mb-6">
          <span>{event.date}</span>
          <span>•</span>
          <span>{event.location}</span>
        </div>
        <p className="text-xl text-red-500 font-medium mb-4">Main Event: {event.mainEvent}</p>
        <p className="text-lg text-gray-300 mb-8">{event.description}</p>
        
        <div className="flex gap-4">
          <Link 
            href="/events"
            className="inline-block px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
          >
            Back to Events
          </Link>
          <Link 
            href="/"
            className="inline-block px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
          >
            Home
          </Link>
        </div>
      </div>
    </div>
  );
} 