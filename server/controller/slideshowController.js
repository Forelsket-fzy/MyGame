import { slideDao } from '../models/sliseshowDao.js';

export const updateslide = async (req, res) => {
    const {game_id,isshow} = req.body;
    console.log(game_id,isshow);
    if(isshow){
        const result = await slideDao.updateslide(game_id,0);
        console.log(result);
        if(result){
            res.send({
                code: "200",
                msg:"更新成功"
            })
        }else{
            res.send({
                code: "400",
                msg:"更新失败"
            })
        }
    }else{
        const result = await slideDao.updateslide(game_id,1);
        if(result){
            res.send({
                code: "200",
                msg:"更新成功"
            })
        }else{
            res.send({
                code: "400",
                msg:"更新失败"
            })
        }
    }

};
