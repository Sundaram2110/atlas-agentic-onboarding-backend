import { Request, Response } from "express";

export const generateESignatureLink = async (req: Request, res: Response) => {
  const { employeeId } = req.body;
  res.json({ success: true, link: `https://esign.fake/${employeeId}` });
};
