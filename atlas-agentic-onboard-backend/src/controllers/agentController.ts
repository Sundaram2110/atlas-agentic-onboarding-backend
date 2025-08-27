import { Request, Response } from 'express';
import { runLangAgent } from '../agents/langAgent';

export const runAgent = async (req: Request, res: Response) => {
  try {
    const { message } = req.body;
    const response = await runLangAgent(message);
    res.json({ response });
  } catch (error) {
    res.status(500).json({ error: 'Agent execution failed' });
  }
};