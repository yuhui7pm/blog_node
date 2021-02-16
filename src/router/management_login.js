/*
 * @Descripttion: 博客后台登录
 * @version: 1.0
 * @Author: yuhui
 * @Date: 2019-12-31 23:13:56
 * @LastEditors  : yuhui
 * @LastEditTime : 2020-02-12 12:10:54
 */

const {successModel,errorModel} = require('../model/model');
const {cryptPwd} = require('../db/encryption');
const { 
  verifyLogin,
} = require('../controller/management_login');

//和博客相关的路由
const loginRouter = (req,res)=>{
  let method = req.method; //获取请求类型GET or POST or...
  req.path = req.path.split('?')[0];

  //首页获取全部博客
  if(method === 'POST' && req.path === '/manage/login'){
    const {account,password} = req.body;
    // base64解码
    accountDecode = Buffer.from(account, 'base64').toString().split(':')[1];
    passwordDecode = Buffer.from(password, 'base64').toString().split(':')[1];
    const verifyLoginResult = verifyLogin(cryptPwd(accountDecode,'account'),cryptPwd(passwordDecode,'password'));
    return verifyLoginResult.then(resData=>{
      if(resData.length===0){
        return new errorModel('管理员账号密码错误');
      }
    }) 
  }
}

module.exports = {loginRouter};