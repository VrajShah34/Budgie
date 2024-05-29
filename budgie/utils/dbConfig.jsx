import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

const sql = neon('postgresql://neondb_owner:KXMrxf5dG6ls@ep-winter-credit-a55e6ehf.us-east-2.aws.neon.tech/Budgie?sslmode=require');
export const db = drizzle(sql , {schema});