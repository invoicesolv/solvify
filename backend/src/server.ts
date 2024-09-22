import express from 'express';
import { query } from './db';

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

app.get('/api/accounts', async (req, res) => {
  try {
    const result = await query('SELECT * FROM accounts');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});