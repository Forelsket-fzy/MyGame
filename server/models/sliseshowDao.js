import {query} from "../config/db.js";

export const slideDao = {
    updateslide:async (game_id,isshow)=>{
        const sql = `UPDATE game SET isshow=? WHERE game_id=?`;
        await query(sql,[isshow,game_id])
    }
    
}