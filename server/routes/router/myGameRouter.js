import express from 'express';
import {AddMyGame,DeleteMyGame} from "../../controller/myGameController.js";

const router = express.Router();

router
    .get('/users/myGame/addGame', AddMyGame)//我的游戏 增加
    .get('/users/myGame/deleteGame', DeleteMyGame)

export default router;