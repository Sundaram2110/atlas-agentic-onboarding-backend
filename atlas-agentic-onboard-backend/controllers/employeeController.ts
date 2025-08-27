import { Request, Response } from 'express';

export const getEmployees = (req: Request, res: Response) => {
  res.json({ message: 'List of employees' });
};