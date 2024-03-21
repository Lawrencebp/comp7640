<script setup>
import {ref, onMounted} from "vue";
import {getOrderInfo} from "@/api/customerIndex/request.js";
import {useCustomerStore} from "@/stores/index.js";
import {delOneTransaction,updateTransaction} from "@/api/customerIndex/request.js";
import router from "@/router/index.js";

const customerStore = useCustomerStore()
const page_size = ref(4)
const current = ref(1)
const total = ref(0)
const orderData = ref([])

onMounted(async () => {
  const d = await getOrderInfo(customerStore.customerId,page_size.value,current.value)
  total.value = d.data.total
  orderData.value = d.data.records
  orderData.value.forEach(item => {
    item.isEdit = false
    item.status === '1' ? item.state = 'Shipped' : item.state = 'Not shipped'
  })
  console.log(orderData.value)
})

const handleDelete = async (index, row) => {
  await delOneTransaction(row.transactionId)
  router.go(0)
}

const changeNumber = async value => {
  await updateTransaction(value.transactionId,value.amount)
  router.go(0)
}

const handleChange = async (value) => {
  const d = await getOrderInfo(customerStore.customerId,page_size.value,value)
  total.value = d.data.total
  orderData.value = d.data.records
  orderData.value.forEach(item => {
    item.isEdit = false
    item.status === '1' ? item.state = 'Shipped' : item.state = 'Not shipped'
  })
}



</script>

<template>
  <el-table :data="orderData" stripe style="width: 100%;margin-bottom: 20px">
    <el-table-column label="Image">
      <template #default="scope">
        <div style="display: flex; align-items: center;height: 80px">
          <el-image style="width: 80px;height: 80px" src="src/assets/demo.jpg"/>
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="productName" label="Good Name"/>
    <el-table-column prop="listedPrice" label="Price"/>
    <el-table-column prop="amount" label="Number" width="300px">
      <template #default="scope">
        <el-input-number v-if="scope.row.status === '0'" v-model="scope.row.amount" size="small"/>
        <el-button type="primary" @click="changeNumber(scope.row)" size="small" v-if="scope.row.status === '0'" >Change</el-button>
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

  <el-pagination background layout="prev, pager, next" :total="total"
                 :page-size="page_size" @current-change="handleChange"
  />
</template>

<style scoped>

</style>
