/*
 * @Descripttion: 
 * @version: 1.0
 * @Author: yuhui
 * @Date: 2019-12-30 23:48:39
 * @LastEditors  : yuhui
 * @LastEditTime : 2020-02-15 19:19:24
 */
//获取项目现今的运行环境
let env = process.env.NODE_ENV||'development';
//初始化mysql的基本配置
let MYSQL_CONF;

if(env === 'development'){
  MYSQL_CONF = {
    user: 'root',
    password: 'yuhui7pm',
    host: 'localhost',
    port: '3306',
    database: 'simpleblog',
    charset : 'utf8mb4'
  }
}else if(env === 'production'){
  //两次的配置应该不一样，现阶段假装一样的。
  MYSQL_CONF = {
    user: 'root',
    password: 'yuhui7pm',
    host: 'localhost',
    port: '3306',
    database: 'simpleblog'
  }
}

module.exports = {MYSQL_CONF}