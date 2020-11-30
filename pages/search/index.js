import api from "../../utils/api"
// pages/search/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        rpxHeight: null,
        rpxWidth: null,
        text: '',
        flg: true,
        historyFlg: false,
        focu: true,
        history: [],
        deHistoryFlg: true,
        dataList: [],
        pages : 1,
        max: null,
        lock: true
    },
    // 页面回退
    back(){
        wx.navigateBack({
          delta: 1,
        })
    },
    inputFocus(){
        this.setData({
            historyFlg: false
        })
    },
    inputBlur(){
        this.setData({
            historyFlg: true
        })
    },
    // 数据绑定
    text(e){
        let text = e.detail.value.trim();
        this.setData({
            text: text
        })
        if(text.length != 0){
            this.setData({
                flg: false
            })
        }else{
            this.setData({
                flg: true
            })
        }
    },
    // 搜索
    search(){
        this.setData({
            num: 0,
            dataList: [],
            lock: true
        })
        let that = this;
        let history = wx.getStorageSync('searchHisory')
        let text = [this.data.text];
        let inde = -1;
        let arr = [];
        // 添加历史记录
        if(history.length == 0){
            this.setData({
                history: text
            })
            arr = text;
        }else{
            history.forEach((element,index) => {
                if(element == text){
                    inde = index;
                }
            })
        }
        if(inde == -1 && arr.length == 0){
            arr = text.concat(history);
        }else if(inde != -1){
            let newdata = history.splice(inde,1);
            arr = newdata.concat(history);
        }
        wx.setStorageSync('searchHisory', arr);
        this.setData({
            history: arr
        })
        // 请求数据
        api.getDataFn({
            url: "/api/public/v1/goods/search?query=" + that.data.text + "&pagesize=10&pagenum=1",
            success(res){
                let max = Math.ceil(res.total / 10);
                that.setData({
                    dataList: res.goods,
                    max: max
                })
                // console.log(res); 
            }
        })
        wx.showToast({
            title: '加载中',
            icon: 'loading',
            duration: 3000
          })
        // 隐藏历史记录
        this.setData({
            historyFlg: true
        })
    },
    // 显示删除历史记录按钮
    deHistoryFlg(){
        this.setData({
            deHistoryFlg: !this.data.deHistoryFlg,
            focu: true,
        })
    },
    // 删除历史记录
    delete(e){
        let index = e.target.dataset.index;
        let history = this.data.history;
        history.splice(index,1)
        this.setData({
            history: history,
            focu: true,
        })
        wx.setStorageSync('searchHisory', history);
        
    },
    // 使用历史记录
    hSearch(e){
        
        let text = e.target.dataset.text;
        this.setData({
            text: text,
            flg: false,
            focu: true
        })
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
            title: "商品搜索"
        })
        // 请求搜索记录
        let history = wx.getStorageSync('searchHisory');
        if(history){
            this.setData({
                history: history
            })
        }
        // 获取页面宽高
        wx.getSystemInfo({
            success: res => {
                let clientHeight = res.windowHeight;
                let clientWidth = res.windowWidth;
                let ratio = 750 / clientWidth;
                let rpxHeight = clientHeight * ratio;
                let rpxWidth = clientWidth *ratio;
                this.setData({
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

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        // 上拉触底之后继续获取数据
        
        let num = this.data.pages;
        if(num <= this.data.max-1){
            num++;
            this.setData({
                pages: num
            })
            let arr = [];
            api.request({
                url: "/api/public/v1/goods/search?query=" + this.data.text + "&pagenum=" + num + "&pagesize=10",
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