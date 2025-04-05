import { MetadataRoute } from 'next'

// Define valid changeFrequency type
type ChangeFrequency = 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';

export default function sitemap(): MetadataRoute.Sitemap {
  // Get current date for lastModified
  const currentDate = new Date();
  
  // Main pages
  const mainPages = [
    {
      url: 'https://www.mma.box',
      lastModified: currentDate,
      changeFrequency: 'daily' as ChangeFrequency,
      priority: 1,
    },
    {
      url: 'https://www.mma.box/events',
      lastModified: currentDate,
      changeFrequency: 'daily' as ChangeFrequency,
      priority: 0.9,
    },
    {
      url: 'https://www.mma.box/fighters',
      lastModified: currentDate,
      changeFrequency: 'daily' as ChangeFrequency,
      priority: 0.9,
    },
    {
      url: 'https://www.mma.box/news',
      lastModified: currentDate,
      changeFrequency: 'daily' as ChangeFrequency,
      priority: 0.9,
    },
  ];
  
  // Content pages with high relevance for MMA terms
  const contentPages = [
    {
      url: 'https://www.mma.box/rankings',
      lastModified: currentDate,
      changeFrequency: 'weekly' as ChangeFrequency,
      priority: 0.85,
    },
    {
      url: 'https://www.mma.box/promotions/ufc',
      lastModified: currentDate,
      changeFrequency: 'daily' as ChangeFrequency,
      priority: 0.85,
    },
    {
      url: 'https://www.mma.box/promotions/bellator',
      lastModified: currentDate,
      changeFrequency: 'daily' as ChangeFrequency,
      priority: 0.85,
    },
    {
      url: 'https://www.mma.box/promotions/one-championship',
      lastModified: currentDate,
      changeFrequency: 'daily' as ChangeFrequency,
      priority: 0.85,
    },
    {
      url: 'https://www.mma.box/videos',
      lastModified: currentDate,
      changeFrequency: 'daily' as ChangeFrequency,
      priority: 0.85,
    },
    {
      url: 'https://www.mma.box/weight-classes',
      lastModified: currentDate,
      changeFrequency: 'monthly' as ChangeFrequency,
      priority: 0.8,
    },
    {
      url: 'https://www.mma.box/mma-rules',
      lastModified: currentDate,
      changeFrequency: 'monthly' as ChangeFrequency,
      priority: 0.8,
    },
    {
      url: 'https://www.mma.box/mma-history',
      lastModified: currentDate,
      changeFrequency: 'monthly' as ChangeFrequency,
      priority: 0.8,
    },
    {
      url: 'https://www.mma.box/community',
      lastModified: currentDate,
      changeFrequency: 'daily' as ChangeFrequency,
      priority: 0.8,
    },
    {
      url: 'https://www.mma.box/shop',
      lastModified: currentDate,
      changeFrequency: 'weekly' as ChangeFrequency,
      priority: 0.8,
    },
  ];
  
  // Secondary pages
  const secondaryPages = [
    {
      url: 'https://www.mma.box/about',
      lastModified: currentDate,
      changeFrequency: 'monthly' as ChangeFrequency,
      priority: 0.7,
    },
    {
      url: 'https://www.mma.box/contact',
      lastModified: currentDate,
      changeFrequency: 'monthly' as ChangeFrequency,
      priority: 0.7,
    },
    {
      url: 'https://www.mma.box/faq',
      lastModified: currentDate,
      changeFrequency: 'monthly' as ChangeFrequency,
      priority: 0.7,
    },
    {
      url: 'https://www.mma.box/careers',
      lastModified: currentDate,
      changeFrequency: 'monthly' as ChangeFrequency,
      priority: 0.6,
    },
    {
      url: 'https://www.mma.box/privacy',
      lastModified: currentDate,
      changeFrequency: 'yearly' as ChangeFrequency,
      priority: 0.5,
    },
    {
      url: 'https://www.mma.box/terms',
      lastModified: currentDate,
      changeFrequency: 'yearly' as ChangeFrequency,
      priority: 0.5,
    },
    {
      url: 'https://www.mma.box/cookies',
      lastModified: currentDate,
      changeFrequency: 'yearly' as ChangeFrequency,
      priority: 0.5,
    },
  ];
  
  // Dynamic pages (would be generated from DB in production)
  const dynamicPages = [
    // Events
    ...Array.from({ length: 10 }, (_, i) => ({
      url: `https://www.mma.box/events/${i + 1}`,
      lastModified: currentDate,
      changeFrequency: 'daily' as ChangeFrequency,
      priority: 0.8,
    })),
    
    // Fighters
    ...Array.from({ length: 20 }, (_, i) => ({
      url: `https://www.mma.box/fighters/${i + 1}`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as ChangeFrequency,
      priority: 0.8,
    })),
    
    // News articles
    ...Array.from({ length: 20 }, (_, i) => ({
      url: `https://www.mma.box/news/${i + 1}`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as ChangeFrequency,
      priority: 0.7,
    })),
    
    // Weight classes
    ...['heavyweight', 'light-heavyweight', 'middleweight', 'welterweight', 'lightweight', 'featherweight', 'bantamweight', 'flyweight'].map(weight => ({
      url: `https://www.mma.box/weight-classes/${weight}`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as ChangeFrequency,
      priority: 0.75,
    })),
    
    // Fighting techniques
    ...['striking', 'wrestling', 'brazilian-jiu-jitsu', 'muay-thai', 'boxing', 'judo', 'sambo'].map(technique => ({
      url: `https://www.mma.box/techniques/${technique}`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as ChangeFrequency,
      priority: 0.7,
    })),
  ];
  
  // Combine all URL sets
  return [
    ...mainPages,
    ...contentPages,
    ...secondaryPages,
    ...dynamicPages,
  ];
} 