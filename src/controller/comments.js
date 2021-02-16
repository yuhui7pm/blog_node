/*
 * @Descripttion: controller.js [数据层]
 * @version: 1.0
 * @Author: yuhui
 * @Date: 2019-12-31 22:53:43
 * @LastEditors: yuhui
 * @LastEditTime: 2020-05-18 19:11:40
 */

 const {exec} = require('../db/mysql');

//  获取全部评论
const getAllComments = (blogId)=>{
  let sql = `select id,username,createtime,comments,likestar,iconurl from comments where articleId=${blogId}`;
  return exec(sql).then(item=>{
    return item;
  })
}

//  删除某一条评论
const deleteComment = (name,time)=>{
  let sql = `delete from comments where username='${name}' and createtime=${time}`;
  return exec(sql).then(item=>{
    return item;
  })
}

//写评论
const writeComment = (name,comment,createTime,iconUrl,blogId)=>{
  let sql = `insert into comments (username,createtime,comments,iconurl,articleId) 
              value ('${name}',${createTime},'${comment}','${iconUrl}',${blogId})`;
  return exec(sql).then(item=>{
    return item;
  })
}

// 对某一条评论数据进行点赞操作
const likeIconClick = (username,createTime,likeStatus)=>{
  // console.log(username,createTime,likeStatus);
  let sql;
  if(likeStatus===true){
    sql = `update comments set likestar=likestar+1 where username = '${username}' and createtime = ${createTime}`
  }else{
    sql = `update comments set likestar=likestar-1 where username = '${username}' and createtime = ${createTime}`
  }

  return exec(sql).then(item=>{
    return item;
  })
}

module.exports = {
  getAllComments,
  deleteComment,
  writeComment,
  likeIconClick
}