import express from 'express';
import  upload  from '../../config/multer.js'
import {GameInfo, Slideshow, GameCategory, GameTop, MyGame, searchGame, AddGame, DeleteGame} from '../../controller/gameController.js';
const router = express.Router();

router
    .get('/game/slideshow', Slideshow)//轮播图
    .get('/game/gameCategory', GameCategory)//分类查询
    .get('/game/gameTop', GameTop)//排行榜
    .get('/users/myGame', MyGame)//需要token 我的游戏
    .get('/game/searchGame', searchGame)//游戏搜索
    .get('/admin/gameInfo', GameInfo)//游戏信息
    .post('/admin/addGame',upload.single('cover_image'),AddGame)//增加游戏
    .get('/admin/deleteGame', DeleteGame)//删除

export default router;