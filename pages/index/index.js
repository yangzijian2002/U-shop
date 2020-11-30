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
  getUserIn(){
    api.userInfo()
    wx.getUserInfo({
      success: res => {
         this.setData({
           userInfo: res.userInfo
         })
         wx.setStorageSync('userInfo', res.userInfo)
      },
      fail: err => {
        console.log(err);
      }
    })
  },
  onLoad: function () {
    let that = this;
    // 轮播图
    if(wx.getStorageSync('indexSwiperImage')){
      this.setData({
        swiperImg: wx.getStorageSync('indexSwiperImage')
      })
    }else{
      api.request({url: "/api/public/v1/home/swiperdata",method: "GET"})
      .then(res => {
        that.setData({
          swiperImg: res
        })
        wx.setStorageSync("indexSwiperImage", res)
      })
    }
    // 分类列表
    if(wx.getStorageSync('indexCatitems')){
      this.setData({
        catitems: wx.getStorageSync('indexCatitems')
      })
    }else{
      api.request({url: "/api/public/v1/home/catitems",method: "GET"})
      .then(res => {
        that.setData({
          catitems: res
        })
        wx.setStorageSync("indexCatitems",res)
      })
    }
    // 楼层
    if(wx.getStorageSync('indexFloor')){
      this.setData({
        floor: wx.getStorageSync('indexFloor')
      })
    }else{
      api.request({url: "/api/public/v1/home/floordata",method: "GET"})
      .then(res => {
        that.setData({
          floor: res
        })
        wx.setStorageSync("indexFloor",res)
      })
    }
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.onLoad();
  }
})
