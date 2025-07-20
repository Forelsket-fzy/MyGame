import { userDao } from '../models/userDao.js';
import {JWT} from "../config/JWT.js";

export const Login = async (req, res) => {
    const { username, password } = req.body;
    const user = await userDao.FindUserName(username)
    if (user.length === 0) {
        res.send({
            code: "400",
            msg: "用户不存在"
        })
    }
    if (user.length >=1 ) {
        if(username===user[0].username && password===user[0].password){
            const token = await JWT(username,user[0].user_id)
            res.send({
                code: "200",
                msg:"登陆成功",
                token:token
            })
        }else {
            res.send({
                code: "400",
                msg:"用户名密码错误"
            })
        }
    }
};

export const Register = async (req, res) => {
    const { username, password ,email} = req.body;
    const find = await userDao.FindUserName(username)
    if(find.length !== 0) {
        res.send({
            code: "400",
            msg:'用户已存在'
        })
    }else{
        await userDao.Register(username, password, email);
            res.send({
                code: "200",
                msg:"注册成功"
            })
    }
};

export const GetUserInfo = async (req, res) => {
    const  username  = req.user.username;
    const user = await userDao.FindUserName(username)
    if(user.length !== 0) {
        res.send({
            code: "200",
            data:user
        })
    }
};

export const LoginByAdmin = async (req, res) => {
    const { username, password } = req.body;
    const user = await userDao.FindUserName(username);
    if (user.length === 0) {
        res.send({
            code: "400",
            msg: "用户不存在"
        })
    }
    if (user.length >=1 ) {
        if(username===user[0].username && password===user[0].password){
            if(user[0].status===1) {
                res.send({
                    code: "200",
                    msg: "登陆成功",
                    status: user[0].status,
                })
            }else {
                res.send({
                    code: "400",
                    msg:'该账号没有管理员资格'
                })
            }
        }else {
            res.send({
                code: "400",
                msg:"用户名密码错误"
            })
        }
    }
};

export const GetAllUser = async (req, res) => {
    const user = await userDao.GetAllUsers();
    res.send({
        code: "200",
        data:user
    })
};

export const UpdateUser = async (req, res) => {
    const user_id = req.user.user_id
    const { username, password, avater, email} = req.body;
    const user = await userDao.UpdateUser(user_id,username, password, avater, email);
    if(user.length !== 0) {
        res.send({
            code: "200",
            msg:"修改成功"
        })
    }else{
        res.send({
            code: "400",
            msg:"修改失败"
        })
    }
};

export const DeleteUser = async (req, res) => {
    const {username} = req.query;
        await userDao.DeleteUser(username);
    res.send({
        code: "200",
        msg:"删除成功"
    })
};

export const AddUser = async (req, res) => {
    const {username, password, avater, balance, status ,email} = req.body;
    const result = await userDao.AddUser(username, password, avater, email, balance, status);
    if(result.length !== 0) {
        res.send({
            code: "200",
            msg:'添加成功'
        })
    }
}

export const UpdateUserInfo = async (req, res) => {
    const {user_id,status} = req.body;
    if(status===0){
        const result = await userDao.UpdateUserInfo(user_id,1);
        if(result){
            res.send({
                code: "200",
                msg:'更改成功'
            })
        }else {
            res.send({
                code: "400",
            })
        }
    }else {
        const result = await userDao.UpdateUserInfo(user_id,0);
        if(result){
            res.send({
                code: "200",
                msg:'更改成功'
            })
        }else {
            res.send({
                code: "400",
            })
        }
    }

}

