import { Request, Response } from "express";

export const submitITEquipmentRequest = async (req: Request, res: Response) => {
  const { employeeId, items } = req.body;
  res.json({ success: true, message: `IT request submitted for ${items}` });
};
