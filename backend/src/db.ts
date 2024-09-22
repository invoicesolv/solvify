import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// Disable native bindings
const pg = require('pg');
pg.defaults.parseInt8 = true;
delete pg.native;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

export const query = (text: string, params?: any[]) => pool.query(text, params);