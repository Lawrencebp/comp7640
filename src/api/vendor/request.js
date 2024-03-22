import request from "@/util/axiosConfig.js";

export const publishNewGood = value => {
    return request.post('/product/insertProduct',{
        ...value
    })
}

export const getOneVendorProduct = (size,current,params) => {
    return request.post('/product/getPageProductsByVendorId',{
        size,
        current
    },{
        params
    })
}

export const updateGoodsInfo = (allData) => {
    return request.put('/product/updateBatchProduct',allData)
}

export const delOneProduct = productId => {
    return request.delete(`/product/deleteProductById/${productId}`)
}
