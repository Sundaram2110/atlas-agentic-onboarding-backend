import { Request, Response } from "express";

export const triggerFeedbackSurvey = async (req: Request, res: Response) => {
  const { employeeId } = req.body;
  res.json({ success: true, link: `https://survey.fake/${employeeId}` });
};

export const analyzeFeedbackResponse = async (req: Request, res: Response) => {
  const { employeeId } = req.params;
  res.json({ success: true, summary: `Employee ${employeeId} rated onboarding 4/5` });
};
