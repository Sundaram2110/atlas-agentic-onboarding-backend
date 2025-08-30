import { Router } from "express";
import { getPolicyAnswer } from "../tools/policies";

const router = Router();
router.get("/search", getPolicyAnswer);
export default router;
