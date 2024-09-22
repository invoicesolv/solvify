import type { NextRequest } from 'next/server'
import { D1Database } from '@cloudflare/workers-types'

export const config = {
  runtime: 'edge',
};

interface Env {
  DB: D1Database;
}

interface RequestData {
  action: 'fetch' | 'save';
  payload?: unknown;
}

export default async function handler(req: NextRequest) {
  const env = process.env as unknown as Env;

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
    const data: unknown = await req.json();
    console.log('Received POST data:', data);

    if (!isValidRequestData(data)) {
      throw new Error('Invalid request data');
    }

    if (data.action === 'fetch') {
      // Fetch data
      const { results } = await env.DB.prepare('SELECT * FROM projektstavla').all();
      console.log('Projektstavla data fetched:', results.length);
      return new Response(JSON.stringify(results), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } else if (data.action === 'save') {
      // Save data
      // Ensure the table exists
      await env.DB.exec(`
        CREATE TABLE IF NOT EXISTS projektstavla (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          data TEXT NOT NULL
        )
      `);

      // Insert new data
      const { success } = await env.DB.prepare(
        'INSERT INTO projektstavla (data) VALUES (?)'
      ).bind(JSON.stringify(data.payload)).run();

      if (success) {
        console.log('Data saved successfully');
        return new Response(JSON.stringify({ message: 'Data saved successfully' }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      } else {
        throw new Error('Failed to insert data');
      }
    } else {
      throw new Error('Invalid action');
    }
  } catch (error: unknown) {
    console.error('Detailed error:', error);
    return new Response(JSON.stringify({ error: 'Failed to process request', details: error instanceof Error ? error.message : 'Unknown error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

function isValidRequestData(data: unknown): data is RequestData {
  if (typeof data !== 'object' || data === null) {
    return false;
  }

  const { action, payload } = data as RequestData;

  if (action !== 'fetch' && action !== 'save') {
    return false;
  }

  if (action === 'save' && payload === undefined) {
    return false;
  }

  return true;
}