import mysql from 'mysql';
import { config } from "./default.js";

let connection = mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database,
});

connection.connect((err) => {
    if (err) {
        console.log('连接失败');
        console.error(err);
    } else {
        console.log("连接成功");
    }
});

export async function query(sql, param) {
    return new Promise((resolve, reject) => {
        connection.query(sql, param, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}

// connection.end();查询完成后调用

