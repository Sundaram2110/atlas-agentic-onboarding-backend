import { Router } from "express";
import { submitITEquipmentRequest } from "../tools/it";

const router = Router();
router.post("/request", submitITEquipmentRequest);
export default router;
