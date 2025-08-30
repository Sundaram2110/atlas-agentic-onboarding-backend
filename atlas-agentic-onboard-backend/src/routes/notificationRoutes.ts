import { Router } from "express";
import { notifyHRAdmin } from "../tools/notifications";

const router = Router();
router.post("/hr", notifyHRAdmin);
export default router;
