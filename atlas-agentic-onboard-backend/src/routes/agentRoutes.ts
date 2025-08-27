import { Router } from 'express';
import { runAgent } from '../controllers/agentController';

const router = Router();
router.post('/run', runAgent);
export default router;