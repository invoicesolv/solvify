import { NextRequest } from 'next/server';
import { sql } from '../../backend/src/db';

export const config = {
  runtime: 'experimental-edge',
};

export default async function handler(req: NextRequest) {
  const result = await sql`SELECT * FROM your_table`;
  return new Response(JSON.stringify(result), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}