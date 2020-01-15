//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    animationData: {},
    userId: null,
    name: null,
    address: null,
    latitude: null,
    longitude: null,
    speed: null,
    altitude: null,
    userText: '',
    currentTime: '',
    scrollindex:0,  //当前页面的索引值
    totalnum:5,  //总共页面数
    starty:0,  //开始的位置x
    endy:0, //结束的位置y
    critical: 100, //触发翻页的临界值
    margintop:0,  //滑动下拉距离
    hasPage4: true
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
  getLocation: function() {
    let that = this
    wx.getLocation({
      type: 'wgs84',
      success (res) {
        if (res.speed <= 0) {
          res.speed = 0
        }
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude,
          speed: res.speed,
          accuracy: res.accuracy
        })
      }
    })
  },
  selecteLocation: function() {
    let that = this
    wx.chooseLocation({
      latitude: '',
      longitude: '',
      success (res) {
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude,
          name: res.name,
          address: res.address
        })
      }
    })
  },
  scrollTouchstart: function(e) {
    let py = e.touches[0].pageY;
    this.setData({
      starty: py,
      endy: py
    })
  },
  scrollTouchmove: function(e) {
    let py = e.touches[0].pageY;
    let d = this.data;
    this.setData({
      endy: py,
    })
    if (py-d.starty<100 && py-d.starty>-100) {    
      this.setData({
        margintop: py - d.starty
      })
    }
  },
  scrollTouchend: function(e) {
    let d = this.data;
    if (d.endy-d.starty >100 && d.scrollindex>0) {
      this.setData({
        scrollindex: d.scrollindex-1
      })
    } else if (d.endy-d.starty <-100 && d.scrollindex<this.data.totalnum-1) {
      this.setData({
        scrollindex: d.scrollindex+1
      })
    }
    this.setData({
      starty:0,
      endy:0,
      margintop:0
    })
  },
  saveImg: function() {
    console.log(123111)
    wx.downloadFile({
      url: 'https://t7.baidu.com/it/u=1179872664,290201490&fm=79&app=86&f=JPEG?w=1280&h=854',
      success: function(res) {
        console.log(res)
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: function() {
            wx.showToast({
              title: '保存成功',
            })
          }
        })
      },
      fail: function(e) {
        console.log(e)
      }
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
