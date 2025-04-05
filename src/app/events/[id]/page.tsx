import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// Mock data for event details
const eventData = {
  1: {
    id: 1,
    title: 'UFC 298',
    date: 'April 15, 2025',
    location: 'Las Vegas, NV',
    mainEvent: 'Johnson vs. Thompson',
    description: 'An epic championship showdown at the UFC Apex.',
  },
  2: {
    id: 2,
    title: 'Bellator 300',
    date: 'April 22, 2025',
    location: 'Los Angeles, CA',
    mainEvent: 'Davis vs. Rodriguez',
    description: 'Bellator celebrates its 300th event with a stacked card.',
  },
  3: {
    id: 3,
    title: 'UFC Fight Night',
    date: 'May 5, 2025',
    location: 'Miami, FL',
    mainEvent: 'Lee vs. Garcia',
    description: 'Rising stars clash in this exciting Fight Night event.',
  },
};

export default function EventPage({ params }: { params: { id: string } }) {
  const eventId = Number(params.id);
  
  // Check if event exists in our data
  if (!eventData[eventId as keyof typeof eventData]) {
    notFound();
  }
  
  const event = eventData[eventId as keyof typeof eventData];
  
  return (
    <div className="bg-black text-white min-h-screen">
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