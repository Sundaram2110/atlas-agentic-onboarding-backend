import { Router } from 'express';
import { runAgent } from '../controllers/agentController';

const router = Router();
router.post('/chat', runAgent);
export default router;