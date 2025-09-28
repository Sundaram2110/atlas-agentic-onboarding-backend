import { Router } from "express";
import { getAgents, chatWithAgent, createAgent, updateAgent, stopAgent, startAgent, deleteAgent } from '../tools/agent';

const router = Router();
router.get("/", getAgents);
router.post("/", createAgent); // Add this line
router.put("/:id", updateAgent);
router.post("/chat", chatWithAgent);
router.post("/:id/stop", stopAgent);
router.post("/:id/start", startAgent);
router.delete("/:id", deleteAgent);
export default router;
