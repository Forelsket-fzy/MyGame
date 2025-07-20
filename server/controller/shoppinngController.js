import {shoppingDao} from '../models/shoppingDao.js'
import {userDao} from '../models/userDao.js'
import {gameDao} from "../models/gameDao.js";
import {orderDao} from "../models/orderDao.js";

export const shopping = async (req, res) => {
    const {username, gamename} = req.body;
    const user = await userDao.FindUserName(username);
    const game = await gameDao.searchGame(gamename);
    if(user[0].balance > game[0].price){
        await orderDao.AddOrder(user[0].user_id, game[0].game_id,1);
        const newBalance = user[0].balance - game[0].price;
        const result = await shoppingDao.shopping(username, newBalance);
        if(result.length !== 0){
            res.send({
                code:200,
                msg:"购买成功"
            })
        }
    }else{
        res.send({
            code:400,
            msg:"购买失败，余额不足"
        })
    }
}
