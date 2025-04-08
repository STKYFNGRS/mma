import { getDb } from './db';
import type { Event } from '@/types';

/**
 * Fetch all published events, ordered by date ascending (upcoming first)
 */
export async function fetchPublishedEvents(): Promise<Event[]> {
    const sql = getDb();
    try {
        const result = await sql`
            SELECT id, league, event_name, slug, main_card, date, location, 
                   how_to_watch, how_to_watch_url, ticket_link, image_url, status, created_at, updated_at,
                   fight_card
            FROM events 
            WHERE status = 'PUBLISHED'
            ORDER BY date ASC
        `;
        
        // Make sure each event has at least an empty fight_card array
        return result.map(event => ({
            ...event,
            fight_card: event.fight_card || []
        })) as Event[];
    } catch (error) {
        console.error("Error fetching published events:", error);
        return [];
    }
}

/**
 * Fetch upcoming published events (limit 5), ordered by date ascending
 */
export async function fetchUpcomingPublishedEvents(limit: number = 5): Promise<Event[]> {
    const sql = getDb();
    try {
        const result = await sql`
            SELECT id, league, event_name, slug, main_card, date, location, 
                   how_to_watch, how_to_watch_url, ticket_link, image_url, status, created_at, updated_at,
                   fight_card
            FROM events 
            WHERE status = 'PUBLISHED' AND date >= NOW()
            ORDER BY date ASC
            LIMIT ${limit}
        `;
        
        // Make sure each event has at least an empty fight_card array
        return result.map(event => ({
            ...event,
            fight_card: event.fight_card || []
        })) as Event[];
    } catch (error) {
        console.error("Error fetching upcoming published events:", error);
        return [];
    }
}

/**
 * Fetch a single published event by its ID
 */
export async function fetchPublishedEventById(id: number): Promise<Event | null> {
    const sql = getDb();
    if (isNaN(id) || id <= 0) {
        console.error(`Invalid event ID requested: ${id}`);
        return null;
    }
    try {
        const result = await sql`
            SELECT id, league, event_name, slug, main_card, date, location, 
                   how_to_watch, how_to_watch_url, ticket_link, image_url, status, created_at, updated_at,
                   fight_card
            FROM events 
            WHERE status = 'PUBLISHED' AND id = ${id}
            LIMIT 1
        `;
        
        // If the fight_card is null or undefined, provide an empty array
        if (result[0] && (result[0].fight_card === null || result[0].fight_card === undefined)) {
            result[0].fight_card = [];
        }
        
        return result[0] as Event | null;
    } catch (error) {
        console.error(`Error fetching published event by id ${id}:`, error);
        return null;
    }
}

/**
 * Fetch a single published event by its slug
 */
export async function fetchPublishedEventBySlug(slug: string): Promise<Event | null> {
    const sql = getDb();
    try {
        const result = await sql`
            SELECT id, league, event_name, slug, main_card, date, location, 
                   how_to_watch, how_to_watch_url, ticket_link, image_url, status, created_at, updated_at,
                   fight_card
            FROM events 
            WHERE status = 'PUBLISHED' AND slug = ${slug}
            LIMIT 1
        `;
        
        // If the fight_card is null or undefined, provide an empty array
        if (result[0] && (result[0].fight_card === null || result[0].fight_card === undefined)) {
            result[0].fight_card = [];
        }
        
        return result[0] as Event | null;
    } catch (error) {
        console.error(`Error fetching published event by slug ${slug}:`, error);
        return null;
    }
} 