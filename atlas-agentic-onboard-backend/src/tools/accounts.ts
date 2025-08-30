import { Request, Response } from "express";

export const createUserAccount = async (req: Request, res: Response) => {
  const { employeeId } = req.body;
  res.json({ success: true, message: `User account created for employee ${employeeId}` });
};
