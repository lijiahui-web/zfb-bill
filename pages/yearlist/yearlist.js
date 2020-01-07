//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    userId: null,
    userText: '',
    currentTime: ''
  },
  onLoad: function (options) {
    console.log(options);
    if (options.userId) {
      console.log(options.userId);
      this.setData({
        userId: options.userId,
        userText: 'id为' + options.userId + '用户'
      })
    }
    var value = util.formatTime(new Date())
    this.setData({
      currentTime: value
    })
  },
  onShareAppMessage: function() {
    const userId = this.data.userId;
    console.log(this.data)
    return {
      title: "我是标题" + userId,
      path: "pages/index/index?userId=" + userId
    }
  }
})
