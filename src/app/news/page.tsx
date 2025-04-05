import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import BreadcrumbNav from '@/components/BreadcrumbNav';

export const metadata: Metadata = {
  title: "MMA News | Latest UFC, Bellator & Fighting Updates",
  description: "Get the latest MMA news, fight announcements, results, and analysis from UFC, Bellator, and other major MMA promotions worldwide.",
  keywords: ["MMA news", "UFC news", "Bellator news", "fight results", "MMA analysis", "fighter interviews"],
  openGraph: {
    title: "MMA News | Latest Fighting Updates",
    description: "Stay up to date with the latest news and updates from the world of MMA.",
    url: "https://www.mma.box/news",
    type: "website"
  },
  alternates: {
    canonical: "https://www.mma.box/news"
  }
};

// Mock news data
const newsItems = [
  {
    id: 1,
    title: 'Champion Announces Retirement After Historic Run',
    excerpt: 'After 10 consecutive title defenses, the legendary champion steps away from the octagon...',
    date: 'April 3, 2025',
    formattedDate: '2025-04-03',
    category: 'Breaking',
  },
  {
    id: 2,
    title: 'New Tournament Format Announced for Next Season',
    excerpt: 'The promotion unveiled plans for a revolutionary tournament structure beginning next year...',
    date: 'April 2, 2025',
    formattedDate: '2025-04-02',
    category: 'News',
  },
  {
    id: 3,
    title: 'Rising Star Signs Multi-Fight Contract After Knockout Win',
    excerpt: 'Following an impressive victory last weekend, the undefeated prospect has signed a new deal...',
    date: 'March 30, 2025',
    formattedDate: '2025-03-30',
    category: 'Contracts',
  },
  {
    id: 4,
    title: 'Major Rule Changes Coming to MMA in 2026',
    excerpt: 'The unified rules commission has approved several significant changes to take effect next year...',
    date: 'March 28, 2025',
    formattedDate: '2025-03-28',
    category: 'Rules',
  },
  {
    id: 5,
    title: 'International MMA League Expands to Three New Countries',
    excerpt: 'The rapidly growing promotion announces events in Brazil, Japan, and Australia as part of global expansion...',
    date: 'March 25, 2025',
    formattedDate: '2025-03-25',
    category: 'Business',
  },
  {
    id: 6,
    title: 'Top Heavyweight Contenders Set to Clash in Title Eliminator',
    excerpt: 'The winner of the highly anticipated bout will face the champion later this year...',
    date: 'March 22, 2025',
    formattedDate: '2025-03-22',
    category: 'Fight Announcement',
  }
];

export default function NewsPage() {
  // Breadcrumb items
  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'News', path: '/news', isCurrentPage: true }
  ];

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="container mx-auto px-6 py-10">
        {/* Breadcrumb navigation */}
        <BreadcrumbNav items={breadcrumbItems} />
        
        <header className="mb-10">
          <h1 className="text-4xl font-bold mb-4">MMA News & Updates</h1>
          <p className="text-xl text-gray-300">
            Stay up to date with the latest news, fight announcements, results, and analysis from the world of MMA.
          </p>
        </header>
        
        <section aria-labelledby="latest-news-heading">
          <h2 id="latest-news-heading" className="text-2xl font-bold mb-6 border-b border-gray-800 pb-2">Latest News</h2>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {newsItems.map((item) => (
              <article key={item.id} className="bg-black/80 rounded-xl overflow-hidden shadow-lg hover:shadow-red-600/10 transition-all border border-gray-800/50">
                <div className="h-48 bg-gray-800 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-gray-500">[News Image]</span>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-red-600 text-white text-xs px-2 py-1 rounded">{item.category}</span>
                  </div>
                </div>
                  
                <div className="p-5">
                  <time dateTime={item.formattedDate} className="text-gray-400 text-sm mb-2 block">{item.date}</time>
                  <h3 className="text-lg font-bold mb-2 text-white hover:text-red-500 transition-colors">
                    <Link href={`/news/${item.id}`}>{item.title}</Link>
                  </h3>
                  <p className="text-gray-400 text-sm line-clamp-2 mb-4">{item.excerpt}</p>
                  <Link 
                    href={`/news/${item.id}`} 
                    className="inline-block text-red-500 hover:text-red-400 text-sm font-medium"
                  >
                    Read More →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
} 