import type { NextRequest } from 'next/server'
import { D1Database } from '@cloudflare/workers-types'

export const config = {
  runtime: 'edge',
};

interface Env {
  DB: D1Database;
}

export default async function handler(req: NextRequest) {
  // Access env through the global 'process' object
  const env = process.env as unknown as Env;

  if (req.method !== 'GET') {
    return new Response('Method Not Allowed', {
      status: 405,
      headers: { 'Allow': 'GET' },
    });
  }

  if (!env.DB) {
    console.error('DB binding is not defined');
    return new Response(JSON.stringify({ error: 'DB binding is not defined' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const { results } = await env.DB.prepare('SELECT * FROM files').all();
    return new Response(JSON.stringify(results), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: unknown) {
    console.error('Error details:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch files', details: error instanceof Error ? error.message : 'Unknown error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}