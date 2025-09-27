import { Request, Response } from "express";

export const getAgents = (req: Request, res: Response) => {
  console.log("Fetching agents");
  res.send("List of agents");
};

export const createAgent = (req: Request, res: Response) => {
  // TODO: Implement logic to add a new agent
  console.log("Creating agent");
  res.send("Agent created");
};

import axios from "axios";

export const chatWithAgent = async (req: Request, res: Response) => {
  try {
    // Accept either 'prompt' or 'message'
    const prompt = req.body.prompt || req.body.message;
    const context = req.body.context || {};
    console.log("Sending to Python agent:", { prompt, context });
    const pythonAgentUrl = "http://localhost:8000/agent/respond";
    const agentRes = await axios.post(pythonAgentUrl, { prompt, context });
    res.json(agentRes.data);
  } catch (error) {
    console.error("Error in chatWithAgent:", error);
    res.status(500).json({ error: "Agent chat failed" });
  }
};