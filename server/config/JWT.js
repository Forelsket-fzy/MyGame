import jwt from 'jsonwebtoken'
import {config} from './default.js'

export async function JWT(username,user_id) {
    return jwt.sign({username: username,user_id: user_id}, config.secretKey, {expiresIn: '10h'});
}