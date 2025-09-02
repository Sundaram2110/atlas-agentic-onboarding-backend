import { Router } from "express";
import { getAgents, chatWithAgent, createAgent } from '../tools/agent';

const router = Router();
router.get("/", getAgents);
router.post("/", createAgent); // Add this line
router.post("/chat", chatWithAgent);
export default router;