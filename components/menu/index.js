// components/menu/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    selected: false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    menuTap(event) {
      let selected = !this.data.selected;
      console.log(event);
      this.setData({
        selected: selected
      })
      this.triggerEvent('menuTap', {
        selected: selected
      });
    }
  }
})