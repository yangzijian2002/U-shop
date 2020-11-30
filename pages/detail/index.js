import api from "../../utils/api"
// pages/detail/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        cat_id: null,
        content: null,
        region: [],
        customItem: null,
        active: false,
        flg: true,
        collFlg: false
    },
    // 收藏
    collection(){
        let id = [this.data.cat_id];
        let arr = [];
        let flg = !this.data.collFlg;
        this.setData({
            collFlg: flg
        })
        let coll = wx.getStorageSync('collection');
        if(flg){
            if(coll.length == 0){
                arr = id;
            }else{
                arr = coll.concat(id);
            }
        }else{
            let inde = -1;
            coll.forEach((element,index) => {
                if(element == this.data.cat_id){
                    inde = index;
                }
            })
            coll.splice(inde,1);
            arr = coll;
        }
        wx.setStorageSync('collection', arr)
    },
    // 改变收货地址
    navigator(e) {
        wx.navigateTo({
          url: '/pages/address/index',
        })
    },
    // 显示规格参数和图文介绍
    active(e){
        let flg = null;
        if(e.target.dataset.active == 0){
            flg = true;
        }else{
            flg= false;
        }
        this.setData({
            active: flg
        })
    },
    // 跳转到购物车页面
    cart(){
        wx.switchTab({
            url:"/pages/cart/index"
       })
    },
    // 添加到购物车
    pushCart(){
        let id = [this.data.cat_id];
        let arr = wx.getStorageSync('car_arr');
        let newarray = null;
        if(arr.length == 0){
            newarray = id;
        }else{
            let flg = true;
            arr.forEach(element => {
                if(element == id){
                    flg = false;
                }
            });
            if(flg){
                newarray = id.concat(arr);
            }else{
                newarray = arr;
            }
        }
        wx.setStorageSync("car_arr", newarray);
        this.setData({
            flg: false
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this;
        // 设置页面标题
        wx.setNavigationBarTitle({
            title: "商品详情"
        })
        // 判断商品id，并根据id请求数据
        if(options.id){
            this.data.cat_id = options.id;
            wx.setStorageSync('cat_id' , options.id)
        }else{
            this.setData({
                cat_id: wx.getStorageSync('cat_id')
            })
        }
        api.getDataFn({
            url: "/api/public/v1/goods/detail?goods_id=" + that.data.cat_id,
            success(res){
                that.setData({
                    content: res
                })
            }
        })
        // 判断商品是否已加入购物车
            // 请求购物车id数组
        let arr = wx.getStorageSync('car_arr');
        if(arr.length != 0){
            arr.forEach(element => {
                if(this.data.cat_id==element){
                    this.setData({flg: false})
                }
            });   
        }
        // 判断此商品是否收藏
        let coll = wx.getStorageSync('collection');
        if(coll.length != 0){
            coll.forEach(element => {
                if(element == this.data.cat_id){
                    this.setData({
                        collFlg: true
                    })
                }
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
        // 请求收货地址
        this.setData({
            region: wx.getStorageSync("address")[0]
        })
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