/*
 * @Descripttion: [业务逻辑层] 获取博客数据
 * @version: 1.0
 * @Author: yuhui
 * @Date: 2019-12-31 23:13:56
 * @LastEditors: yuhui
 * @LastEditTime: 2020-06-12 23:41:12
 */

 const {successModel,errorModel} = require('../model/model');
 const { 
   getAllBlogs,
   uploadBlog,
   getBlogsLists,
   deleteBlog,
   getBlogContent,
   manageBlogData,
   updateBlog,
   getVisitedNumber,
   judgeTodayDate,
   setBlogVisited
 } = require('../controller/blog');

 const {
  blogPic,
  changeImgUrl
 } = require('../model/image')

 //和博客相关的路由
 const blogRouter = (req,res)=>{
   let method = req.method; //获取请求类型GET or POST or...
   req.path = req.path.split('?')[0];

   //首页获取全部博客
   if(method === 'GET' && req.path === '/api/blog/lists'){
     const blogListsResult = getAllBlogs();
     return blogListsResult.then(lists=>{
       return new successModel(lists);
     }) 
   }

    //获取某一篇博客全部内容
    if(method === 'GET' && req.path === '/api/blog/getBlogContent'){
      const {blogId} = req.query;
      const blogContent = getBlogContent(blogId);
      return blogContent.then(lists=>{
        return new successModel(lists);
      }) 
    }

    //上传博客
    if(method === 'POST' && req.path === '/manage/uploadBlog'){

      let myDate = Date.now();
      let {blogTitle,blogPicUrl,blogHtml,blogRecommend,blogMusicUrl} = req.body;

      if(blogHtml.length>20000){
        let ans = blogPic('yuhui',myDate,blogHtml);    //博客文章的图片保存到本地
        
        if(ans.length>0) {
          blogHtml = changeImgUrl(blogHtml,'yuhui',myDate,ans);//整理过后的的博客文章代码
        }
      }

      const uploadResult = uploadBlog(blogTitle,blogPicUrl,blogHtml,blogRecommend,blogMusicUrl,myDate);
      return uploadResult.then(uploadRes=>{
        return new successModel(uploadRes);
      }) 
    }

    //后台更新博客
    if(method === 'POST' && req.path === '/manage/updateBlog'){
      let {blogTitle,blogPicUrl,blogHtml,blogRecommend,blogMusicUrl,blogId,createtime} = req.body;

      if(blogHtml.length>20000){
        let ans = blogPic('yuhui',createtime,blogHtml);    //博客文章的图片保存到本地
        
        if(ans.length>0) {
          blogHtml = changeImgUrl(blogHtml,'yuhui',createtime,ans);//整理过后的的博客文章代码
        }
      }
      console.log('blogTitle,blogPicUrl,blogHtml,blogRecommend,blogMusicUrl,blogId:',blogTitle,blogPicUrl,blogHtml,blogRecommend,blogMusicUrl,blogId);
      const updateResult = updateBlog(blogTitle,blogPicUrl,blogHtml,blogRecommend,blogMusicUrl,blogId);
      return updateResult.then(updateRes=>{
        return new successModel(updateRes);
      }) 
    }

    //后台获取某一篇博客的数据
    if(method === 'GET' && req.path === '/manage/getBlogDataAgain'){
      const {timeStamp} = req.query;
      const getBlog = manageBlogData(timeStamp)
      return getBlog.then(lists=>{
        return new successModel(lists);
      }) 
    }

    //后台获取博客列表列表数据
    if(method === 'GET' && req.path === '/manage/getBlogLists'){
      const blogListsRes = getBlogsLists();
      return blogListsRes.then(lists=>{
        return new successModel(lists);
      }) 
    }

    //删除某一条博客
    if(method === 'POST' && req.path === '/manage/deleteBlog'){
      const {blogId,createTime} = req.body;
      const deleteBlogRes = deleteBlog(blogId,createTime);
      return deleteBlogRes.then(lists=>{
        return new successModel(lists);
        //删除某一条博客之后，应该把该博客对应的评论也删除掉
      }) 
    }

    //后台获取某一篇博客的数据
    if(method === 'POST' && req.path === '/manage/picture'){
      const {dat} = req.body;
    }

    // 获取博客访问数据
    if(method === 'GET' && req.path === '/api/blog/getBlogVisited'){
      const getVisited = getVisitedNumber(); 
      return getVisited.then(number=>{
        return new successModel(number)
      })
    }

    // 更新博客访问数据
    if(method === "POST" && req.path === "/api/blog/setBlogVisited") {
      const { today } = req.body;
      const judgeToday = judgeTodayDate(today);
      return judgeToday.then(flag=>{
        return setBlogVisited(flag,today);
      }).then(ans=>ans)
    }
 }
 
 module.exports = {blogRouter};