// src/utils/slugify.ts

export function generateSlug(text: string): string {
    if (!text) {
        return `untitled-${Date.now()}`; // Fallback for empty title
    }

    return text
        .toString()                     // Ensure input is a string
        .normalize('NFD')               // Split accented characters into base characters and diacritics
        .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
        .toLowerCase()                  // Convert to lowercase
        .trim()                         // Remove leading/trailing whitespace
        .replace(/\s+/g, '-')           // Replace spaces with hyphens
        .replace(/[^\w-]+/g, '')        // Remove all non-word chars except hyphens
        .replace(/--+/g, '-')           // Replace multiple hyphens with a single hyphen
        .replace(/^-+/, '')             // Trim hyphens from start
        .replace(/-+$/, '');            // Trim hyphens from end
}