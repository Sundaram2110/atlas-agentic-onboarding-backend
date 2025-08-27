import express from 'express';
import employeeRoutes from './routes/employeeRoutes';
import taskRoutes from './routes/taskRoutes';
import documentRoutes from './routes/documentRoutes';
import agentRoutes from './routes/agentRoutes';

const app = express();
app.use(express.json());

app.use('/api/employees', employeeRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/agent', agentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
