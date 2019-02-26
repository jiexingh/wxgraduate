// 基础类 请求类 封装微信的http请求与上传 相关
import {
  config
} from 'config.js';

// 根据错误码提示
const tips = {
  1: '抱歉 出错了 ',
}

class HTTP {
  request(params) {
    if (!params.method) {
      params.method = "GET";
    }
    wx.request({
      url: config.api_base_url + params.url,
      data: params.data,
      header: {
        'content-type': 'application/json',
        'token': wx.getStorageSync('token'),
      },
      method: params.method,
      dataType: 'json',
      responseType: 'text',
      success: (res) => {
        // code是一个数字 要转成字符串
        let code = res.statusCode.toString();
        if (code.startsWith('2')) {
          // 首先判断是否为空为空就不执行后面的
          params.success && params.success(res.data);
        } else {
          let error_code = res.data.error_code
          this._showError(error_code);
        }

      },
      fail: function(res) {
        this._showError(1);
      },
      complete: function(res) {},
    });
  }

  // 提示错误
  _showError(error_code) {
    if (!error_code) {
      error_code = 1;
    }
    const tip = tips[error_code];
    wx.showToast({
      title: tip ? tip : tips[1],
      icon: 'none',
      duration: 2000,
    })
  }
}
export {
  HTTP
};