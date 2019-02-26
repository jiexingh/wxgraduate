// components/mask/index.js
Component({
  /**
   * 组件的属性列表
   */

  // 插槽
  options: {
    multipleSlots: true
  },
  externalClasses: ['my-class'],
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    maskTap() {
      console.log(1);
      this.triggerEvent('maskTap', {}, {})
    }
  }
})