import { Request, Response } from "express";

export const sendWelcomeEmail = async (req: Request, res: Response) => {
  const { id } = req.params;
  // integrate with email service
  res.json({ success: true, message: `Welcome email sent to employee ${id}` });
};

export const assignBuddyEmployee = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { buddyId } = req.body;
  res.json({ success: true, message: `Buddy ${buddyId} assigned to employee ${id}` });
};
