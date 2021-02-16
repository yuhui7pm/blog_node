/*
 * @Descripttion: 对账号密码进行加密
 * @version: 1.0
 * @Author: yuhui
 * @Date: 2020-02-12 11:36:02
 * @LastEditors  : yuhui
 * @LastEditTime : 2020-02-12 11:49:24
 */

let crypto = require('crypto');

// function getRandomSalt(){
//     return Math.random().toString().slice(2, 5);
// }

function cryptPwd(password, salt) {
    // 密码“加盐”
    let saltPassword = password + ':' + salt;
    // console.log('原始密码：%s', password);
    // console.log('加盐后的密码：%s', saltPassword);

    // 加盐密码的md5值
    let md5 = crypto.createHash('md5');
    let result = md5.update(saltPassword).digest('hex');
    // console.log('加盐密码的md5值：%s', result);
    return result
}

module.exports = {
  cryptPwd
}
// 16fcbbef96da895444392d763527937a
// e9e0cb7d82f6191cdd1e1a69ed22b53d