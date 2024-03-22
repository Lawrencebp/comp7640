import request from "@/util/axiosConfig.js";

export const getGoodsLit = (size, current, params = null) => {
    return request.post('/product/getPageProducts', {
        size,
        current
    }, {
        params
    })
}
export const getVendorsLit = (size, current, params = null) => {
    return request.post('/vendor/getPageVendors', {
        size,
        current
    }, {
        params
    })
}
export const getOrderInfo = (userId, size = 10, current = 1) => {
    return request.post('/transaction/getPageTransactions', {
        size,
        current
    }, {
        params: {
            userId
        }
    })
}
export const delOneTransaction = transactionId => {
    return request.delete(`/transaction/deleteTransactionById/${transactionId}`)
}
export const updateTransaction = (transactionId, amount) => {
    return request.put('/transaction/updateTransaction', {
        transactionId,
        amount
    })
}

export const payCurrentOrder = value => {
    return request.post('/transaction/insertBatchTransaction',value)
}


