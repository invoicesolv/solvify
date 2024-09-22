export const runtime = 'edge';

import { sql } from '../../backend/src/db';

export default async function handler(request: Request) {
  try {
    // Handle the request
    const data = await request.json();

    // Perform database operation
    const result = await sql`
      INSERT INTO table_name (column1, column2)
      VALUES (${data.value1}, ${data.value2})
    `;

    return new Response(JSON.stringify({ success: true, result }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}