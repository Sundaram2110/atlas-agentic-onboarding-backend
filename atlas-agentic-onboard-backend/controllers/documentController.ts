import { Request, Response } from 'express';

export const getDocuments = (req: Request, res: Response) => {
  res.json({ message: 'List of documents' });
};