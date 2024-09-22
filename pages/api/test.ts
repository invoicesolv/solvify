import type { NextRequest } from 'next/server'
import { D1Database } from '@cloudflare/workers-types'

export const config = {
  runtime: 'edge',
};

interface Env {
  DB: D1Database;
}

export default async function handler(req: NextRequest, env: Env) {
  if (!env.DB) {
    console.error('DB binding is not defined');
    return new Response(JSON.stringify({ error: 'DB binding is not defined' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (req.method === 'GET') {
    try {
      console.log('Fetching test data...');
      const { results } = await env.DB.prepare('SELECT * FROM test').all();
      console.log('Test data fetched:', results.length);
      return new Response(JSON.stringify(results), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error: unknown) {
      console.error('Error details:', error);
      return new Response(JSON.stringify({ error: 'Failed to fetch test data', details: error instanceof Error ? error.message : 'Unknown error' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  } else {
    return new Response('Method Not Allowed', {
      status: 405,
      headers: { 'Allow': 'GET' },
    });
  }
}