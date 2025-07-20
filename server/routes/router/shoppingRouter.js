import express from 'express';
import {shopping} from "../../controller/shoppinngController.js";

const router = express.Router();

router
    .post('/users/order/shopping',shopping);//购买

export default router;