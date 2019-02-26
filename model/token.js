// 此文件处理token相关的业务
import { config } from "config.js";

class Token {
  constructor() {
    // token的验证
    this.verifyUrl = Config.restUrl + 'token/verify';
    // token的获取
    this.tokenUrl = Config.restUrl + 'token/user';
  }
 
//  验证token
  verify() {
    let token = wx.getStorageSync('token');
    if (!token) {
      this.getTokenFromService();
    } else {
      this._verifyFromService(token);
    }
  }

  // 从服务器获取token
  getTokenFromService(callback) {
    var that = this;
    wx.login({
      success: function (res) {
        wx.request({
          url: that.tokenUrl,
          method: 'POST',
          data: {
            code: res.code
          },
          success: function (res) {
            wx.setStorageSync('token', res.data.token);
            callback && callback(res.data.token);
          }
        })
      }
    });
  }

  // 因为token在服务器中设置了过期时间 所以携带token令牌去服务器验证是否过期
  _verifyFromService(token) {
    var that = this;
    wx.request({
      url: that.verifyUrl,
      method: 'POST',
      data: {
        token: token
      },
      success: function (res) {
        var valid = res.data.isValid;
        if (!valid) {
          that.getTokenFromService();
        }
      }
    })
  }
}
export { Token };