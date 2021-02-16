/*
 * @Descripttion: 系统架构设计的四层抽象：1.启动后台服务器
 * @version: 1.0
 * @Author: yuhui
 * @Date: 2019-07-23 14:33:12
 * @LastEditors  : yuhui
 * @LastEditTime : 2020-01-01 12:06:50
 */

const http = require('http');
const PORT = 3001;
const serverHandler = require('../app');
// 创建一个HTTP服务器，并将 requestListener 作为 request 事件的监听函数。
const server = http.createServer(serverHandler);
server.listen(PORT);//监听8004端口