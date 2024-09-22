export const runtime = 'edge';

import { sql } from '../../backend/src/db';

export default async function handler(request: Request) {
  try {
    const data = await request.json();

    // Assuming data is an array of accounts
    for (const account of data) {
      await sql`
        INSERT INTO accounts (id, name, email)
        VALUES (${account.id}, ${account.name}, ${account.email})
      `;
    }

    return new Response(JSON.stringify({ message: 'Accounts saved successfully' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Error saving accounts', details: error }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}