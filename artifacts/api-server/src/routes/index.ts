import { Router, type IRouter } from "express";
import healthRouter from "./health";
import authRouter from "./auth";
import showroomRouter from "./showroom";
import messagesRouter from "./messages";
import twitterRouter from "./twitter";

const router: IRouter = Router();

router.use(healthRouter);
router.use(authRouter);
router.use(showroomRouter);
router.use(messagesRouter);
router.use(twitterRouter);

export default router;
