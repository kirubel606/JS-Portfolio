import { Router, type IRouter } from "express";
import healthRouter from "./health";
import linksRouter from "./links";
import adminRouter from "./admin";

const router: IRouter = Router();

router.use(healthRouter);
router.use(adminRouter);
router.use(linksRouter);

export default router;
