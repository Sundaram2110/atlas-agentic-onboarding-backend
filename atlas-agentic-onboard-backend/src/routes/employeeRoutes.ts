// import { Router } from 'express';
// import { getEmployees } from '../controllers/employeeController';

// const router = Router();
// router.get('/', getEmployees);
// export default router;
import { Router } from "express";
import { sendWelcomeEmail, assignBuddyEmployee } from "../tools/employees";

const router = Router();
router.post("/:id/welcome", sendWelcomeEmail);
router.post("/:id/buddy", assignBuddyEmployee);
export default router;
