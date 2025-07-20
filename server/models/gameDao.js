import {query} from "../config/db.js";

export const gameDao = {
    gameInfo:  async () => {
        //const sql = "SELECT * FROM game,category WHERE game.game_category=category.category_id";
        const sql = "SELECT * FROM game";
        return await query(sql);
    },

    Slideshow: async () => {
        const sql = "SELECT * FROM game WHERE isshow=1";
        return await query(sql);
    },
    searchGame: async (gamename) => {
        const sql = "SELECT * FROM game WHERE game_name=?";
        return await query(sql, gamename);
    },

    gameCategory: async (category_id) => {
        const sql = "SELECT * FROM game WHERE game_category=?";
        return await query(sql, [category_id]);
    },

    AddGame: async (gamename,game_category,price,cover_image,description,score) => {
        const sql = "INSERT INTO game(game_name,game_category,price,cover_image,description,release_date,isshow,score) VALUES (?,?,?,?,?,now(),0,?)";
        return await query(sql, [gamename,game_category,price,cover_image,description,score]);
    },

    DeleteGame: async (game_id) => {
        const sql = "DELETE FROM game WHERE game_id=?";
        return await query(sql, [game_id]);
    },

    MyGame: async (user_id) => {
        const sql = "SELECT g.* FROM game AS g JOIN gamelove AS gl ON g.game_id = gl.game_id WHERE gl.user_id = ?";
        return await query(sql, [user_id]);
    },

    GameTop:async () => {
        const sql = "SELECT * FROM game ORDER BY score DESC";
        return await query(sql);
    }
}