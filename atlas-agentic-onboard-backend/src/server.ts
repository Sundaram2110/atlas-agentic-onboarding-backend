import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { runLangAgent } from "./agents/langAgent";

const app = express();
const PORT = 5001;

app.use(cors());
app.use(bodyParser.json());

// API route
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

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
