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
      <div className="bg-gray-900/50 py-10 px-4 md:px-8 rounded-2xl border border-gray-800/60 shadow-lg mx-auto">
        {/* Tab Buttons */}
        <div className="flex justify-center space-x-3 md:space-x-6 mb-10">
          {['events', 'news', 'fighters'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 md:px-7 md:py-3 rounded-full text-sm md:text-base font-semibold transition-all duration-300 ease-in-out focus:outline-none ${
                activeTab === tab 
                  ? 'bg-red-600 text-white shadow-md ring-2 ring-red-500/30 ring-offset-2 ring-offset-gray-900' 
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
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto animate-fadeIn">
                {upcomingEvents.slice(0, 3).map((event) => (
                  <Link href={`/events/${event.id}`} key={event.id} className="block bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
                    {event.image_url && (
                      <div className="relative w-full aspect-[16/9]">
                        <Image 
                          src={event.image_url} 
                          alt={event.event_name || 'Event'} 
                          fill
                          style={{ objectFit: 'cover', objectPosition: 'center top' }}
                          className="transition-transform duration-300 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <p className="text-xs text-indigo-400 font-semibold mb-1 uppercase tracking-wider">{event.league}</p>
                      <h3 className="text-xl font-bold text-white mb-2 truncate group-hover:text-red-500 transition-colors" title={event.event_name || event.main_card || 'Event'}>
                        {event.event_name || event.main_card}
                      </h3>
                      <p className="text-sm text-gray-400 mb-2">{formatEventDate(event.date)}</p>
                      <p className="text-sm text-gray-500 truncate">{event.location || 'Location TBD'}</p>
                    </div>
                  </Link>
                ))}
                {upcomingEvents.length === 0 && (
                  <p className="text-gray-400 italic col-span-full text-center">No upcoming events found.</p>
                )}
              </div>
            </>
          )}

          {/* Latest News Tab */}
          {activeTab === 'news' && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto animate-fadeIn">
                {latestNews.slice(0, 3).map((article) => (
                  <Link href={`/news/${article.slug}`} key={article.id} className="block bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
                    {article.image_url && (
                      <div className="relative w-full aspect-[16/9]">
                        <Image 
                          src={article.image_url} 
                          alt={article.title || 'News'} 
                          fill
                          style={{ objectFit: 'cover' }}
                          className="transition-transform duration-300 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-2 truncate group-hover:text-red-500 transition-colors" title={article.title}>
                        {article.title}
                      </h3>
                      <p className="text-sm text-gray-400 mb-2 line-clamp-2">{article.summary}</p>
                      <p className="text-xs text-gray-500">{article.published_at ? formatEventDate(article.published_at) : 'Date unknown'}</p>
                    </div>
                  </Link>
                ))}
                {latestNews.length === 0 && (
                  <p className="text-gray-400 italic col-span-full text-center">No latest news found.</p>
                )}
              </div>
            </>
          )}

          {/* Featured Fighters Tab */}
          {activeTab === 'fighters' && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-5xl mx-auto animate-fadeIn">
                {featuredFighters.slice(0, 3).map((fighter) => (
                  <div key={fighter.id} className="text-center bg-gray-800 rounded-lg shadow-lg p-6 group">
                    <div className="relative w-32 h-32 mx-auto mb-4">
                      {fighter.image ? (
                        <Image 
                          src={fighter.image} 
                          alt={fighter.name} 
                          fill
                          className="rounded-full object-cover border-2 border-gray-700 group-hover:border-red-600 transition-colors"
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                        />
                      ) : (
                        <div className="w-full h-full rounded-full bg-gray-700 flex items-center justify-center border-2 border-gray-600 text-gray-400 text-2xl font-bold">
                          {fighter.name.substring(0, 2).toUpperCase()}
                        </div>
                      )}
                    </div>
                    <h3 className="text-xl font-semibold text-white group-hover:text-red-500 transition-colors">{fighter.name}</h3>
                    <p className="text-md text-gray-400 mt-1">{fighter.division}</p>
                    <p className="text-sm text-gray-500 mt-1">{fighter.record}</p>
                  </div>
                ))}
                {featuredFighters.length === 0 && (
                  <p className="text-gray-400 italic col-span-full text-center">No featured fighters found.</p>
                )}
              </div>
            </>
          )}
        </div>
        
        {/* View All buttons */}
        {activeTab === 'events' && upcomingEvents.length > 3 && (
          <div className="text-center mt-10">
            <Link href="/events" className="inline-flex items-center px-6 py-3 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors shadow-md font-medium">
              View All Events
              <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        )}
        
        {activeTab === 'news' && latestNews.length > 3 && (
          <div className="text-center mt-10">
            <Link href="/news" className="inline-flex items-center px-6 py-3 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors shadow-md font-medium">
              View All News
              <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        )}
        
        {activeTab === 'fighters' && featuredFighters.length > 3 && (
          <div className="text-center mt-10">
            <Link href="/fighters" className="inline-flex items-center px-6 py-3 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors shadow-md font-medium">
              View All Fighters
              <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}