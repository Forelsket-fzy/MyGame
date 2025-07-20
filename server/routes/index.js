import express from 'express';
import userRouter from './router/userRouter.js';
import gameRouter from './router/gameRouter.js';
import orderRouter from './router/OrderRouter.js';
import myGameRouter from "./router/myGameRouter.js";
import shoppingRouter from "./router/shoppingRouter.js";
import slideRouter from "./router/slideshowRouter.js";

const router = express.Router();

router.use(userRouter);
router.use(orderRouter);
router.use(gameRouter);
router.use(myGameRouter);
router.use(shoppingRouter);
router.use(slideRouter);

export default router;
