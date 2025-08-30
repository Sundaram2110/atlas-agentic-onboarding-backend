import { Router } from "express";
import { triggerFeedbackSurvey, analyzeFeedbackResponse } from "../tools/feedback";

const router = Router();
router.post("/survey", triggerFeedbackSurvey);
router.get("/analyze/:employeeId", analyzeFeedbackResponse);
export default router;
