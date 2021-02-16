/*
 * @Descripttion: 
 * @version: 1.0
 * @Author: yuhui
 * @Date: 2019-12-30 23:37:55
 * @LastEditors: yuhui
 * @LastEditTime: 2020-02-29 23:03:09
 */
const mysql = require('mysql');
//引入mysql数据库的基本配置
const {MYSQL_CONF} = require('../conf/db');


//第二步，连接数据库，解决mysql的8小时连接机制
function handleDisconnection() {
  //第一步，创建连接对象
  const connection = mysql.createConnection(MYSQL_CONF);
  connection.connect(function(err) {
    if(err) {
      setTimeout('handleDisconnection()', 2000);
    }
  });

  connection.on('error', function(err) {
    let myDate = new Date();
    let mytime=myDate.toLocaleTimeString();     //获取当前时间    
    console.error(mytime,': db error执行重连:'+err.message);
    handleDisconnection();
 });
 
  return connection;
}

//第三步，将mysql语句进行封装,到时候会直接调用该函数去执行mysql语句就行了
const exec = (sql) => {
  let con = handleDisconnection();
  const promise = new Promise((resolve, reject) => {
    con.query(sql,(err,result)=>{
      if(err){
        reject(err);
        return;
      }
      resolve(result);
    })
  });

  return promise;
}

//第四步，导出封装函数
module.exports = {
  exec,
  escape:mysql.escape
}

// productCode LIKE '%$_20%' ESCAPE '$';意思是：模式%$_20%匹配包含_20字符串的任何字符串。