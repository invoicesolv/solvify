import express from 'express';
import { sql } from './db';

const app = express();
const port = process.env.PORT || 3001;

interface Account {
  id: number;
  name: string;
  // Add other fields as necessary
}

app.get('/accounts', async (req, res) => {
  try {
    const result = await sql`SELECT * FROM accounts`;
    const accounts: Account[] = result.map((row: any) => ({
      id: row.id,
      name: row.name,
      // Map other fields as necessary
    }));
    res.json(accounts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});