function getDataFn(params){
    let url = params.url;
    wx.request({
        url: 'https://www.uinav.com' + url,
        data: {},
        header: {"content-type" : "location/json"},
        method: "GET",
        dataType: "json",
        responseType: "text",
        success(res){
        if(params.success){
            params.success(res.data.message)
        }
        },
        fail(err){
        params.fail(err);
        }
    })
}function postDataFn(params){
    let url = params.url;
    wx.request({
        url: 'https://www.uinav.com' + url,
        data: {},
        header: {"content-type" : "location/json"},
        method: "POST",
        dataType: "json",
        responseType: "text",
        success(res){
        if(params.success){
            params.success(res)
        }
        },
        fail(err){
        params.fail(err);
        }
    })
}
export default {getDataFn,postDataFn}