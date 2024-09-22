import sql from '../backend/src/db.mjs';

export default {
  async fetch(request, env) {
    if (request.method === 'GET') {
      try {
        const result = await sql`SELECT * FROM accounts`;
        return new Response(JSON.stringify(result), {
          headers: { 'Content-Type': 'application/json' },
        });
      } catch (error) {
        console.error('Error fetching accounts:', error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        });
      }
    }
    return new Response('Method Not Allowed', { status: 405 });
  },
};