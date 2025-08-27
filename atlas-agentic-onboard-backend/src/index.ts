import express from 'express';
import employeeRoutes from './routes/employeeRoutes';
import taskRoutes from './routes/taskRoutes';
import documentRoutes from './routes/documentRoutes';
import agentRoutes from './routes/agentRoutes';
import cors from 'cors';

const app = express();
app.use(express.json());

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
}));

app.use('/api/employees', employeeRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/agent', agentRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.get("/", (req, res) => {
  res.send("Backend API is running 🚀");
});
