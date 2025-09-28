import { Router } from "express";
import { getWorkflows } from '../tools/workflows';

const router = Router();
router.get("/", getWorkflows);

export default router;
