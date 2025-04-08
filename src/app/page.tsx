// Removed 'use client';

// import { neon } from '@neondatabase/serverless'; // Removed unused
// import { revalidatePath } from 'next/cache'; // Removed unused
// Only import types needed
import type { NewsArticle, FeaturedFighter } from '@/types'; // Keep FeaturedFighter for mock function return type
import HomepageContentTabs, { EventCountdown } from '@/components/HomepageContentTabs';
import { fetchUpcomingPublishedEvents } from '@/lib/eventServices'; // Import from new lib services
// import HeroSection from '@/components/HeroSection'; // Removed problematic import
// import { fetchLatestNews } from './admin/newsActions'; 
// import { fetchFeaturedFighters } from './admin/fighterActions';
import Link from 'next/link';
import { fetchLatestNews } from '@/lib/newsServices'; // Import from new lib services

// Example function to get mock fighters (using imported FeaturedFighter type)
async function getMockFighters(): Promise<FeaturedFighter[]> {
    // In a real app, fetch from your API/DB
    return [
        { id: 1, name: 'Jon Jones', record: '27-1-0 (1 NC)', division: 'Heavyweight', image: '' }, 
        { id: 2, name: 'Alexander Volkanovski', record: '26-3-0', division: 'Featherweight', image: '' },
        { id: 3, name: 'Islam Makhachev', record: '25-1-0', division: 'Lightweight', image: '' },
        { id: 4, name: 'Sean O\'Malley', record: '17-1-0 (1 NC)', division: 'Bantamweight', image: '' },
        { id: 5, name: 'Alex Pereira', record: '9-2-0', division: 'Middleweight', image: '' }
    ];
}

// Function to fetch published news articles
async function fetchPublishedNews(): Promise<NewsArticle[]> {
    // Attempt to get real news from the database
    const news = await fetchLatestNews(5);
    
    // If no news is available (e.g., table doesn't exist yet), return empty array
    // The UI component already handles displaying a message when no news is available
    return news;
}

// Original Mock Data (keeping for structure reference)
// Define the expected shape of a news article (can move to a types file)
// interface UpcomingEvent { ... } // Removed
// const upcomingEvents: UpcomingEvent[] = [ ... ]; // Removed

// Mock fighters (can be replaced with real data fetch)
// const featuredFighters: FeaturedFighter[] = [ ... ]; // Removed

export default async function Home() {
     // Fetch data for the tabs
     const upcomingEventsData = await fetchUpcomingPublishedEvents(5); 
     const latestNews = await fetchPublishedNews(); // Use new function instead of mock
     const featuredFightersData = await getMockFighters(); // Correctly uses getMockFighters
     
     // --- Keep original Schema.org data --- 
     const organizationSchema = { /* ... original schema ... */ };
     const websiteSchema = { /* ... original schema ... */ };
     const sportOrgSchema = { /* ... original schema ... */ };
     // Adjust upcomingEventSchema if needed, or remove if focusing only on tabs
     // const upcomingEventSchema = { /* ... original schema based on mock data ... */ }; 

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
            
            {/* Hero Section - Exact layout from attachment */}
            <section className="relative py-20 md:py-32 overflow-hidden">
                {/* Background image with proper overlay */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-black/70 z-10"></div>
                    <div className="absolute inset-0 bg-[url('/ring.png')] bg-cover bg-center opacity-90 z-0"></div>
                </div>

                <div className="container mx-auto px-6 relative z-20">
                    <div className="max-w-3xl">
                        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold leading-none tracking-tight">
                            <div className="text-white mb-1">The Ultimate</div>
                            <div className="text-transparent bg-gradient-to-r from-white to-red-500 bg-clip-text mb-1">MMA Destination</div>
                            <div className="text-transparent bg-gradient-to-r from-red-500 to-red-700 bg-clip-text mb-1">UFC • PFL • And More</div>
                        </h1>
                        
                        <p className="text-lg sm:text-xl text-gray-300 mt-6 mb-8">
                            Your exclusive access to live events, fighter analytics, and expert commentary — all in one powerful platform.
                        </p>
                        
                        <div className="flex flex-wrap gap-4 mt-4">
                            <Link href="/events" className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-all transform hover:scale-105 shadow-lg">
                                View Next Event
                            </Link>
                            <Link href="/fighters" className="px-8 py-4 bg-gray-800 hover:bg-gray-700 text-white font-bold rounded-lg border border-gray-700 transition-colors">
                                Explore Fighters
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Countdown Timer for Next Big Event - Now using client-side component */}
            {upcomingEventsData.length > 0 && (
                <section className="container mx-auto px-6 -mt-8">
                    <div className="bg-gray-900 rounded-xl border border-gray-800 p-6 shadow-2xl">
                        <div className="flex flex-col md:flex-row items-center justify-between">
                            <div className="mb-4 md:mb-0">
                                <p className="text-xs text-red-500 uppercase font-semibold tracking-wider">Next Event</p>
                                <h3 className="text-xl md:text-2xl font-bold text-white">
                                    {upcomingEventsData[0].event_name || upcomingEventsData[0].main_card}
                                </h3>
                                <p className="text-sm text-gray-400">{upcomingEventsData[0].location}</p>
                            </div>

                            {/* Use the client-side countdown component */}
                            <EventCountdown event={upcomingEventsData[0]} />
                        </div>
                    </div>
                </section>
            )}
            
            <HomepageContentTabs 
                latestNews={latestNews}
                upcomingEvents={upcomingEventsData}
                featuredFighters={featuredFightersData}
            />
            
            {/* Join the conversation CTA Section */}
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
