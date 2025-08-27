import { Request, Response } from 'express';
import { runLangAgent } from '../agents/langAgent';

export const runAgent = async (req: Request, res: Response) => {
  try {
    const { query } = req.body;
    const response = await runLangAgent(query);
    res.json({ response });
  } catch (error) {
    res.status(500).json({ error: 'Agent execution failed' });
  }
};