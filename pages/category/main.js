// pages/category/main.js
import api from "../../utils/api"
Page({

    /**
     * 页面的初始数据
     */
    data: {
        rpxHeight: null,
        rpxWidth: null,
        content: [],
        tabbarActive: [],
        num: 0
    },
    switchContent(e){
        this.setData({
            num: e.target.dataset.index
        })
    },
    swiperChange(e){
        this.setData({
            num: e.detail.current
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // 设置页面标题
        wx.setNavigationBarTitle({
            title: "分类"
        })
        let that = this;
        // 请求数据
        if(wx.getStorageSync("categories")){
            this.setData({
                content: wx.getStorageSync("categories")
            })
        }else{
            api.getDataFn({
                url: "/api/public/v1/categories ",
                success(res){
                    that.setData({
                        content: res
                    })
                    wx.setStorageSync("categories",res)
                }
            })
        };
        
        // 获取页面宽高
        wx.getSystemInfo({
            success: function(res){
                let clientHeight = res.windowHeight;
                let clientWidth = res.windowWidth;
                let ratio = 750 / clientWidth;
                let rpxHeight = clientHeight * ratio;
                let rpxWidth = clientWidth *ratio;
                that.setData({
                    rpxHeight: rpxHeight,
                    rpxWidth: rpxWidth
                })
            }
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
        this.onLoad();
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