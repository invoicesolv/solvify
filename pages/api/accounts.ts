// pages/api/accounts.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { query } from '../../backend/src/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const result = await query('SELECT id, account, type, amount, accountValue, priority, industry, epost FROM accounts');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching accounts:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
