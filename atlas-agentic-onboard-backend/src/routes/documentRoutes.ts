// import { Router } from 'express';
// import { getDocuments } from '../controllers/documentController';

// const router = Router();
// router.get('/', getDocuments);
// export default router;
import { Router } from "express";
import { uploadEmployeeDocuments, checkDocumentStatus } from "../tools/documents";

const router = Router();
router.post("/upload", uploadEmployeeDocuments);
router.get("/status/:employeeId", checkDocumentStatus);
export default router;
