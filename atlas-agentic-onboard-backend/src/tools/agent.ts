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

export const chatWithAgent = (req: Request, res: Response) => {
  console.log("Chatting with agent");
  res.send("Agent chat response");
};