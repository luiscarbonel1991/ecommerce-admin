import {neon, neonConfig} from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

if(!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not set in .env");

const sql = neon(process.env.DATABASE_URL);
// @ts-ignore
export const db = drizzle(sql);