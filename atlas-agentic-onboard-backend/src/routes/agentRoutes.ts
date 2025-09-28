import { Router } from "express";
import { getAgents, chatWithAgent, createAgent, updateAgent } from '../tools/agent';

const router = Router();
router.get("/", getAgents);
router.post("/", createAgent); // Add this line
router.put("/:id", updateAgent);
router.post("/chat", chatWithAgent);
export default router;
