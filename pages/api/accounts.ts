// pages/api/accounts.ts

export const runtime = 'edge';

import { sql } from '../../backend/src/db';

export default async function handler() {
  try {
    const result = await sql`SELECT * FROM accounts`;
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Error fetching accounts', details: error }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
