import { Router } from "express";
import { createUserAccount } from "../tools/accounts";

const router = Router();
router.post("/create", createUserAccount);
export default router;
