/*
 * @Descripttion: controller.js [数据层]
 * @version: 1.0
 * @Author: yuhui
 * @Date: 2019-12-31 22:53:43
 * @LastEditors  : yuhui
 * @LastEditTime : 2020-02-11 21:50:38
 */

const {exec} = require('../db/mysql');

//  获取全部博客
const verifyLogin = (account,password)=>{
  let sql = `select id from admin where adminAccount='${account}' and adminPassword='${password}'`;
  return exec(sql).then(item=>{
    return item;
  })
}

module.exports = {
  verifyLogin,
}