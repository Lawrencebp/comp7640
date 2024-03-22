<script setup>
import {ref, onMounted} from "vue";
import {getOrderInfo} from "@/api/customerIndex/request.js";
import {useCustomerStore} from "@/stores/index.js";
import {delOneTransaction,updateTransaction} from "@/api/customerIndex/request.js";
import router from "@/router/index.js";
import {ElMessage} from "element-plus";

const customerStore = useCustomerStore()
const page_size = ref(7)
const current = ref(1)
const total = ref(0)
const orderData = ref([])


const transferDate = date => {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
}
const dataClean = () => {
  orderData.value.forEach(item => {
    item.isEdit = false
    item.status === '1' ? item.state = 'Shipped' : item.state = 'Not shipped'
    item.listedPrice = `$${item.listedPrice}`
    item.dateTime = transferDate(new Date(item.dateTime))
    item.isChange = false
  })
}

onMounted(async () => {
  const d = await getOrderInfo(customerStore.customerId,page_size.value,current.value)
  total.value = d.data.total
  orderData.value = d.data.records
  dataClean()
})
const handleDelete = async (index, row) => {
  await delOneTransaction(row.transactionId)
  router.go(0)
}
const changeNumber = async value => {
  const res = await updateTransaction(value.transactionId,value.amount)
  if (res.code !== 200){
    ElMessage({
      message: res.message,
      type: 'error',
      duration:2000
    })
  }else {
    router.go(0)
  }

}
const handleChange = async (value) => {
  const d = await getOrderInfo(customerStore.customerId,page_size.value,value)
  total.value = d.data.total
  orderData.value = d.data.records
  dataClean()
}
const test = value => {
  value.isChange = true
}


</script>

<template>
  <el-table :data="orderData" stripe style="width: 100%;margin-bottom: 20px">
    <el-table-column label="Image">
      <template #default="scope">
        <div style="display: flex; align-items: center;height: 80px">
          <el-image style="width: 80px;height: 80px" :src="scope.row.imgUrl"/>
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="productName" label="Good Name"/>
    <el-table-column prop="listedPrice" label="Price"/>
    <el-table-column prop="amount" label="Number" width="300px">
      <template #default="scope">
        <el-input-number :min="1" v-if="scope.row.status === '0'" v-model="scope.row.amount" size="small" @change="test(scope.row)"/>
        <el-button type="primary" @click="changeNumber(scope.row)" size="small" v-if="scope.row.status === '0'"
                   :disabled="!scope.row.isChange"
        >Change</el-button>
      </template>
    </el-table-column>
    <el-table-column prop="state" label="Status"/>
    <el-table-column prop="dateTime" label="Time"/>
    <el-table-column prop="" label="Operation">
      <template #default="scope">
        <el-button
            size="small"
            type="danger"
            :disabled="scope.row.status === '1'"
            @click="handleDelete(scope.$index, scope.row)"
        >Delete
        </el-button
        >
      </template>
    </el-table-column>
  </el-table>

  <el-pagination v-if="orderData.length !== 0" background layout="prev, pager, next" :total="total"
                 :page-size="page_size" @current-change="handleChange"
  />
</template>

<style scoped>

</style>
