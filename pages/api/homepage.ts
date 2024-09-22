import type { NextRequest } from 'next/server'
import { D1Database } from '@cloudflare/workers-types'

export const config = {
  runtime: 'edge',
};

interface Env {
  DB: D1Database;
}

export default async function handler(req: NextRequest, env: Env) {
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', {
      status: 405,
      headers: { 'Allow': 'POST' },
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
    const data = await req.json();
    console.log('Received POST data:', data);

    await env.DB.exec(`
      CREATE TABLE IF NOT EXISTS homepage (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        data TEXT NOT NULL
      )
    `);

    await env.DB.prepare('DELETE FROM homepage').run();
    const { success } = await env.DB.prepare('INSERT INTO homepage (data) VALUES (?)').bind(JSON.stringify(data)).run();

    if (success) {
      console.log('Homepage data saved successfully');
      return new Response(JSON.stringify({ message: 'Data saved successfully' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } else {
      throw new Error('Failed to insert data');
    }
  } catch (error: unknown) {
    console.error('Detailed error:', error);
    return new Response(JSON.stringify({ error: 'Failed to save homepage data', details: error instanceof Error ? error.message : 'Unknown error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}