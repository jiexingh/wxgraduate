// 预定相关的服务器请求
import {
  HTTP
} from 'http-p.js';

class BookModel extends HTTP {
  //  提交预定
  takeBook(params) {
    return this.request({
      url: 'file',
      method: 'POST',
      data: params
    })
  }

  gettest(){
    return this.request({
      url: 'file',
      method: 'GET',
      data: {
        id: 1,
      }
    })
  }
}
export {
  BookModel
}