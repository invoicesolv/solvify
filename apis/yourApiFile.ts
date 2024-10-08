export const runtime = 'edge';

import { sql } from '../backend/src/db'; // Adjust the path as needed

export default async function handler(request: Request) {
  try {
    // Your API logic here
    const result = await sql`SELECT * FROM your_table`;

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'An error occurred', details: error }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}