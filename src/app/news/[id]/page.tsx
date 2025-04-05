import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

// Mock data for news articles
const newsData = {
  1: {
    id: 1,
    title: 'Champion Announces Retirement After Historic Run',
    excerpt: 'After 10 consecutive title defenses, the legendary champion steps away from the octagon...',
    date: 'April 3, 2025',
    publishISODate: '2025-04-03T14:30:00Z',
    category: 'Breaking',
    author: 'John Smith',
    authorUrl: 'https://www.mma.box/authors/john-smith',
    content: 'In a shocking announcement that has sent ripples through the MMA world, the long-reigning champion has decided to hang up the gloves after an unprecedented run of dominance. The decision comes after their historic tenth consecutive title defense last month, cementing their legacy as one of the all-time greats in the sport.\n\nIn an emotional press conference, the champion cited the desire to leave on their own terms and focus on family and other business ventures outside of fighting. The promotion has not yet announced plans for the now-vacant title, though a tournament featuring the top contenders is reportedly being considered.',
    imageUrl: '/next.svg', // placeholder
    tags: ['retirement', 'championship', 'title defense', 'legacy']
  },
  2: {
    id: 2,
    title: 'New Tournament Format Announced for Next Season',
    excerpt: 'The promotion unveiled plans for a revolutionary tournament structure beginning next year...',
    date: 'April 2, 2025',
    publishISODate: '2025-04-02T10:15:00Z',
    category: 'News',
    author: 'Sarah Johnson',
    authorUrl: 'https://www.mma.box/authors/sarah-johnson',
    content: 'In an exciting development for MMA fans, a major promotion has announced a complete overhaul of its competition format starting next season. The new structure will feature a year-long tournament across all weight classes, with fighters earning points based on their performances.\n\nThe top eight fighters in each division at the end of the regular season will advance to the championship playoffs, where they will compete in a single-elimination tournament to crown the champion. This innovative approach aims to ensure that the most deserving fighters get title opportunities while creating more meaningful and consequential matchups throughout the year.',
    imageUrl: '/next.svg', // placeholder
    tags: ['tournament', 'season format', 'championship', 'competition']
  },
  3: {
    id: 3,
    title: 'Rising Star Signs Multi-Fight Contract After Knockout Win',
    excerpt: 'Following an impressive victory last weekend, the undefeated prospect has signed a new deal...',
    date: 'March 30, 2025',
    publishISODate: '2025-03-30T18:45:00Z',
    category: 'Contracts',
    author: 'Mike Williams',
    authorUrl: 'https://www.mma.box/authors/mike-williams',
    content: 'Fresh off a spectacular knockout victory that had fans on their feet, the rising star has secured their future with a lucrative multi-fight contract extension. The undefeated prospect has been turning heads in the MMA world with their devastating finishing ability and charismatic personality.\n\nThe new deal, reportedly worth several million dollars, will keep them with the promotion for at least five more fights. Promotion officials have indicated that with another win, they could find themselves in title contention before the end of the year. Their next bout is expected to be announced in the coming weeks, with rumors suggesting it could be against a top-five opponent.',
    imageUrl: '/next.svg', // placeholder
    tags: ['contract', 'knockout', 'prospect', 'undefeated']
  }
};

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const articleId = Number(params.id);
  const article = newsData[articleId as keyof typeof newsData];
  
  if (!article) {
    return {
      title: 'Article Not Found',
    };
  }
  
  return {
    title: article.title,
    description: article.excerpt,
    keywords: ['MMA news', ...article.tags],
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: `https://www.mma.box/news/${articleId}`,
      type: 'article',
      images: [
        {
          url: article.imageUrl,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
      publishedTime: article.publishISODate,
      authors: [article.authorUrl],
      tags: article.tags,
    },
  };
}

export default function NewsArticlePage({ params }: { params: { id: string } }) {
  const articleId = Number(params.id);
  
  // Check if article exists in our data
  if (!newsData[articleId as keyof typeof newsData]) {
    notFound();
  }
  
  const article = newsData[articleId as keyof typeof newsData];
  
  // Schema.org structured data for news article
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    'headline': article.title,
    'description': article.excerpt,
    'image': article.imageUrl,
    'datePublished': article.publishISODate,
    'dateModified': article.publishISODate,
    'author': {
      '@type': 'Person',
      'name': article.author,
      'url': article.authorUrl
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'mma.box',
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://www.mma.box/android-chrome-512x512.png',
        'width': 512,
        'height': 512
      }
    },
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': `https://www.mma.box/news/${articleId}`
    },
    'keywords': article.tags.join(', ')
  };
  
  return (
    <div className="bg-black text-white min-h-screen">
      {/* Add structured data script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />
      
      <div className="container mx-auto px-6 py-16">
        <div className="mb-4">
          <span className="inline-block bg-red-600 text-white text-sm px-3 py-1 rounded-full mb-4">
            {article.category}
          </span>
          <h1 className="text-4xl font-bold mb-2">{article.title}</h1>
          <div className="flex items-center gap-3 text-gray-400">
            <span>By {article.author}</span>
            <span>•</span>
            <time dateTime={article.publishISODate}>{article.date}</time>
          </div>
        </div>
        
        <div className="h-60 bg-gray-800 rounded-lg mb-6 flex items-center justify-center">
          <span className="text-gray-500">[Featured Image]</span>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-invert mb-8 text-gray-300">
            {article.content.split('\n\n').map((paragraph, i) => (
              <p key={i} className="mb-4">{paragraph}</p>
            ))}
          </div>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {article.tags.map(tag => (
              <span key={tag} className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm">
                #{tag}
              </span>
            ))}
          </div>
          
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