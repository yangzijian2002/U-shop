//引入封装好的
import api from "../../utils/api"
// 获取实例
const app = getApp()
// pages/user/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: null,
        hasUserInfo: false,
        orderData: [
          {img: "/images/icon/payment.png" , text: "待付款" , url: ""},
          {img: "/images/icon/receiving.png" , text: "待收货" , url: ""},
          {img: "/images/icon/refund.png" , text: "退款/退货" , url: ""},
          {img: "/images/icon/all.png" , text: "全部订单" , url: ""}
        ]
    },
    getUserIn(e){
      api.userInfo();
      wx.getUserInfo({
        success: res => {
            this.setData({
              userInfo: res.userInfo,
              hasUserInfo: true
            })
            console.log(this.data.userInfo);
            
        },
        fail: err => {
          console.log(err);
        }
      })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      // 设置页面标题
      wx.setNavigationBarTitle({
          title: "我的"
      })
      // 获取信息
      api.userInfo()
      .then(() => {
        let userInfo = wx.getStorageSync('userInfo');
        if(userInfo){
          this.setData({
            userInfo: userInfo,
            hasUserInfo: true
          })
        }else{
          this.getUserIn()
        }
      });
      
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