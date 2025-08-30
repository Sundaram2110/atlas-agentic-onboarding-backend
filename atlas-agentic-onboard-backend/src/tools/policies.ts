import { Request, Response } from "express";

export const getPolicyAnswer = async (req: Request, res: Response) => {
  const { query } = req.query;
  res.json({ success: true, answer: `Policy result for ${query}` });
};
