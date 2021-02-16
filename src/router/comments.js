/*
 * @Descripttion: [业务逻辑层] 获取博客数据
 * @version: 1.0
 * @Author: yuhui
 * @Date: 2019-12-31 23:13:56
 * @LastEditors: yuhui
 * @LastEditTime: 2020-05-16 13:52:35
 */

 const {successModel,errorModel} = require('../model/model');
 const { 
  getAllComments,
  deleteComment,
  writeComment,
  likeIconClick
 } = require('../controller/comments');

 //和博客相关的路由
 const commentRouter = (req,res)=>{
   let method = req.method; //获取请求类型GET or POST or...
   req.path = req.path.split('?')[0];

   //获取某一个详情页面的评论
   if(method === 'GET' && req.path === '/api/blog/getComments'){
     const {blogId} = req.query;
     const commentListsResult = getAllComments(blogId);
     return commentListsResult.then(lists=>{
       return new successModel(lists);
     }) 
   }

    //删除某一条评论
    if(method === 'POST' && req.path === '/api/deleteComment'){
      const {username,createtime} = req.body; 
      const deleteCommentRes = deleteComment(username,createtime);
      return deleteCommentRes.then(lists=>{
        return new successModel(lists);
      }) 
    }

    //写条评论
    if(method === 'POST' && req.path === '/api/writeComment'){
      const {username,commentContext,createTime,iconUrl,blogId} = req.body; 
      // console.log(username,email,website,commentContext)
      const writeCommentRes = writeComment(username,commentContext,createTime,iconUrl,blogId);
      return writeCommentRes.then(lists=>{
        return new successModel(lists);
      }) 
    }

    //评论的点赞操作
    if(method === 'POST' && req.path === '/api/clickLikeIcon'){
      const {username,createtime,likeStatus} = req.body; 
      const clickLikeIconRes = likeIconClick(username,createtime,likeStatus);
      return clickLikeIconRes.then(lists=>{
        return new successModel(lists);
      }) 
    }
    
 }
 
 module.exports = {commentRouter};