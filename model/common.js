// 本js用于封装一些公共的使用函数
class Common {
  // 模态提示 第一个函数 是确定之后所做 第二个是取消
  _showModel(title = '提示', content = '这是一个模态弹窗', confirmText = '确定', confirmFun, canacelFun) {
    wx.showModal({
      title: title,
      content: content,
      confirmText: confirmText,
      confirmColor: '#36b9af',
      success(res) {
        if (res.confirm) {
          confirmFun && confirmFun();
        } else if (res.cancel) {
          canacelFun && canacelFun();
        }
      }
    })
  }

  // 获取元素上的绑定值
  getDataSet(event, key) {
    return event.currentTarget.dataset[key];
  }

}
export {
  Common
}