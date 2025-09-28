import { Request, Response } from "express";

export const getDataSources = async (req: Request, res: Response) => {
  try {
    const dataSources = [
      "agents",
      "workflows",
      "logs",
      "memory",
      "employees",
      "documents",
      "tasks",
      "meetings",
      "training",
      "it_requests",
      "accounts",
      "feedback"
    ];
    res.json({ dataSources });
  } catch (error) {
    console.error("Error in getDataSources:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
