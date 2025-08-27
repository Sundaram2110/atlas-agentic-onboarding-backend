import { Router } from 'express';
import { getEmployees } from '../controllers/employeeController';

const router = Router();
router.get('/', getEmployees);
export default router;