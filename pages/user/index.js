// 获取实例
const app = getApp()
// pages/user/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: null,
        hasUserInfo: null
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.login({
            success (res) {
              if (res.code) {
                //发起网络请求
                wx.request({
                  url: 'https://ugo.botue.com/api/public/v1/users/wxlogin',
                  data: {
                    code: res.code
                  }
                })
              } else {
                console.log('登录失败！' + res.errMsg)
              }
            }
          })
          
        if (app.globalData.userInfo) {
            this.setData({
              userInfo: app.globalData.userInfo,
              hasUserInfo: true
            })
            console.log(this.data.userInfo);
            console.log(this.data.hasUserInfo);
            
          } else if (this.data.canIUse){
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            app.userInfoReadyCallback = res => {
              this.setData({
                userInfo: res.userInfo,
                hasUserInfo: true
              })
              console.log(this.data.userInfo);
              console.log(this.data.hasUserInfo);
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
            console.log(this.data.userInfo);
            console.log(this.data.hasUserInfo);
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
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})