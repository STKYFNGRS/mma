'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image'; // Import Image
// import { format } from 'date-fns';
// Import types from the new central file
import type { NewsArticle, Event, FeaturedFighter } from '@/types';
import { formatEventDate } from '@/utils/dateUtils'; // Adjust path if needed

// Define the expected shape of props using imported types
interface HomepageContentTabsProps {
  latestNews: NewsArticle[];
  upcomingEvents: Event[]; // Use real Event type
  featuredFighters: FeaturedFighter[];
}

// Client-side countdown component for real-time updates
export function EventCountdown({ event }: { event: Event }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  
  useEffect(() => {
    // Skip if no date
    if (!event.date) return;
    
    const eventDate = new Date(event.date);
    
    const updateCounter = () => {
      const now = new Date();
      if (eventDate > now) {
        const timeDiff = eventDate.getTime() - now.getTime();
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    };
    
    // Update immediately then set interval
    updateCounter();
    const interval = setInterval(updateCounter, 1000);
    
    // Cleanup
    return () => clearInterval(interval);
  }, [event.date]);
  
  return (
    <div className="grid grid-cols-4 gap-3 text-center">
      <div className="px-3 py-2 bg-black rounded-lg">
        <div className="text-2xl font-bold text-white">{timeLeft.days}</div>
        <div className="text-xs text-gray-500">DAYS</div>
      </div>
      <div className="px-3 py-2 bg-black rounded-lg">
        <div className="text-2xl font-bold text-white">{timeLeft.hours}</div>
        <div className="text-xs text-gray-500">HRS</div>
      </div>
      <div className="px-3 py-2 bg-black rounded-lg">
        <div className="text-2xl font-bold text-white">{timeLeft.minutes}</div>
        <div className="text-xs text-gray-500">MIN</div>
      </div>
      <div className="px-3 py-2 bg-black rounded-lg">
        <div className="text-2xl font-bold text-white">{timeLeft.seconds}</div>
        <div className="text-xs text-gray-500">SEC</div>
      </div>
    </div>
  );
}

export default function HomepageContentTabs({
  latestNews,
  upcomingEvents,
  featuredFighters
}: HomepageContentTabsProps) {
  const [activeTab, setActiveTab] = useState('events');

  return (
    <section className="container mx-auto px-4 py-8 md:py-12">
      {/* Tab Buttons */}
      <div className="flex justify-center space-x-2 md:space-x-4 mb-8">
        {['events', 'news', 'fighters'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 md:px-6 md:py-2.5 rounded-full text-sm md:text-base font-semibold transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black ${ 
              activeTab === tab 
                ? 'bg-red-600 text-white shadow-md' 
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
            }`}
          >
            {tab === 'events' ? 'Upcoming Events' : tab === 'news' ? 'Latest News' : 'Featured Fighters'}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="min-h-[300px]">
        {/* Upcoming Events Tab */} 
        {activeTab === 'events' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fadeIn">
            {upcomingEvents.length > 0 ? upcomingEvents.map((event) => (
              <Link href={`/events/${event.id}`} key={event.id} className="block bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
                 {event.image_url && (
                     <div className="relative w-full aspect-[21/9]"> {/* Updated to match detail page */} 
                         <Image 
                             src={event.image_url} 
                             alt={event.event_name || 'Event'} 
                             fill
                             style={{ objectFit: 'cover', objectPosition: 'center top' }}
                             className="transition-transform duration-300 group-hover:scale-105"
                             sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                         />
                     </div>
                 )}
                 <div className="p-4">
                    <p className="text-xs text-indigo-400 font-semibold mb-1 uppercase tracking-wider">{event.league}</p>
                    <h3 className="text-lg font-bold text-white mb-1 truncate group-hover:text-red-500 transition-colors" title={event.event_name || event.main_card || 'Event'}>
                         {event.event_name || event.main_card}
                     </h3>
                     <p className="text-sm text-gray-400 mb-1">{formatEventDate(event.date)}</p>
                     <p className="text-sm text-gray-500 truncate">{event.location || 'Location TBD'}</p>
                 </div>
               </Link>
            )) : (
                 <p className="text-gray-400 italic col-span-full text-center">No upcoming events found.</p>
            )}
          </div>
        )}

        {/* Latest News Tab */}
        {activeTab === 'news' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fadeIn">
            {latestNews.length > 0 ? latestNews.map((article) => (
                <Link href={`/news/${article.slug}`} key={article.id} className="block bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
                    {article.image_url && (
                         <div className="relative w-full h-40"> {/* Container for Image */} 
                             <Image 
                                 src={article.image_url} 
                                 alt={article.title || 'News'} 
                                 fill
                                 style={{ objectFit: 'cover' }}
                                 className="transition-transform duration-300 group-hover:scale-105"
                                 sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                             />
                         </div>
                    )}
                    <div className="p-4">
                         <h3 className="text-lg font-bold text-white mb-1 truncate group-hover:text-red-500 transition-colors" title={article.title}>
                             {article.title}
                         </h3>
                         <p className="text-sm text-gray-400 mb-1 line-clamp-2">{article.summary}</p>
                         <p className="text-xs text-gray-500">{article.published_at ? formatEventDate(article.published_at) : 'Date unknown'}</p>
                     </div>
                </Link>
            )) : (
                 <p className="text-gray-400 italic col-span-full text-center">No latest news found.</p>
            )}
          </div>
        )}

        {/* Featured Fighters Tab */}
        {activeTab === 'fighters' && (
           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 animate-fadeIn">
             {featuredFighters.length > 0 ? featuredFighters.map((fighter) => (
                 <div key={fighter.id} className="text-center bg-gray-800 rounded-lg shadow-lg p-4 group">
                     <div className="relative w-24 h-24 mx-auto mb-3">
                         {fighter.image ? (
                             <Image 
                                 src={fighter.image} 
                                 alt={fighter.name} 
                                 fill
                                 className="rounded-full object-cover border-2 border-gray-700 group-hover:border-red-600 transition-colors"
                                 sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                             />
                         ) : (
                             <div className="w-full h-full rounded-full bg-gray-700 flex items-center justify-center border-2 border-gray-600 text-gray-400">
                                 {fighter.name.substring(0, 2).toUpperCase()}
                             </div>
                         )}
                     </div>
                     <h3 className="font-semibold text-white group-hover:text-red-500 transition-colors">{fighter.name}</h3>
                     <p className="text-sm text-gray-400">{fighter.division}</p>
                     <p className="text-xs text-gray-500">{fighter.record}</p>
                 </div>
             )) : (
                 <p className="text-gray-400 italic col-span-full text-center">No featured fighters found.</p>
             )}
           </div>
        )}
      </div>
    </section>
  );
}