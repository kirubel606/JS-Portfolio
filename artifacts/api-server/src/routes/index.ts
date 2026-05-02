import { Router, type IRouter } from "express";
import healthRouter from "./health";
import linksRouter from "./links";
import adminRouter from "./admin";
import aboutRouter from "./about";
import contactRouter from "./contact";

const router: IRouter = Router();

router.use(healthRouter);
router.use(adminRouter);
router.use(linksRouter);
router.use(aboutRouter);
router.use(contactRouter);

export default router;
