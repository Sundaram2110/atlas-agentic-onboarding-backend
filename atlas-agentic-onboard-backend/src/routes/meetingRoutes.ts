import { Router } from "express";
import { scheduleOrientationMeeting, scheduleMeetingWithManager } from "../tools/meetings";

const router = Router();
router.post("/orientation", scheduleOrientationMeeting);
router.post("/manager", scheduleMeetingWithManager);
export default router;
