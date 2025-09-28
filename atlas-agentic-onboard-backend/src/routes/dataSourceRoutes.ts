import { Router } from "express";
import { getDataSources } from '../tools/dataSources';

const router = Router();
router.get("/", getDataSources);

export default router;
