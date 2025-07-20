import {query} from "../config/db.js";

export const myGameDao = {

    AddMyGame: async (user_id, game_id) =>{
        const sql = "INSERT INTO gamelove(user_id, game_id) VALUES (?,?)"
        return await query(sql,[user_id,game_id]);
    },

    DeleteMyGame: async (user_id, game_id) =>{
        const sql = "DELETE FROM gamelove WHERE user_id = ? AND game_id = ?";
        return await query(sql,[user_id,game_id]);
    }

}