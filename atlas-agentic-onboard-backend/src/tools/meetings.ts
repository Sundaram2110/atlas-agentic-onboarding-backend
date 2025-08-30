import { Request, Response } from "express";

export const scheduleOrientationMeeting = async (req: Request, res: Response) => {
  const { employeeId, time } = req.body;
  res.json({ success: true, message: `Orientation scheduled at ${time}` });
};

export const scheduleMeetingWithManager = async (req: Request, res: Response) => {
  const { employeeId, managerId, time } = req.body;
  res.json({ success: true, message: `Meeting with manager ${managerId} set for ${time}` });
};
