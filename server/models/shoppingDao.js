import {query} from "../config/db.js";

export const shoppingDao ={
    shopping : async (username,newBalance) => {
        const sql = `UPDATE user SET balance = ? WHERE username=?`;
        return await query(sql, [newBalance, username]);
    }
}