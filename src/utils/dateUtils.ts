/**
 * Formats an event date string or Date object into a more readable format.
 * Handles null or invalid dates gracefully.
 * Example: "April 12, 2025, 10:00 PM EDT"
 */
export function formatEventDate(dateInput: string | Date | null | undefined): string {
    if (!dateInput) {
        return 'Date TBD';
    }

    try {
        const date = new Date(dateInput);
        // Check if the date is valid
        if (isNaN(date.getTime())) {
            return 'Invalid Date';
        }

        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            timeZoneName: 'short', // e.g., EST, PDT
            hour12: true
        };
        
        return new Intl.DateTimeFormat('en-US', options).format(date);
    } catch (error) {
        console.error("Error formatting date:", dateInput, error);
        // Fallback to returning the input or a generic error message
        return typeof dateInput === 'string' ? dateInput : 'Date Error'; 
    }
}

// Add other date utility functions as needed 