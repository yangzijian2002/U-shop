import api from "../../utils/api"
// pages/cart/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        region: [],
        cartArrId: [],
        cartArr: [],
        listFlg: [],
        num: 0,
        allFlg: false,
        price: 0,
        priceArr: [0,"00"]
    },
    // 改变收货地址
    bindRegionChange: function (e) {
      this.setData({
        region: e.detail.value
      })
      wx.setStorageSync("address",e.detail.value)
    },
    // 选中商品
    select(e){
        let index = e.currentTarget.dataset.index;
        let arr = this.data.listFlg;
        arr[index] = true;
        // 判断是否全部选中
        let flg = true;
        arr.forEach(element => {
            if(element){}else{
                flg = false
            }
        });
        // 改变数据
        this.setData({
            listFlg: arr,
            allFlg: flg
        })
        this.price();
        this.number();
    },
    // 取消选中
    cancel(e){
        let index = e.currentTarget.dataset.index;
        let arr = this.data.listFlg;
        arr[index] = false;
        // 判断是否全部选中
        let flg = true;
        arr.forEach(element => {
            if(element){}else{
                flg = false
            }
        });
        // 改变数据
        this.setData({
            listFlg: arr,
            allFlg: flg
        })
        
        this.price();
        this.number();
    },
    // 全选
    selectAll(){
        let arr = this.data.listFlg;
        arr.forEach((element,index) => {
            arr[index] = true
        });
        this.setData({
            listFlg: arr,
            allFlg: true
        })
        
        this.price();
        this.number();
    },
    // 全不选
    cancelAll(){
        let arr = this.data.listFlg;
        arr.forEach((element,index) => {
            arr[index] = false
        });
        this.setData({
            listFlg: arr,
            allFlg: false
        })
        this.price();
        this.number();
    },
    // 价格
    price(){
        let list = this.data.listFlg;
        let cart = this.data.cartArr;
        let price = 0;
        list.forEach((element,index) => {
            if(element){
                price += cart[index].goods_price;
            }
        })
        let arr = price.toFixed(2).toString().split(".");
        this.setData({
            price: price,
            priceArr: arr
        })
        
    },
    // 选中商品数量
    number(){
        let num = 0;
        let arr = this.data.listFlg;
        arr.forEach(element => {
           element?num++:''; 
        });
        this.setData({
            num: num
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function () {
        // 设置页面标题
        wx.setNavigationBarTitle({
            title: "购物车"
        })
        // 请求收货地址
        this.setData({
            region: wx.getStorageSync("address")
        })
        // 请求购物车id数组
        let arr = wx.getStorageSync('car_arr');
        if(arr.length != 0){
            this.setData({
                cartArrId: arr
            })
            // 请求购物车数据
            api.getDataFn({
                url: "/api/public/v1/goods/goodslist?goods_ids=" + this.data.cartArrId,
                success:res => {
                    // console.log(res);
                    this.setData({
                        cartArr: res
                    })
                }
            })
            let arrFlg = [];
            arr.forEach((element,index) => {
                arrFlg[index] = false;
            });
            this.setData({
                listFlg: arrFlg
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
        this.onLoad()
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
        console.log("aa");
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