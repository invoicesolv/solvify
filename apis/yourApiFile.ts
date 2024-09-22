import { Request, Response } from 'express';
import { query } from '../backend/src/db'; // Use named import

export const yourApiFunction = async (req: Request, res: Response): Promise<void> => {
  try {
    // Example SQL query
    const result = await query('YOUR SQL QUERY HERE', [/* parameters */]);
    res.json(result.rows);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// ... other API functions with proper type annotations