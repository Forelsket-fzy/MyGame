import {query} from "../config/db.js";

export const orderDao = {
    OrderInfo : async (user_id)=>{
        const sql = `SELECT * FROM orders,game WHERE user_id=? AND orders.game_id=game.game_id`;
        return await query(sql,[user_id])
    },

    AddOrder : async (user_id,game_id,amount)=>{
        const sql = `INSERT INTO orders(order_id,user_id, game_id, amount, status) VALUE(FLOOR(RAND() * 9000000000 + 1000000000),?,?,?,'pending')`;
        return await query(sql,[user_id,game_id,amount])
    },

    DeleteOrder : async (user_id,game_id)=>{
        const sql = `DELETE FROM orders WHERE user_id=? AND game_id=?`
        return await query(sql,[user_id,game_id])
    }
}