// src/types.ts

export interface NewsArticle {
    id: number;
    title: string;
    slug: string | null;
    summary: string | null; // Changed from excerpt to match DB
    content: string | null; // Add content field
    image_url: string | null; // Changed from image to match DB
    source_url: string | null; // Add source_url field
    author: string | null; // Add author field
    published_at: Date | string | null; // Allow string for raw DB data if needed
    status?: 'draft' | 'published' | 'archived'; // Add optional status
    created_at?: Date | string | null; // Add optional timestamp
    updated_at?: Date | string | null; // Add optional timestamp
    // Add other fields like category if you implement them later
    // category?: string; // Example
  }
  
  export interface UpcomingEvent {
    id: number;
    title: string;
    date: string;
    location: string;
    mainEvent: string;
    image: string; // Keeping as mock data structure for now
  }
  
  export interface FeaturedFighter {
      id: number;
      name: string;
      record: string;
      division: string;
      image: string; // Keeping as mock data structure for now
  }
  
  // You can add more shared types here as the project grows