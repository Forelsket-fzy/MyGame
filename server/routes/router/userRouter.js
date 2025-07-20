import express from 'express';
import { Login, Register, GetUserInfo, LoginByAdmin, GetAllUser, UpdateUser, DeleteUser,  AddUser, UpdateUserInfo} from '../../controller/userController.js';

const router = express.Router();

router
    .post('/users/login', Login)//登录
    .post('/users/register', Register)//注册
    .get('/users/getUserInfo', GetUserInfo)//获取用户信息
    .post('/users/updateUser', UpdateUser)//更改个人信息
    .post('/admin/Login', LoginByAdmin)//管理员登录
    .get('/admin/getAllUser', GetAllUser)//获取所有用户信息
    .get('/admin/deleteUser', DeleteUser)//删除
    .post('/admin/addUser', AddUser)//增加
    .post('/admin/updateUserInfo',UpdateUserInfo)
export default router;