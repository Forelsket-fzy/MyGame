import {gameDao} from "../models/gameDao.js";

export const GameInfo = async (req, res) => {
    const game = await gameDao.gameInfo();
    if(game.length!==0)
    {
        res.send({
            code:'200',
            data:game
        })
    }else{
        res.send({
            code:'400',
            data:err
        })
    }
}

export const Slideshow = async (req, res) => {
    const game = await gameDao.Slideshow();
    if(game.length!==0)
    {
        res.send({
            code:'200',
            data:game
        })
    }else{
        res.send({
            code:'400',
            data:err
        })
    }
}

export const GameCategory = async (req, res) => {
    const {category_id} = req.query;
    const game = await gameDao.gameCategory(category_id);
    if(game.length!==0){
        res.send({
            code:'200',
            data:game
        })
    }else {
        res.send({
            code:'400',
            msg:'暂无这款游戏'
        })
    }

}

export const GameTop = async (req, res) => {
    const game = await gameDao.GameTop();
    if(game.length!==0){
        res.send({
            code:'200',
            data:game
        })
    }else{
        res.send({
            code:'400',
            msg:"信息错误"
        })
    }

}

export const MyGame = async (req, res) => {
    const user_id = req.user.user_id;
    const game = await gameDao.MyGame(user_id);
    if(game.length!==0){
        res.send({
            code:'200',
            data:game
        })
    }else {
        res.send({
            code:'400',
            msg:"信息错误"
        })
    }


}

export const searchGame = async (req, res) => {
    const { gamename } = req.query;
    const game = await gameDao.searchGame(gamename);
    if(game.length===0){
        res.send({
            code:'400',
            msg:'暂无这款游戏'
        })
    }

    if(game.length >= 1){
        res.send({
            code:'200',
            data:game
        })
    }

}

export const AddGame = async (req, res) => {
    const {gamename, game_category,price,description,score} = req.body;
    const coverImageUrl = 'https://fangzhengyuan.oss-cn-beijing.aliyuncs.com/image/image/4.png'
    const result = await gameDao.AddGame(gamename,game_category,price,coverImageUrl,description,score);
    if(result.length!==0){
        res.send({
            code:'200',
            msg:'添加成功'
        })
    }else{
        res.send({
            code:'400',
            data:'err'
        })
    }
}

export const DeleteGame = async (req, res) => {
    const {game_id} = req.query;
    const result = await gameDao.DeleteGame(game_id);
    console.log(result);
    if(result.length === 0){
        res.send({
            code:'400',
            data:'删除失败'
        })
    }else {
        res.send({
            code:'200',
            data:'删除成功'

        })
    }
}



