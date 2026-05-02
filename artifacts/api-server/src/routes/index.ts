import { Router, type IRouter } from "express";
import healthRouter from "./health";
import linksRouter from "./links";

const router: IRouter = Router();

router.use(healthRouter);
router.use(linksRouter);

export default router;
