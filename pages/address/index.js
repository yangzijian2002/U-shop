// pages/address/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        address: [],
        region: ['北京市', '北京市', '东城区'],
        detailAdd: ""
    },
    // picker
    bindRegionChange: function (e) {
        this.setData({
        region: e.detail.value
        })
    },
    // 详细地址
    detailed(e){
        let value = e.detail.value;
        this.setData({
            detailAdd: value
        });
    },
    // 添加新地址
    push(){
        let newAdd = [this.data.region.concat(this.data.detailAdd)];
        let address = wx.getStorageSync('address');
        let arr = [];
        if(address && address.length!=0){
           arr = address.concat(newAdd);
        }else{
            arr = newAdd;
        }
        wx.setStorageSync('address', arr)
        this.setData({
            address: arr
        })
    },
    // 使用地址
    active(e){
        // console.log(e.currentTarget.dataset.index);
        let index = e.currentTarget.dataset.index;
        let address = this.data.address;
        let add = address.splice(index,1);
        let arr = add.concat(address);
        this.setData({
            address: arr
        });
        wx.setStorageSync('address', arr) 
    },
    // 删除地址
    delete(e){
        let index = e.currentTarget.dataset.index;
        let address =  this.data.address;
        let add = address.splice(index,1);
        this.setData({
            address: address
        });
        wx.setStorageSync('address', address)
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // 设置页面标题
        wx.setNavigationBarTitle({
            title: "地址管理"
        })
        // 获取地址
        let address = wx.getStorageSync('address');
        if(address && address.length!=0){
            this.setData({
                address: address
            })
        }
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