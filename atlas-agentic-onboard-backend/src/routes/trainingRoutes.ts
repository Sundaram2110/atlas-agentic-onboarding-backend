import { Router } from "express";
import { assignTrainingModule, checkTrainingProgress } from "../tools/training";

const router = Router();
router.post("/assign", assignTrainingModule);
router.get("/progress/:employeeId", checkTrainingProgress);
export default router;
