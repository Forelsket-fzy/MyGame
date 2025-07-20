import {orderDao} from '../models/orderDao.js'

export const OrderInfo = async (req,res)=>{
    const user_id = req.user.user_id;
    const game = await orderDao.OrderInfo(user_id)
    if(game.length > 0){
        res.send({
            code:200,
            data:game
        })
    }else {
        res.send({
            code:400,
            msg:'此用户暂时没有订单'
        })
    }
}

export const AddOrder = async (req,res)=>{
    const user_id = req.user.user_id;
    const { game_id, amount} = req.body
    const result = await orderDao.AddOrder(user_id, game_id, amount)
    if(result.length === 0){
        res.send({
            code:400,
            msg:"添加失败"
        })
    }else{
        res.send({
            code:200,
            msg:"添加成功"
        })
    }
}

export const DeleteOrder = async (req,res)=>{
    const user_id = req.user.user_id;
    const { game_id } = req.query
    const result = await orderDao.DeleteOrder(user_id, game_id)
    if(result.length !== 0){
        res.send({
            code:200,
            msg:"删除成功"
        })
    }else{
        res.send({
            code:400,
            msg:"删除失败"
        })
    }

}