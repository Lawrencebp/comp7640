import request from "@/util/axiosConfig.js";

export const getGoodsLit = (size,current,params=null) => {
    return request.post('/product/getPageProducts',{
        size,
        current
    },{
        params
    })
}

export const getVendorsLit = (size,current,params=null) => {
    return request.post('/vendor/getPageVendors',{
        size,
        current
    },{
        params
    })
}

