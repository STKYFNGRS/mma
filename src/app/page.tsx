'use client'; 

import { useState, useEffect } from 'react';
import Link from 'next/link';

// Mock data - in a real app, this would come from an API
const upcomingEvents = [
  { 
    id: 1, 
    title: 'UFC 298', 
    date: 'April 15, 2025', 
    location: 'Las Vegas, NV',
    mainEvent: 'Johnson vs. Thompson',
    image: '/next.svg', // placeholder, replace with real image
  },
  { 
    id: 2, 
    title: 'Bellator 300', 
    date: 'April 22, 2025', 
    location: 'Los Angeles, CA',
    mainEvent: 'Davis vs. Rodriguez',
    image: '/next.svg', // placeholder, replace with real image
  },
  { 
    id: 3, 
    title: 'UFC Fight Night', 
    date: 'May 5, 2025', 
    location: 'Miami, FL',
    mainEvent: 'Lee vs. Garcia',
    image: '/next.svg', // placeholder, replace with real image
  }
];

const newsItems = [
  {
    id: 1,
    title: 'Champion Announces Retirement After Historic Run',
    excerpt: 'After 10 consecutive title defenses, the legendary champion steps away from the octagon...',
    date: 'April 3, 2025',
    category: 'Breaking',
    image: '/next.svg', // placeholder, replace with real image
  },
  {
    id: 2,
    title: 'New Tournament Format Announced for Next Season',
    excerpt: 'The promotion unveiled plans for a revolutionary tournament structure beginning next year...',
    date: 'April 2, 2025',
    category: 'News',
    image: '/next.svg', // placeholder, replace with real image
  },
  {
    id: 3,
    title: 'Rising Star Signs Multi-Fight Contract After Knockout Win',
    excerpt: 'Following an impressive victory last weekend, the undefeated prospect has signed a new deal...',
    date: 'March 30, 2025',
    category: 'Contracts',
    image: '/next.svg', // placeholder, replace with real image
  }
];

const featuredFighters = [
  {
    id: 1,
    name: 'Alex "The Destroyer" Johnson',
    record: '24-2-0',
    division: 'Lightweight',
    image: '/next.svg', // placeholder, replace with real image
  },
  {
    id: 2,
    name: 'Sarah "Knockout Queen" Williams',
    record: '18-0-0',
    division: 'Women\'s Bantamweight',
    image: '/next.svg', // placeholder, replace with real image
  },
  {
    id: 3,
    name: 'Mike "Iron Fist" Rodriguez',
    record: '22-3-1',
    division: 'Middleweight',
    image: '/next.svg', // placeholder, replace with real image
  }
];

export default function Home() {
  const [activeTab, setActiveTab] = useState('events');
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Simulated countdown to next event
  useEffect(() => {
    const eventDate = new Date('April 15, 2025 10:00:00').getTime();
    
    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = eventDate - now;
      
      setCountdown({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    };
    
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Schema.org structured data for organization/website
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': 'mma.box',
    'url': 'https://www.mma.box',
    'logo': 'https://www.mma.box/android-chrome-512x512.png',
    'description': 'The ultimate MMA hub for fans and fighters, featuring live events, fighter stats, news, and community.',
    'sameAs': [
      'https://twitter.com/mmabox',
      'https://instagram.com/mmabox',
      'https://youtube.com/mmabox',
      'https://facebook.com/mmabox',
      'https://linkedin.com/company/mmabox'
    ],
    'foundingDate': '2023-01-01',
    'founder': {
      '@type': 'Person',
      'name': 'MMA Box Team'
    },
    'address': {
      '@type': 'PostalAddress',
      'addressCountry': 'US'
    },
    'keywords': 'MMA, UFC, Bellator, ONE Championship, mixed martial arts, fighting, combat sports'
  };
  
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    'url': 'https://www.mma.box',
    'name': 'mma.box - Your Ultimate MMA Destination',
    'description': 'Follow live MMA events, fighter stats, breaking news, and exclusive content in one place.',
    'potentialAction': {
      '@type': 'SearchAction',
      'target': 'https://www.mma.box/search?q={search_term_string}',
      'query-input': 'required name=search_term_string'
    },
    'inLanguage': 'en-US',
    'copyrightYear': new Date().getFullYear(),
    'publisher': {
      '@type': 'Organization',
      'name': 'mma.box',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://www.mma.box/android-chrome-512x512.png',
        'width': 512,
        'height': 512
      }
    }
  };

  // Sport Organization schema
  const sportOrgSchema = {
    '@context': 'https://schema.org',
    '@type': 'SportsOrganization',
    'name': 'mma.box',
    'url': 'https://www.mma.box',
    'logo': 'https://www.mma.box/android-chrome-512x512.png',
    'sport': 'Mixed Martial Arts',
    'description': 'Providing comprehensive coverage of mixed martial arts events, fighters, and news across all major promotions',
    'memberOf': [
      {
        '@type': 'Organization',
        'name': 'Combat Sports Media Association'
      }
    ]
  };

  // Upcoming event schema
  const upcomingEventSchema = {
    '@context': 'https://schema.org',
    '@type': 'SportsEvent',
    'name': upcomingEvents[0].title,
    'description': `Watch ${upcomingEvents[0].mainEvent} and other exciting fights at ${upcomingEvents[0].title}`,
    'startDate': new Date(upcomingEvents[0].date).toISOString(),
    'location': {
      '@type': 'Place',
      'name': upcomingEvents[0].location,
      'address': {
        '@type': 'PostalAddress',
        'addressLocality': upcomingEvents[0].location
      }
    },
    'competitor': [
      {
        '@type': 'Person',
        'name': upcomingEvents[0].mainEvent.split(' vs. ')[0]
      },
      {
        '@type': 'Person',
        'name': upcomingEvents[0].mainEvent.split(' vs. ')[1]
      }
    ],
    'url': `https://www.mma.box/events/${upcomingEvents[0].id}`
  };

  return (
    <div className="space-y-16 pb-16 bg-black">
      {/* Add structured data scripts */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(sportOrgSchema)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(upcomingEventSchema)
        }}
      />
      
      {/* Hero Section with Video Background */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden border-b border-gray-800/30">
        {/* Ring Background Image */}
        <div className="absolute inset-0 bg-black">
          <div 
            className="absolute inset-0 bg-cover bg-center z-0" 
            style={{ backgroundImage: 'url("/ring.png")' }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent z-10"></div>
        </div>
        
        {/* Content Overlay */}
        <div className="container mx-auto px-6 z-20 relative">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-extrabold mb-4 text-white">
              <span className="inline-block mb-2">Your Ultimate</span><br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-700">
                MMA Destination
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl">
              Follow live events, fighter stats, breaking news, and exclusive content in one place.
            </p>
            
            {/* Call to action buttons */}
            <div className="flex flex-wrap gap-4">
              <Link href="/events" className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-red-600/30">
                View Next Event
              </Link>
              <Link href="/fighters" className="px-8 py-4 bg-gray-800 hover:bg-gray-700 text-white font-bold rounded-lg transition-all border border-gray-700 hover:border-gray-600">
                Explore Fighters
              </Link>
            </div>
          </div>
        </div>
        
        {/* Floating Event Countdown */}
        <div className="absolute bottom-10 right-10 bg-black/80 backdrop-blur-md p-4 rounded-lg border border-gray-800 hidden md:block">
          <p className="text-gray-400 mb-2 text-sm font-medium">Next Event: UFC 298</p>
          <div className="flex space-x-4">
            {[
              { label: 'Days', value: countdown.days },
              { label: 'Hours', value: countdown.hours },
              { label: 'Mins', value: countdown.minutes },
              { label: 'Secs', value: countdown.seconds }
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center">
                <span className="text-xl font-bold text-white">{item.value}</span>
                <span className="text-xs text-gray-400">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Content Tabs Section */}
      <section className="container mx-auto px-6 py-8 relative">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-900/20 to-transparent"></div>
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-lg border border-gray-800 p-1 bg-black/80 backdrop-blur-sm shadow-lg shadow-black/20">
            {['events', 'news', 'fighters'].map((tab) => (
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
        <div className="mt-8">
          {/* Events Tab */}
          <div className={`transition-opacity duration-300 ${activeTab === 'events' ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden absolute'}`}>
            <h2 className="text-3xl font-bold mb-6 text-gray-100">Upcoming Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="bg-black/80 rounded-xl overflow-hidden shadow-lg hover:shadow-red-600/20 transition-all hover:-translate-y-1 border border-gray-800/50">
                  {/* Image placeholder - replace with actual event poster */}
                  <div className="h-48 bg-gray-800 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-gray-500">[Event Poster]</span>
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
                      href={`/events/${event.id}`} 
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
          
          {/* News Tab */}
          <div className={`transition-opacity duration-300 ${activeTab === 'news' ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden absolute'}`}>
            <h2 className="text-3xl font-bold mb-6 text-gray-100">Latest News & Updates</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {newsItems.map((item) => (
                <div key={item.id} className="bg-black/80 rounded-xl overflow-hidden shadow-lg hover:shadow-red-600/10 transition-all border border-gray-800/50">
                  {/* News Image */}
                  <div className="h-48 bg-gray-800 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-gray-500">[News Image]</span>
                    </div>
                    <div className="absolute top-4 left-4">
                      <span className="bg-red-600 text-white text-xs px-2 py-1 rounded">{item.category}</span>
                    </div>
                  </div>
                  
                  <div className="p-5">
                    <div className="text-gray-400 text-sm mb-2">{item.date}</div>
                    <h3 className="text-lg font-bold mb-2 text-white hover:text-red-500 transition-colors">
                      <Link href={`/news/${item.id}`}>{item.title}</Link>
                    </h3>
                    <p className="text-gray-400 text-sm line-clamp-2">{item.excerpt}</p>
                    <Link 
                      href={`/news/${item.id}`} 
                      className="inline-block mt-4 text-red-500 hover:text-red-400 text-sm font-medium"
                    >
                      Read More →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
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
          
          {/* Fighters Tab */}
          <div className={`transition-opacity duration-300 ${activeTab === 'fighters' ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden absolute'}`}>
            <h2 className="text-3xl font-bold mb-6 text-gray-100">Featured Fighters</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredFighters.map((fighter) => (
                <div 
                  key={fighter.id} 
                  className="bg-black/80 rounded-xl overflow-hidden shadow-lg hover:shadow-red-600/10 transition-all border border-gray-800/50 p-6 text-center"
                >
                  {/* Fighter Image - Circle */}
                  <div className="w-32 h-32 mx-auto bg-gray-800 rounded-full mb-4 relative border-2 border-red-900/20">
                    <div className="absolute inset-0 flex items-center justify-center rounded-full">
                      <span className="text-gray-500">[Fighter]</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-1 text-white">{fighter.name}</h3>
                  <p className="text-red-500 font-medium mb-2">{fighter.division}</p>
                  <div className="inline-block px-3 py-1 bg-black border border-gray-800/50 rounded-full text-sm text-gray-300 mb-4">
                    {fighter.record}
                  </div>
                  
                  <Link 
                    href={`/fighters/${fighter.id}`} 
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
      </section>
      
      {/* Call to Action Section */}
      <section className="container mx-auto px-6 py-8 relative">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-900/20 to-transparent"></div>
        <div className="bg-black rounded-2xl overflow-hidden relative border border-white/30 shadow-xl shadow-black/20">
          <div className="relative z-10 py-16 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between">
            <div className="mb-8 md:mb-0 md:mr-8">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Join the conversation</h2>
              <p className="text-gray-300 max-w-lg">
                Become part of our MMA community, discuss events, share your thoughts on fights, and connect with other fans.
              </p>
            </div>
            
            <div>
              <Link 
                href="/community" 
                className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-all transform hover:scale-105 shadow-lg shadow-red-600/20"
              >
                Join Community
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
