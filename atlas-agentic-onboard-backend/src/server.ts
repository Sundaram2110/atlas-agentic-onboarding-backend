import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { runLangAgent } from "./agents/langAgent";

const app = express();
const PORT = 5001;

app.use(cors());
app.use(bodyParser.json());

// API route

// Existing chat endpoint
app.post("/api/agent/chat", async (req, res) => {
  try {
    const { query } = req.body;
    const response = await runLangAgent(query);
    res.json({ response });
  } catch (error) {
    console.error("Error in /api/agent/chat:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// New agentic workflow endpoint
import axios from "axios";

app.post("/api/agent/respond", async (req, res) => {
  try {
    const { prompt, context } = req.body;
    // Forward to Python LangGraph agent service
    const pythonAgentUrl = "http://localhost:8000/agent/respond";
    const agentRes = await axios.post(pythonAgentUrl, { prompt, context });
    res.json(agentRes.data);
  } catch (error) {
    console.error("Error in /api/agent/respond:", error);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
