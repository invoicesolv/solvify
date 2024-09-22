import { Request, Response } from 'express';
import { sql } from '../backend/src/db'; // Change this line

// Example API endpoint with type annotations
export const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await sql`SELECT * FROM users WHERE id = ${req.params.id}`;
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};

// ... other API endpoints with proper type annotations