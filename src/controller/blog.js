/*
 * @Descripttion: controller.js [数据层]
 * @version: 1.0
 * @Author: yuhui
 * @Date: 2019-12-31 22:53:43
 * @LastEditors: yuhui
 * @LastEditTime: 2020-06-13 09:45:47
 */

 const {exec} = require('../db/mysql');

//  获取全部博客
const getAllBlogs = ()=>{
  let sql = `select id,title,picurl,introduction,createtime from blogs order by id desc`;
  return exec(sql).then(item=>{
    return item;
  })
}

//上传博客
const uploadBlog = (blogTitle,blogPicUrl,blogHtml,blogRecommend,blogMusicUrl,createTime)=>{
  let sql = `insert into blogs (title,picurl,introduction,createtime,context,musicurl) 
              value ('${blogTitle}','${blogPicUrl}','${blogRecommend}',${createTime},'${blogHtml}','${blogMusicUrl}')`;

  return exec(sql).then(item=>{
    return item;
  })
}

//  后台获取获取博客列表数据
const getBlogsLists = ()=>{
  let sql = `select id,title,picurl,introduction,createtime,context,musicurl from blogs`;
  return exec(sql).then(item=>{
    return item;
  })
}

//删除某一条博客
const deleteBlog = (id,createtime)=>{
  // console.log(id,createtime);
  let sql = `delete from blogs where id=${id} and createtime=${createtime}`;
  return exec(sql).then(item=>{
    // console.log('删除的结果：',item);
    return item;
  })
}

//后台获取所有博客数据
const getBlogContent = (id)=>{
  let sql = `select * from blogs where id=${id}`;
  return exec(sql).then(item=>{
    return item;
  })
}

//后台获取某一篇博客的数据
const manageBlogData = (time)=>{
  let sql = `select * from blogs where createtime=${time}`;
  return exec(sql).then(item=>{
    return item;
  })
}


//后台更新某一篇博客的数据
const updateBlog = (blogTitle,blogPicUrl,blogHtml,blogRecommend,blogMusicUrl,blogId)=>{
  let sql = `update blogs set title='${blogTitle}',picurl='${blogPicUrl}',introduction='${blogRecommend}',
            context='${blogHtml}',musicurl='${blogMusicUrl}' where id=${blogId}`;
  return exec(sql).then(item=>{
    return item;
  })
}

// 获取博客访问次数
const getVisitedNumber=()=>{
  let sql = `select * from visitednumber`;
  return exec(sql).then(item=>{
    return item
  })
}

// 判断现在传过来的日期是否与数据库的日期一致
const judgeTodayDate = (today)=>{
  const sql = `select today from visitednumber`;
  return exec(sql).then(item=>{
    if(today !== item[0].today){
      return false; //日期不同，就清零
    }
    return true; //日期相同，该天所有的访问数加一
  })
}

// 更新访问博客数据
const setBlogVisited = (flag,today) =>{
  let clearData = `update visitednumber set wholeVisitedNum = wholeVisitedNum + 1,
  todayVisitedNum = 0, today = '${today}'`;

  let updateData = `update visitednumber set wholeVisitedNum = wholeVisitedNum + 1,
    todayVisitedNum = todayVisitedNum + 1, today = '${today}'`;

  //访问数目加1
  if(flag){
    return exec(updateData).then(res=>res);
  }
  //访问数目清零
  return exec(clearData).then(res=>res)
}
module.exports = {
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
}