import { Request, Response } from 'express';
import { query } from '../backend/src/db'; // Use named import

// Example API endpoint with type annotations
export const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId: string = req.params.id;
    const result = await query('SELECT * FROM users WHERE id = $1', [userId]);
    
    if (result.rows.length === 0) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// ... other API endpoints with proper type annotations