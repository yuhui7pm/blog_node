/*
 * @Descripttion: 
 * @version: 1.0
 * @Author: yuhui
 * @Date: 2020-03-08 14:25:59
 * @LastEditors: yuhui
 * @LastEditTime: 2020-06-13 00:01:02
 */

var fs = require('fs'); // 引入fs模块
var num = 0;
var prefix = [];

//删除文件以及文件夹
function delPath(path){
    if(!fs.existsSync(path)){
        return false;
    }
    var info=fs.statSync(path);
    if(info.isDirectory()){//目录
        var data=fs.readdirSync(path);
        if(data.length>0){
            for (var i = 0; i < data.length; i++) {
                delPath(`${path}/${data[i]}`); //使用递归
                if(i==data.length-1){ //删了目录里的内容就删掉这个目录
                    delPath(`${path}`);
                }
            }
            return true
        }else{
            fs.rmdirSync(path);//删除空目录
            return false;
        }
    }else if(info.isFile()){
        fs.unlinkSync(path);//删除文件
        return false;
    }
}

//2.将博客内容图片base64格式转换为正常的图片，并保存在本地
const blogPic = (author,createtime,sHTML)=>{
    // <p><img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEBLAEsAAD/2wBDAAgGBg
    var picArr = sHTML.match(/data:image\/(\S*) style/g); 
    let documentUrl = '/blogPic/'+author+'_'+createtime;
    //存在就删除文件夹
    
    const status = delPath(documentUrl);
    //删除完文件夹之后就重新创建文件夹存放图片
    
    if(!status){
      fs.mkdirSync(documentUrl);
    }

    picArr.forEach((e,index) => {
      let pre = e.split(';base64,')[0].split(':image/')[1];//图片后缀
      let picUrl = e.split(';base64,')[1].split(' style')[0];
      var contextPic = new Buffer(picUrl, 'base64'); // 解码图片,被弃用，暂时找不到好的方法

      fs.writeFileSync(documentUrl+'/'+index+"."+pre, contextPic);
      prefix.push(pre)
   });
   return prefix;
}

//3.修改前端传递过来的文本，将img标签的src改为本地的url
const changeImgUrl = (sHTML,author,createtime,prefixName)=>{
  let documentUrl = '/blogPic/'+author+'_'+createtime+'/';
  var newContent= sHTML.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/gi,function(match,capture){
      num ++;
      match = match.replace(capture,documentUrl+(num-1)+"."+ prefixName[num-1]);
      return match;
  });
  num = 0;
  return newContent;
}

module.exports = {blogPic,changeImgUrl};
