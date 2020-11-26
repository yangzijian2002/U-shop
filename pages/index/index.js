//引入封装好的
import api from "../../utils/api"
//获取应用实例
const app = getApp()

Page({
  data: {
    searchContent: '',
    flg: false,
    swiperImg: [],
    catitems: [],
    floor: []
  },
  searchChange(res){
    if(res.detail.value.length != 0){
      this.setData({
        flg: true
      })
    }else{
      this.setData({
        flg: false
      })
    }
  },
  onLoad: function () {
    let that = this;
    // 轮播图
    if(wx.getStorageSync('indexSwiperImage')){
      this.setData({
        swiperImg: wx.getStorageSync('indexSwiperImage')
      })
    }else{
      api.getDataFn({
        url: "/api/public/v1/home/swiperdata",
        success(res){
          that.setData({
            swiperImg: res
          })
          wx.setStorageSync("indexSwiperImage", res)
        }
      })
    }
    // 分类列表
    if(wx.getStorageSync('indexCatitems')){
      this.setData({
        catitems: wx.getStorageSync('indexCatitems')
      })
    }else{
      api.getDataFn({
        url: "/api/public/v1/home/catitems",
        success(res){
          that.setData({
            catitems: res
          })
          wx.setStorageSync("indexCatitems",res)
        }
      })
    }
    // 楼层
    if(wx.getStorageSync('indexFloor')){
      this.setData({
        floor: wx.getStorageSync('indexFloor')
      })
    }else{
      api.getDataFn({
        url: "/api/public/v1/home/floordata",
        success(res){
          that.setData({
            floor: res
          })
          wx.setStorageSync("indexFloor",res)
        }
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
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.onLoad();
  }
})
