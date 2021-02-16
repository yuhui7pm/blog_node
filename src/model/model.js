/*
 * @Descripttion: 
 * @version: 1.0
 * @Author: yuhui
 * @Date: 2019-12-25 23:35:30
 * @LastEditors: yuhui
 * @LastEditTime: 2020-01-01 10:50:12
 */
class baseModel {
  constructor(data,message){
    //如果只传递一个参数，且第一个参数为字符串
    if(typeof data === "String"){
      this.message = data;
      message = null;
      data = null;
    }

    //否则执行下面的
    if(data){
      this.data = data;
    }

    if(message){
      this.message = message;
    }
  }
}

//成功时调用的方法
class successModel extends baseModel{
  constructor(data,message){
      super(data,message);
      this.errNum = 0;
  }
}

//失败时调用的方法
class errorModel extends baseModel{
  constructor(data,message){
      super(data,message);
      this.errNum = -1;
  }
}

module.exports = {
  successModel,
  errorModel
}