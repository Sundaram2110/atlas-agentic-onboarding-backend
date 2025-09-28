import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { runLangAgent } from "./agents/langAgent";
import { getWorkflows } from "./tools/workflows";
import agentRoutes from "./routes/agentRoutes";

const app = express();
const PORT = 5001;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/agent', agentRoutes);

// API route

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

app.get("/api/workflows", getWorkflows);

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
