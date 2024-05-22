import { Pool, Client } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import * as schema from "../../schema";

export const connection = new Client({
  connectionString: process.env.DATABASE_URL,
});
export const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle(pool, {
  schema,
});

export { db, schema };
