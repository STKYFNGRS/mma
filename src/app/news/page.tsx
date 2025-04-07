import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import { neon } from '@neondatabase/serverless';
import { format } from 'date-fns'; // Ensure date-fns is installed: npm install date-fns
import Image from 'next/image'; // Import next/image

// Import the type from the central file
import type { NewsArticle } from '@/types';

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

// Placeholder component for News card skeleton
const NewsCardPlaceholder = ({ id }: { id: number }) => (
  <Link href={`/news/placeholder-${id}`} className="block group">
    <div className="bg-black/80 rounded-xl overflow-hidden shadow-lg border border-gray-800/50 animate-pulse group-hover:border-red-700/50 transition-colors duration-200">
      <div className="h-48 bg-gray-700"></div>
      <div className="p-5">
        <div className="h-4 bg-gray-700 rounded w-1/3 mb-2"></div>
        <div className="h-6 bg-gray-600 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-700 rounded w-full mb-1"></div>
        <div className="h-4 bg-gray-700 rounded w-5/6 mb-4"></div>
        <div className="h-5 bg-red-900 rounded w-1/4"></div>
      </div>
    </div>
  </Link>
);

export default async function NewsPage() { // Make the component async
  // Fetch news items from the database
  let newsItems: NewsArticle[] = [];
  let dbError = null;
  try {
    const sql = neon(process.env.DATABASE_URL!); // Use non-null assertion or add error handling for missing URL
    // Fetch only published articles, order by most recent published date
    const dbResult = await sql`
      SELECT id, title, slug, summary, image_url, published_at
      FROM news_articles
      WHERE status = 'published'
      ORDER BY published_at DESC NULLS LAST, created_at DESC
    `;
    // Explicitly cast the result assuming the query returns the correct shape
    newsItems = dbResult as NewsArticle[];

  } catch (error) {
    console.error("Database fetch error:", error);
    dbError = "Failed to load news articles.";
    // Handle error appropriately - maybe show an error message to the user
  }

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
          
          {dbError && <p className="text-red-500">{dbError}</p>}

          {/* Show placeholders if no error and no items */} 
          {!dbError && newsItems.length === 0 && (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map(i => <NewsCardPlaceholder key={`placeholder-${i}`} id={i} />)}
            </div>
          )}

          {/* Show actual news items if available */} 
          {!dbError && newsItems.length > 0 && (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {newsItems.map((item, index) => {
                // Ensure published_at is a Date object before formatting
                let displayDate = 'Date unavailable';
                const itemDate = item.published_at; // Use const
                if (itemDate) {
                  try {
                     displayDate = format(new Date(itemDate), 'MMMM d, yyyy');
                  } catch (e) {
                    console.error("Error formatting date:", itemDate, e);
                    // Keep default 'Date unavailable'
                  }
                }
                const articleUrl = `/news/${item.slug ?? item.id}`;
                const dateTime = item.published_at ? format(new Date(item.published_at), 'yyyy-MM-dd') : undefined;

                return (
                  <article key={item.id} className="bg-black/80 rounded-xl overflow-hidden shadow-lg hover:shadow-red-600/10 transition-all border border-gray-800/50">
                    <div className="h-48 bg-gray-800 relative flex items-center justify-center overflow-hidden">
                      {item.image_url ? (
                        <Image 
                          src={item.image_url} 
                          alt={item.title} 
                          width={400}
                          height={250}
                          className="object-cover"
                          priority={index < 3}
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-gray-500">[News Image Placeholder]</span>
                        </div>
                      )}
                      {/* Removed category tag for now, as it's not in the DB */}
                    </div>

                    <div className="p-5">
                      <time dateTime={dateTime} className="text-gray-400 text-sm mb-2 block">{displayDate}</time>
                      <h3 className="text-lg font-bold mb-2 text-white hover:text-red-500 transition-colors">
                        <Link href={articleUrl}>{item.title}</Link>
                      </h3>
                      {item.summary && (
                        <p className="text-gray-400 text-sm line-clamp-2 mb-4">{item.summary}</p>
                      )}
                      <Link
                        href={articleUrl}
                        className="inline-block text-red-500 hover:text-red-400 text-sm font-medium"
                      >
                        Read More →
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
} 