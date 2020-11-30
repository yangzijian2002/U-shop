import api from "../../utils/api"
// pages/goods_detail/main.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        dataList: [],
        pages: 1,
        lock: true,
        cid: null,
        max: null
    },
    // 跳转到详情页
    jump(e){
        wx.navigateTo({
          url: '/pages/detail/index?id=' + e.currentTarget.dataset.id,
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        
      // 设置页面标题
        wx.setNavigationBarTitle({
            title: "商品列表"
        })
        // 分类id
        let cid = null;
        if(options.id){
            cid = options.id;
            wx.setStorageSync('cid', cid);
        }else{
            cid = wx.getStorageSync('cid');
        }
        this.setData({cid: cid})
        // 请求数据
        api.request({
            url: "/api/public/v1/goods/search?cid="+ cid + "&pagenum=1&pagesize=10",
            method: "GET"
        })
        .then(res => {
            let max = Math.ceil(res.data.message.total / 10);
            this.setData({
                dataList: res.data.message.goods,
                max: max
            })
        })
        wx.showToast({
            title: '加载中',
            icon: 'loading',
            duration: 2800
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

        let num = this.data.pages;
        if(num <= this.data.max-1){
            num++;
            this.setData({
                pages: num
            })
            let arr = [];
            api.request({
                url: "/api/public/v1/goods/search?cid=" + this.data.cid + "&pagenum=" + num + "&pagesize=10",
                method: "GET"
            })
            .then(res => {
                arr = this.data.dataList.concat(res.data.message.goods);
                this.setData({
                    dataList: arr
                })
            })
            wx.showToast({
                title: '加载中',
                icon: 'loading',
                duration: 2800
            })
            
        }else{
            this.setData({
                lock: false
            })
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})