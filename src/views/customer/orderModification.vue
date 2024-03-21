<script setup>
import {ref, onMounted} from "vue";
import {getOrderInfo} from "@/api/customerIndex/request.js";
import {useCustomerStore} from "@/stores/index.js";

const customerStore = useCustomerStore()
const page_size = ref(4)
const current = ref(1)
const total = ref(0)
const isEdit = ref(false)
const orderData = ref([])

onMounted(async () => {
  const d = await getOrderInfo(customerStore.customerId,page_size.value,current.value)
  total.value = d.data.total
  orderData.value = d.data.records
})

const handleEdit = (index, row) => {
  isEdit.value = !isEdit.value
  console.log(index, row)
}
const handleDelete = (index, row) => {
  console.log(index, row)
}

const handleChange = async (value) => {
  const d = await getOrderInfo(customerStore.customerId,page_size.value,value)
  total.value = d.data.total
  orderData.value = d.data.records
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
      <div v-if="isEdit">
        <el-input-number size="small"/>
        <el-button size="small" @click="isEdit = !isEdit">Finish</el-button>
      </div>
    </el-table-column>
    <el-table-column prop="status" label="Status"/>
    <el-table-column prop="dateTime" label="Time"/>
    <el-table-column prop="time" label="Operation">
      <template #default="scope">
        <el-button size="small" @click="handleEdit(scope.$index, scope)"
        >Edit
        </el-button
        >
        <el-button
            size="small"
            type="danger"
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
