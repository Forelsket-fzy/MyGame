import {query} from "../config/db.js";

export const userDao = {
    FindUserName: async (username) => {
        const sql = "SELECT * FROM user WHERE username = ?";
        return await query(sql, [username]);
    },

    Register: async (username, password, email) => {
        const sql = "INSERT INTO user (username, password, avater, balance, create_time, status, email) VALUES (?, ?, NULL, 0, now(),0,?)";
        return await query(sql, [username, password, email]);
    },

    UpdateUser:async (user_id,username, password, avater, email) => {
        const sql = "UPDATE user SET avater = ?, username = ?, password = ?, email = ? WHERE user_id = ?";
        return await query(sql, [avater,username, password, email,user_id]);
    },

    GetAllUsers: async () => {
      return await query("select * from user");
    },


    DeleteUser: async (username) => {
      const sql = "DELETE FROM user WHERE username = ?";
      return await query(sql, [username]);
    },

    AddUser: async (username, password, avater, email, balance) => {
        const sql = "INSERT INTO user (username, password, avater, balance, create_time, status, email) VALUES (?, ?, ?, ?, now(),0,?)";
        return await query(sql, [username, password, avater, balance, email]);
    },

    UpdateUserInfo: async (user_id,status) => {
        const sql = 'UPDATE user SET status = ? WHERE user_id = ?';
        return await query(sql, [status, user_id]);
    }
};