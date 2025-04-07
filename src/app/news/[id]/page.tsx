import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { neon } from '@neondatabase/serverless';
import { format } from 'date-fns';
import Image from 'next/image';
import type { NewsArticle } from '@/types';

// Remove Mock data for news articles
// const newsData = { ... };

// Fetch data function (can be reused by generateMetadata and page)
async function getArticleData(idOrSlug: string): Promise<NewsArticle | null> {
  // If it's a placeholder, return null (or a placeholder object if needed by metadata)
  if (idOrSlug.startsWith('placeholder-')) {
    return null; // Indicate placeholder, page component will handle rendering
  }

  try {
    const sql = neon(process.env.DATABASE_URL!);
    let article: NewsArticle | null = null;

    // Check if idOrSlug is numeric (ID) or string (slug)
    const potentialId = Number(idOrSlug);
    if (!isNaN(potentialId)) {
      // Fetch by ID
      const result = await sql` 
        SELECT id, title, slug, summary, content, image_url, published_at, status, author
        FROM news_articles
        WHERE id = ${potentialId} AND status = 'published'
      `;
      article = (result[0] as NewsArticle) ?? null;
    } else {
      // Fetch by Slug
      const result = await sql` 
        SELECT id, title, slug, summary, content, image_url, published_at, status, author
        FROM news_articles
        WHERE slug = ${idOrSlug} AND status = 'published'
      `;
      article = (result[0] as NewsArticle) ?? null;
    }
    return article;
  } catch (error) {
    console.error("Error fetching article:", error);
    return null; // Return null on error
  }
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const article = await getArticleData(params.id);
  
  if (!article) {
    // Handle placeholder or truly not found
    const isPlaceholder = params.id.startsWith('placeholder-');
    return {
      title: isPlaceholder ? 'News Article Placeholder' : 'Article Not Found',
      description: isPlaceholder ? 'Loading news article content...' : 'The article you are looking for could not be found.',
    };
  }
  
  // Format date safely
  let publishedTimeString: string | undefined;
  if (article.published_at) {
      try {
          publishedTimeString = new Date(article.published_at).toISOString();
      } catch { /* ignore date format error - remove unused 'e' */ }
  }
  
  return {
    title: article.title,
    description: article.summary || 'Read the latest MMA news article.', // Fallback description
    keywords: ['MMA news', article.title], // Add more specific keywords if available
    openGraph: {
      title: article.title,
      description: article.summary || '',
      url: `https://www.mma.box/news/${article.slug || article.id}`,
      type: 'article',
      images: article.image_url ? [
        {
          url: article.image_url, // Use actual image URL
          width: 1200, // Adjust if known
          height: 630,  // Adjust if known
          alt: article.title,
        },
      ] : undefined,
      publishedTime: publishedTimeString, 
      // authors: [article.authorUrl], // Add if author data exists
      // tags: article.tags, // Add if tag data exists
    },
    alternates: {
        canonical: `https://www.mma.box/news/${article.slug || article.id}`,
    }
  };
}

// Placeholder component for the full article page
const ArticlePlaceholder = () => (
  <div className="bg-black text-white min-h-screen animate-pulse">
    <div className="container mx-auto px-6 py-16">
      <div className="mb-4">
        <div className="h-6 bg-red-900/50 rounded w-1/4 mb-4"></div>
        <div className="h-10 bg-gray-700 rounded w-3/4 mb-2"></div>
        <div className="h-5 bg-gray-600 rounded w-1/2"></div>
      </div>
      <div className="h-60 bg-gray-800 rounded-lg mb-6"></div>
      <div className="max-w-3xl mx-auto">
        <div className="space-y-4 mb-8">
          <div className="h-5 bg-gray-700 rounded w-full"></div>
          <div className="h-5 bg-gray-700 rounded w-full"></div>
          <div className="h-5 bg-gray-700 rounded w-5/6"></div>
          <div className="h-5 bg-gray-700 rounded w-full"></div>
          <div className="h-5 bg-gray-700 rounded w-3/4"></div>
          <div className="h-5 bg-gray-700 rounded w-full"></div>
          <div className="h-5 bg-gray-700 rounded w-full"></div>
        </div>
        <div className="flex flex-wrap gap-2 mb-8">
          <div className="h-6 bg-gray-800 rounded-full w-20"></div>
          <div className="h-6 bg-gray-800 rounded-full w-24"></div>
          <div className="h-6 bg-gray-800 rounded-full w-16"></div>
        </div>
        <div className="flex gap-4">
          <div className="h-12 bg-gray-800 rounded-lg w-32"></div>
          <div className="h-12 bg-red-900/50 rounded-lg w-24"></div>
        </div>
      </div>
    </div>
  </div>
);

export default async function NewsArticlePage({ params }: { params: { id: string } }) {
  // Check if it's a placeholder request
  if (params.id.startsWith('placeholder-')) {
    return <ArticlePlaceholder />;
  }

  // Fetch real article data
  const article = await getArticleData(params.id);
  
  // If no article found for a non-placeholder ID, trigger 404
  if (!article) {
    notFound();
  }
  
  // Format date safely
  let displayDate = 'Date unavailable';
  let publishedISODate: string | undefined;
  if (article.published_at) {
      try {
          const dateObj = new Date(article.published_at);
          displayDate = format(dateObj, 'MMMM d, yyyy');
          publishedISODate = dateObj.toISOString();
      } catch { /* ignore date format error - remove unused 'e' */ }
  }

  // Schema.org structured data for news article (using fetched data)
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    'headline': article.title,
    'description': article.summary,
    'image': article.image_url,
    'datePublished': publishedISODate,
    'dateModified': publishedISODate, // Assuming modified = published for now
    // 'author': { ... }, // Add if author data available
    // 'publisher': { ... }, // Add publisher info
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': `https://www.mma.box/news/${article.slug || article.id}`
    },
    // 'keywords': article.tags.join(', ') // Add if tags available
  };
  
  return (
    <div className="bg-black text-white min-h-screen">
      {/* Add structured data script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <div className="container mx-auto px-6 py-16">
        <div className="mb-4">
          {/* <span className="inline-block bg-red-600 text-white text-sm px-3 py-1 rounded-full mb-4"> */}
          {/*   {article.category} // Add if category exists */}
          {/* </span> */}
          <h1 className="text-4xl font-bold mb-2">{article.title}</h1>
          <div className="flex items-center gap-3 text-gray-400 mb-4">
            {/* Conditionally render Author */} 
            {article.author && (
                <>
            <span>By {article.author}</span>
            <span>•</span>
                </>
            )}
            <time dateTime={publishedISODate}>{displayDate}</time>
          </div>
        </div>
        
        <div className="max-w-3xl mx-auto">
          {/* Render content safely (assuming simple text for now) */}
          <div className="prose prose-invert mb-8 text-gray-300">
             {article.image_url && (
                 <span className="not-prose">
                     <Image 
                        src={article.image_url} 
                        alt={article.title} 
                        width={300}
                        height={300}
                        className="object-cover rounded-lg mr-6 mb-4"
                     />
                 </span>
             )}

             {article.content ? article.content.split('\n\n').map((paragraph: string, i: number) => (
              <p key={i} className="mb-4">{paragraph}</p>
            )) : <p>Article content not available.</p>}
          </div>
          
          {/* Tags - Add if tags data exists */}
          {/* <div className="flex flex-wrap gap-2 mb-8"> ... </div> */}
          
          <div className="flex gap-4">
            <Link 
              href="/news"
              className="inline-block px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
            >
              Back to News
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
    </div>
  );
} 