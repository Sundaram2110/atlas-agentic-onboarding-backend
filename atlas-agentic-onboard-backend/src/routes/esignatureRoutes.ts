import { Router } from "express";
import { generateESignatureLink } from "../tools/esignature";

const router = Router();
router.post("/generate", generateESignatureLink);
export default router;
