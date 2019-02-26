// pages/book/book.js
import {
  BookModel
} from '../../model/book.js';
const bookModel = new BookModel();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    submintText: '',
  },

  // 点菜栏
  menuTap() {
    console.log('去点菜');
    wx.navigateTo({
      url: '../menu/menu',
    })
  },
  // inputTap(event) {
  //   let text = event.detail.value;
  //   console.log(text);
  //   this.setData({
  //     submintText: text
  //   });
  // },
  // 提交
  submitTap() {
    let params = {
      text: this.data.submintText
    }
    console.log(params);
    bookModel.takeBook(params)
      .then((res) => {
        console.log(res);
      })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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