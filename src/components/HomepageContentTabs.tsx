'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
// import { format } from 'date-fns';
// Import types from the new central file
import type { NewsArticle, UpcomingEvent, FeaturedFighter } from '@/types';

// Define the expected shape of props using imported types
interface HomepageContentTabsProps {
  initialNewsItems: NewsArticle[];
  upcomingEvents: UpcomingEvent[];
  featuredFighters: FeaturedFighter[]; // Add fighters
  newsError: string | null;
}

// Placeholder component for News card skeleton
const NewsCardPlaceholder = () => (
  <div className="bg-black/80 rounded-xl overflow-hidden shadow-lg border border-gray-800/50 animate-pulse">
    <div className="h-48 bg-gray-700"></div>
    <div className="p-5">
      <div className="h-4 bg-gray-700 rounded w-1/3 mb-2"></div>
      <div className="h-6 bg-gray-600 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-700 rounded w-full mb-1"></div>
      <div className="h-4 bg-gray-700 rounded w-5/6 mb-4"></div>
      <div className="h-5 bg-red-900 rounded w-1/4"></div>
    </div>
  </div>
);

export default function HomepageContentTabs({
  initialNewsItems,
  upcomingEvents,
  featuredFighters, // Receive fighters data
  newsError
}: HomepageContentTabsProps) {
  const [activeTab, setActiveTab] = useState('news');

  const tabs = ['news', 'events', 'fighters']; // Add 'fighters' back

  return (
    <section className="container mx-auto px-6 py-8 relative">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-900/20 to-transparent"></div>

      {/* Tab Buttons */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex rounded-lg border border-gray-800 p-1 bg-black/80 backdrop-blur-sm shadow-lg shadow-black/20">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-md font-medium transition-all ${
                activeTab === tab
                  ? 'bg-red-600 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="mt-8 min-h-[400px] relative">
        {/* News Tab */}
        <div className={`transition-opacity duration-300 ease-in-out ${activeTab === 'news' ? 'opacity-100' : 'opacity-0 invisible pointer-events-none'}`}>
          <div className={`${activeTab !== 'news' ? 'absolute inset-0 w-full' : 'w-full'}`}> {/* Ensure width is maintained */} 
            <h2 className="text-3xl font-bold mb-6 text-gray-100">Latest News & Updates</h2>
            {newsError && <p className="text-red-500">{newsError}</p>}
            
            {/* Show placeholders if no error and no items */}
            {!newsError && initialNewsItems.length === 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map(i => <NewsCardPlaceholder key={`placeholder-${i}`} />)}
              </div>
            )}

            {/* Show actual news items if available */}
            {!newsError && initialNewsItems.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {initialNewsItems.map((item, index) => {
                  // Ensure published_at is a Date object before formatting
                  // let displayDate = 'Date unavailable';
                  const itemDate = item.published_at;
                  if (itemDate) {
                    try {
                       // displayDate = format(new Date(itemDate), 'MMMM d, yyyy');
                    } catch (e) {
                      console.error("Error formatting date:", itemDate, e);
                      // Keep default 'Date unavailable'
                    }
                  }
                  const articleUrl = `/news/${item.slug ?? item.id}`;

                  return (
                    <div key={item.id} className="bg-black/80 rounded-xl overflow-hidden shadow-lg hover:shadow-red-600/10 transition-all border border-gray-800/50">
                      <div className="h-48 bg-gray-800 relative flex items-center justify-center overflow-hidden">
                        {item.image_url ? (
                          <Image
                            src={item.image_url}
                            alt={item.title}
                            width={307}
                            height={192}
                            className="h-full"
                            style={{ width: 'auto' }}
                            priority={index === 0}
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-gray-500">[News Image Placeholder]</span>
                          </div>
                        )}
                      </div>
                      <div className="p-5">
                        {/* <time dateTime={dateTime} className=\"text-gray-400 text-sm mb-2 block\">{displayDate}</time> */}
                        <h3 className="text-lg font-bold mb-2 text-white hover:text-red-500 transition-colors">
                          <Link href={articleUrl}>{item.title}</Link>
                        </h3>
                        {item.summary && (
                          <p className="text-gray-400 text-sm line-clamp-2">{item.summary}</p>
                        )}
                        <Link
                          href={articleUrl}
                          className="inline-block mt-4 text-red-500 hover:text-red-400 text-sm font-medium"
                        >
                          Read More →
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            <div className="text-center mt-8">
              <Link
                href="/news"
                className="inline-flex items-center text-red-500 hover:text-red-400"
              >
                View All News
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Events Tab */}
        <div className={`transition-opacity duration-300 ease-in-out ${activeTab === 'events' ? 'opacity-100' : 'opacity-0 invisible pointer-events-none'}`}>
          <div className={`${activeTab !== 'events' ? 'absolute inset-0 w-full' : 'w-full'}`}> {/* Ensure width is maintained */}
            <h2 className="text-3xl font-bold mb-6 text-gray-100">Upcoming Events</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingEvents.map((event) => (
                  // Event Card Component (Using original structure)
                  <div key={event.id} className="bg-black/80 rounded-xl overflow-hidden shadow-lg hover:shadow-red-600/20 transition-all hover:-translate-y-1 border border-gray-800/50">
                    <div className="h-48 bg-gray-800 relative">
                      {/* Using placeholder image - update if needed */}
                      <Image src={event.image} alt={event.title} fill sizes="33vw" className="object-contain p-8 opacity-10" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-gray-500">[Event Poster Placeholder]</span>
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-red-500 font-medium text-sm">{event.date}</span>
                        <span className="bg-black text-xs px-2 py-1 rounded text-gray-300 border border-gray-800/50">{event.location}</span>
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-white">{event.title}</h3>
                      <p className="text-gray-400 mb-4">Main: {event.mainEvent}</p>
                      <Link
                        href={`/events/${event.id}`} // Assuming event IDs correspond to URLs
                        className="inline-block w-full text-center bg-red-600/20 hover:bg-red-600/30 text-red-500 py-2 rounded-lg text-sm font-medium transition-colors"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center mt-8">
                <Link
                  href="/events"
                  className="inline-flex items-center text-red-500 hover:text-red-400"
                >
                  View All Events
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
          </div>
        </div>

        {/* Fighters Tab - Added Back */}
        <div className={`transition-opacity duration-300 ease-in-out ${activeTab === 'fighters' ? 'opacity-100' : 'opacity-0 invisible pointer-events-none'}`}>
           <div className={`${activeTab !== 'fighters' ? 'absolute inset-0 w-full' : 'w-full'}`}> {/* Ensure width is maintained */} 
             <h2 className="text-3xl font-bold mb-6 text-gray-100">Featured Fighters</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {featuredFighters.map((fighter) => (
                  <div 
                    key={fighter.id} 
                    className="bg-black/80 rounded-xl overflow-hidden shadow-lg hover:shadow-red-600/10 transition-all border border-gray-800/50 p-6 text-center"
                  >
                    {/* Fighter Image - Circle */}
                    <div className="w-32 h-32 mx-auto bg-gray-800 rounded-full mb-4 relative border-2 border-red-900/20">
                      {fighter.image ? (
                         <Image 
                            src={fighter.image} 
                            alt={fighter.name} 
                            width={307}
                            height={192}
                            className="h-full"
                            style={{ width: 'auto' }}
                         />
                      ) : (
                         <div className="absolute inset-0 flex items-center justify-center rounded-full">
                          <span className="text-gray-500">[Fighter]</span>
                         </div>
                      )}
                    </div>
                    
                    <h3 className="text-xl font-bold mb-1 text-white">{fighter.name}</h3>
                    <p className="text-red-500 font-medium mb-2">{fighter.division}</p>
                    <div className="inline-block px-3 py-1 bg-black border border-gray-800/50 rounded-full text-sm text-gray-300 mb-4">
                      {fighter.record}
                    </div>
                    
                    <Link 
                      href={`/fighters/${fighter.id}`} // Assuming fighter IDs correspond to URLs 
                      className="inline-block w-full text-center border border-red-600 text-red-500 hover:bg-red-600 hover:text-white py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      View Profile
                    </Link>
                  </div>
                ))}
              </div>
              <div className="text-center mt-8">
                <Link 
                  href="/fighters" 
                  className="inline-flex items-center text-red-500 hover:text-red-400"
                >
                  View All Fighters
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
           </div>
        </div>

      </div>
    </section>
  );
}