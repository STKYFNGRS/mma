import { getDb } from './db';
import type { NewsArticle } from '@/types';

/**
 * Helper function to check if the error is about the news table not existing
 */
function isNewsTableNotExistError(error: unknown): boolean {
    return (
        error instanceof Error && 
        error.message.includes('relation "news_articles" does not exist')
    );
}

/**
 * Fetch all published news articles
 */
export async function fetchPublishedArticles(limit: number = 10): Promise<NewsArticle[]> {
    const sql = getDb();
    try {
        const result = await sql`
            SELECT id, title, slug, summary, content, image_url, 
                   source_url, author, published_at, status, created_at, updated_at
            FROM news_articles 
            WHERE status = 'published'
            ORDER BY published_at DESC
            LIMIT ${limit}
        `;
        return result as NewsArticle[];
    } catch (error) {
        if (isNewsTableNotExistError(error)) {
            console.log("News table does not exist yet. This is expected if news feature is still in development.");
            return [];
        } else {
            console.error("Error fetching published articles:", error);
            return [];
        }
    }
}

/**
 * Fetch a single published article by its slug
 */
export async function fetchPublishedArticleBySlug(slug: string): Promise<NewsArticle | null> {
    const sql = getDb();
    try {
        const result = await sql`
            SELECT id, title, slug, summary, content, image_url, 
                   source_url, author, published_at, status, created_at, updated_at
            FROM news_articles 
            WHERE status = 'published' AND slug = ${slug}
            LIMIT 1
        `;
        return result[0] as NewsArticle | null;
    } catch (error) {
        if (isNewsTableNotExistError(error)) {
            console.log("News table does not exist yet. This is expected if news feature is still in development.");
            return null;
        } else {
            console.error(`Error fetching published article by slug ${slug}:`, error);
            return null;
        }
    }
}

/**
 * Fetch latest news articles (limit count)
 */
export async function fetchLatestNews(limit: number = 4): Promise<NewsArticle[]> {
    const sql = getDb();
    try {
        const result = await sql`
            SELECT id, title, slug, summary, image_url, published_at
            FROM news_articles 
            WHERE status = 'published'
            ORDER BY published_at DESC
            LIMIT ${limit}
        `;
        return result as NewsArticle[];
    } catch (error) {
        if (isNewsTableNotExistError(error)) {
            console.log("News table does not exist yet. This is expected if news feature is still in development.");
            return [];
        } else {
            console.error("Error fetching latest news:", error);
            return [];
        }
    }
} 