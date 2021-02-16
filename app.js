/*
 * @Descripttion: 系统架构设计的四层抽象：2.app.js [通信设置层] 初始化路由
 * @version: 1.0
 * @Author: yuhui
 * @Date: 2019-12-31 22:25:41
 * @LastEditors: yuhui
 * @LastEditTime: 2020-03-02 13:42:45
 */

 const querystring = require('querystring');
 const {blogRouter} = require('./src/router/blog');
 const {commentRouter} = require('./src/router/comments');
 const {loginRouter} = require('./src/router/management_login')

 // 使用promise来实现post的异步操作
 const getPostData = (req)=>{
  const promise = new Promise((resolve,reject)=>{
    if(req.method !== 'POST'){
      resolve({});//不满足条件就返回空
      return;
    }

    if(req.headers['content-type']!=='application/json'){
      resolve({});//不满足条件就返回空
      return;
    }

    //初始化累加的数据
    let postData = '';
    //post请求触发data事件。每当接收到请求体的数据，就累加到postData中
    req.on('data',chunk=>{
      postData += chunk.toString();
    });
    req.on('end',()=>{
      if(!postData){
        resolve({});//不满足条件就返回空
        return;
      }
      resolve(JSON.parse(postData));//解析成JSON格式数据
    })
  })
  return promise;
 }

 const serverHandler = (req,res)=>{
   //设置返回json格式的数据
   res.setHeader('Content-Type','application/json');
   //设置允许跨域的域名，*代表允许任意域名跨域
   res.setHeader("Access-Control-Allow-Origin","*");
   //允许的header类型
   res.setHeader("Access-Control-Allow-Headers","content-type");
   //跨域允许的请求方式 
   res.setHeader("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
   
   //获取path
   const url = req.url;
   req.path = url.split('?')[0];
   //获取传递过来的query，将其转变为对象的形式
   req.query = querystring.parse(url.split('?')[1]);

   //处理post请求
   getPostData(req).then(postData=>{
     req.body = postData;

     //对博客模块进行相关操作：增删改查
     const blogRes = blogRouter(req,res);
     if(blogRes){
      blogRes.then(blogData=>{
        res.end(
          JSON.stringify(blogData)
        )
      })
      return;
     }

     //获取评论数据
     const commentRes = commentRouter(req,res);
     if(commentRes){
      commentRes.then(commentData=>{
        res.end(
          JSON.stringify(commentData)
        )
      })
      return;
     }

     //后台管理登录
     const adminLoginRes = loginRouter(req,res);
     if(adminLoginRes){
      adminLoginRes.then(loginData=>{
        res.end(
          JSON.stringify(loginData)
        )
      })
      return;
     }

    //如果处理POST请求不能成功返回信息,我就输出404
    res.writeHead('404',{'Content-Type':'text/plain'});
    res.write('404 not found\n');
    res.end();//返回结果给前端
   })
 }

 module.exports = serverHandler;