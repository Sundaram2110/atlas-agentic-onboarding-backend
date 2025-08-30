import { Request, Response } from "express";

export const notifyHRAdmin = async (req: Request, res: Response) => {
  const { message } = req.body;
  res.json({ success: true, message: `HR notified: ${message}` });
};
