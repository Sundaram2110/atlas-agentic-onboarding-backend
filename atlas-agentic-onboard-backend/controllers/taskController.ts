import { Request, Response } from 'express';

export const getTasks = (req: Request, res: Response) => {
  res.json({ message: 'List of tasks' });
};