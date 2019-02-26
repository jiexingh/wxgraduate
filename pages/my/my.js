// pages/my/my.js
import {
  Common
} from '../../model/common.js';
import {
  HTTP
} from '../../model/http-p.js';
const commons = new Common();
const httppModel = new HTTP();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    authorized: false,
    userInfo: null,
    aboutText: '本小程序由JXH编写的毕业项目，模拟农家乐预定的相关业务，仅仅可用于参考\n若要使用此小程序与开发相关小程序\n那抓紧联系我呦~~~',
    phoneNumber: '15396618131',
    showMask: false,
    // 订单数量
    finishNum: 5,
    localNum: 6,
    img: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.userAuthorized();
    wx.getSavedFileList({
      success(res) {
        console.log(res.fileList)
      }
    })

  },


  //  用户授权
  userAuthorized() {
    wx: wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            withCredentials: true,
            lang: '',
            success: (res) => {
              console.log(res);
              this.setData({
                authorized: true,
                userInfo: res.userInfo
              });
            },
            fail: function(res) {},
            complete: function(res) {},
          })
        }
      },
      fail: (res) => {},
      complete: function(res) {},
    })
  },

  // 获取用户信息
  getUserInfo(event) {
    const userInfo = event.detail.userInfo;
    if (userInfo) {
      console.log(userInfo);
      this.setData({
        userInfo,
        authorized: true,
      });
      // 请求token 接口 
      // 获取用户的信息之后可以发送到后台服务器
      this._UserInfoToServer(userInfo);
    }
  },

  //  发送用户信息到服务器  首先调用下载
  _UserInfoToServer(userInfo) {
    let avatarUrl = userInfo.avatarUrl;
    // 用户信息
    let uploadUserInfo = {
      nickName: userInfo.nickName,
      country: userInfo.country,
      province: userInfo.province,
      city: userInfo.city,
      gender: userInfo.gender,
    }
    console.log(avatarUrl)
    console.log(uploadUserInfo);
    console.log('现在可以调用请求发送用户信息了');
    var uploadavatarUrl = '';
    httppModel.downLoad(avatarUrl)
      .then((res) => {
        let _this=this;
        console.log(res.tempFilePath);
        wx.saveFile({
          tempFilePath: res.tempFilePath,
          success(res) {
            _this.setData({
              savedFilePath: res.tempFilePath
            });
            uploadavatarUrl = res.savedFilePath;
          }
        })
        console.log(uploadavatarUrl);
        this.setData({
          img: res.tempFilePath
        });
      })
  },

  // 关于我
  aboutTap() {
    console.log('about');
    this.setData({
      showMask: true
    })
  },

  // 关于我遮罩点击 隐藏
  maskTap() {
    this.setData({
      showMask: false
    })
  },

  // 联系我
  connectionTap() {
    commons._showModel('温馨提示', '需要联系开发者？', '联系', () => {
      wx.makePhoneCall({
        phoneNumber: this.data.phoneNumber,
      })
    }, () => {});
  },

  // 控制项点击
  controlItemTap(event) {
    let controltext = commons.getDataSet(event, 'controltext');
    wx.navigateTo({
      url: `../order-detail/order-detail?controltext=${controltext}`,
    })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})