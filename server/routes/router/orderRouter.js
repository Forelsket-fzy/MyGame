import express  from "express";
import {OrderInfo, AddOrder, DeleteOrder} from "../../controller/orderController.js";

const router = express.Router();

router
    .get('/users/order',OrderInfo)//获取订单
    .post('/users/addOrder', AddOrder)//增加
    .get('/users/deleteOrder',DeleteOrder);

export default router;
