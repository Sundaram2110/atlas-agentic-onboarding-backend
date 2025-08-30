import express from "express";
import cors from "cors";

import documentRoutes from "./routes/documentRoutes";
import employeeRoutes from "./routes/employeeRoutes";
import meetingRoutes from "./routes/meetingRoutes";
import trainingRoutes from "./routes/trainingRoutes";
import itRoutes from "./routes/itRoutes";
import accountRoutes from "./routes/accountRoutes";
import esignatureRoutes from "./routes/esignatureRoutes";
import policyRoutes from "./routes/policyRoutes";
import notificationRoutes from "./routes/notificationRoutes";
import feedbackRoutes from "./routes/feedbackRoutes";
import agentRoutes from './routes/agentRoutes';
import taskRoutes from './routes/taskRoutes';

const app = express();
app.use(express.json());

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
}));

// mount routes
app.use("/api/documents", documentRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/meetings", meetingRoutes);
app.use("/api/training", trainingRoutes);
app.use("/api/it", itRoutes);
app.use("/api/accounts", accountRoutes);
app.use("/api/esignature", esignatureRoutes);
app.use("/api/policies", policyRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use('/api/agent', agentRoutes);
app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

app.get("/", (req, res) => {
  res.send("Backend API is running 🚀");
});
