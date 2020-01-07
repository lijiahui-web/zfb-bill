//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    userId: null,
    hasUserInfo: false,
    hasShaerId: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function (options) {
    console.log(options);
    if (options.userId) {
      console.log(options.userId);
      this.setData({
        hasShaerId: true,
        userId: options.userId
      })
    } else {
      this.setData({
        hasShaerId: false,
        userId: null
      })
    }
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    if (e.detail.userInfo) {
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
      wx.redirectTo({
        url: '../yearlist/yearlist?userId=' + e.detail.userInfo.nickName
      })
    } else {
      wx.showToast({
        title: '授权失败',
        icon: 'none'
      })
    }
  },
  goYearList: function() {
    wx.redirectTo({
      url: '../yearlist/yearlist?userId=' + this.data.userId
    })
  }
})
