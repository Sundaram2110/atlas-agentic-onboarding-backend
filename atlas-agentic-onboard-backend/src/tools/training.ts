import { Request, Response } from "express";

export const assignTrainingModule = async (req: Request, res: Response) => {
  const { employeeId, moduleId } = req.body;
  res.json({ success: true, message: `Module ${moduleId} assigned to employee ${employeeId}` });
};

export const checkTrainingProgress = async (req: Request, res: Response) => {
  const { employeeId } = req.params;
  res.json({ success: true, progress: "2/5 completed" });
};
