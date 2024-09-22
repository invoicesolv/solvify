import { NextApiRequest, NextApiResponse } from 'next';
import { query } from '../../backend/src/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { customers, ejKundCustomers } = req.body;

    // Save customers
    for (const customer of customers) {
      await query(
        'INSERT INTO accounts (account, type, amount, accountValue) VALUES ($1, $2, $3, $4) ON CONFLICT (account) DO UPDATE SET type = $2, amount = $3, accountValue = $4',
        [customer.account, customer.type, customer.amount, customer.accountValue]
      );
    }

    // Save ejKundCustomers
    for (const customer of ejKundCustomers) {
      await query(
        'INSERT INTO accounts (account, type, amount, accountValue) VALUES ($1, $2, $3, $4) ON CONFLICT (account) DO UPDATE SET type = $2, amount = $3, accountValue = $4',
        [customer.account, customer.type, customer.amount, customer.accountValue]
      );
    }

    res.status(200).json({ message: 'Data saved successfully' });
  } catch (error) {
    console.error('Error saving accounts:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}