import { myGameDao } from '../models/myGameDao.js';

export const AddMyGame = async (req, res) => {
    const user_id = req.user.user_id;
    const {game_id} = req.query;
    const result = await myGameDao.AddMyGame(user_id, game_id);
    if (result.length !== 0) {
        res.send({
            code: "200",
            msg: "添加成功",
        })
    } else {
        res.send({
            code: "400",
            msg: '添加失败'
        })
    }
}

export const DeleteMyGame = async (req, res) => {
    const user_id = req.user.user_id;
    const {game_id} = req.query;
    const result = await myGameDao.DeleteMyGame(user_id, game_id);
    if (result.length !== 0) {
        res.send({
            code: "200",
            msg:'删除成功'
        })
    }else {
        res.send({
            code: "400",
            data:"error"
        })
    }
}