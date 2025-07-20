import express from 'express';
import path from 'path';
import router from './routes/index.js';
import ejs from 'ejs';
import {config} from './config/default.js';
import expressJWT from 'express-jwt';

import cors  from 'cors';
const app = express();

//获取静态路径
//app.use(express.static(__dirname + '/public'));
const corsOptions = {
    origin: 'http://localhost:8080',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization', // 允许 Authorization 请求头
    credentials: true
};


app.use(cors(corsOptions));
//跨域问题
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // 允许所有来源的请求
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.engine('html',ejs.__express);

//前端数据
app.use(express.json());
app.use(express.urlencoded({extended: true}));
//JWT令牌
app.use(expressJWT({secret: config.secretKey,algorithms: ["HS256"],}).unless({ path: [/^\/game/, /^\/admin/, /^\/users\/login/, /^\/users\/register/]}));
//路由
app.use('/',router);

app.listen(config.port,()=>{
    console.log("Server is running on port " + config.port);
});