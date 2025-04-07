// Removed 'use client';

import Link from 'next/link';
import { neon } from '@neondatabase/serverless';
// Removed import { format } from 'date-fns';
// Removed import Image from 'next/image';
import { NewsArticle } from '@/types'; // Import the shared type
import HomepageContentTabs from '@/components/HomepageContentTabs'; // Keep path alias if tsconfig supports it, or change to relative

// Mock data - Keeping events for now
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

// Removed mock newsItems

// Commenting out unused fighter data for now - NOW UNCOMMENTING
// /*
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
    division: "Women's Bantamweight",
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
// */

// Define the expected shape of a news article (can move to a types file)
// Duplicating interface for now, better to move to src/types.ts later
interface UpcomingEvent { 
    id: number; 
    title: string; 
    date: string; 
    location: string;
    mainEvent: string;
    image: string; 
}

// Define featuredFighters type (move to types later if preferred)
interface FeaturedFighter { 
    id: number;
    name: string;
    record: string;
    division: string;
    image: string;
}

export default async function Home() { // Make component async
  // Removed useState for activeTab
  // Removed useState and useEffect for countdown

  // Fetch latest 3 news items
  let newsItems: NewsArticle[] = [];
  let dbError = null;
  try {
    const sql = neon(process.env.DATABASE_URL!);
    const dbResult = await sql`
      SELECT id, title, slug, summary, content, image_url, published_at
      FROM news_articles
      WHERE status = 'published'
      ORDER BY published_at DESC NULLS LAST, created_at DESC
      LIMIT 3
    `;
    newsItems = dbResult as NewsArticle[];
  } catch (error) {
    console.error("Homepage News Fetch Error:", error);
    dbError = "Failed to load latest news."; // Store error message
  }

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
                MMA Hub for UFC and Bellator Coverage
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
        
        {/* Floating Event Countdown - Commented out as it needs client-side state */}
        {/* 
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
        */}
      </section>
      
      {/* Replace Content Tabs Section with the Client Component */}
      <HomepageContentTabs 
        initialNewsItems={newsItems} 
        upcomingEvents={upcomingEvents as UpcomingEvent[]} // Cast mock data type
        featuredFighters={featuredFighters as FeaturedFighter[]} // Add and cast mock fighter data
        newsError={dbError} 
      />
      
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
