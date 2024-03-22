export const paginationByEl = async (requestFun,page_size,current,parameters,total,dataList) => {
    const data = await requestFun(page_size, current, parameters)
    total.value = data.data.total
    dataList.value = data.data.records
}
