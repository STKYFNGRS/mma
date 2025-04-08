import { neon } from '@neondatabase/serverless';

// Helper function to get DB connection
export function getDb() {
    const sql = neon(process.env.DATABASE_URL!);
    return sql;
}

// Define a type for common SQL parameter values
export type SqlValue = string | number | boolean | Date | null; 