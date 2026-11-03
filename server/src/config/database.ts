import dotenv from "dotenv";
import pg, { type QueryResultRow } from "pg";

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  host: process.env.DB_HOST ?? "localhost",
  port: Number(process.env.DB_PORT ?? 5432),
  user: process.env.DB_USER ?? "postgres",
  password: process.env.DB_PASSWORD ?? "postgres",
  database: process.env.DB_NAME ?? "expense_tracker",
  ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : false,
});

export async function query<T extends QueryResultRow = QueryResultRow>(
  text: string,
  params: unknown[] = []
) {
  const result = await pool.query<T>(text, params);
  return result;
}
 
export async function testConnection(): Promise<boolean> {
  try {
    const result = await pool.query("SELECT NOW() AS current_time");
    console.log("PostgreSQL connected successfully:", result.rows[0]?.current_time);
    return true;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown database error";
    console.error("PostgreSQL connection failed:", message);
    return false;
  }
}

export default pool;
