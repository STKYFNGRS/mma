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
  
// --- Event Management Types ---

// Define the structure for a single fight within the fight_card JSONB array
// Store with virtual ID for manipulation within the JSONB structure
export interface FightInputData {
    id?: number; // Virtual ID for client-side management
    event_id?: number; // Reference to parent event
    fighter1_name: string;
    fighter2_name: string;
    weight_class: string;
    is_title_fight: boolean;
    is_main_event: boolean; // Keep this to designate the main event within the card
    is_co_main?: boolean; // New field for co-main events
    card_position: 'MAIN_EVENT' | 'CO_MAIN' | 'MAIN_CARD' | 'PRELIM' | 'CANCELLED' | 'TITLE_FIGHT' | null; // Position on the fight card
    bout_order?: number | null; // Make optional since we're not using it in the UI
    notes?: string | null; // Make optional since we're not using it in the UI
    result?: FightResult | null; // Optional result
    showResults?: boolean; // UI-only property to control visibility of results section
}

export interface Event {
    id: number;
    league: string;
    event_name: string;
    slug: string | null;
    main_card: string | null; // Keep this for easy display of headline
    date: string | null;
    location: string | null;
    how_to_watch: string | null;
    how_to_watch_url: string | null; // URL to watch the event
    ticket_link: string | null;
    image_url: string | null;
    status: 'DRAFT' | 'PUBLISHED';
    created_at: Date | string | null;
    updated_at: Date | string | null;
    fight_card: FightInputData[] | null; // Add JSONB field for the fight card array
}

// Keep FightResult, but remove the standalone Fight interface as it's replaced by FightInputData
export interface FightResult {
    winner_name: string;
    loser_name: string;
    method: string; 
    round: number;
    time: string; 
}

// Type for AI-generated event data before saving
// Mirroring definition in eventActions.ts for consistency
export type EventInput = {
    league?: string | null;
    event_name?: string | null;
    main_card?: string | null;
    date?: string | null;
    location?: string | null;
    how_to_watch?: string | null;
    how_to_watch_url?: string | null; // URL to watch the event
    ticket_link?: string | null;
    status?: 'DRAFT' | 'PUBLISHED';
    slug?: string | null; // Added this property for auto-generated slug
};

// --- Mock/Placeholder Types (Can be removed if not used elsewhere) ---

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