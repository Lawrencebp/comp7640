<script setup>
import {ref} from "vue";

const prop = defineProps({
  businessName: String,
  score: Number,
  productList: Array,
  location: String
})
const childTotal = ref(0)
const startPage = (productList,currentPage = 1,size = 5) => {
  const total = productList.length
  const start  = (currentPage - 1) * size
  const end = start + size
  const newProductList = productList.slice(start,end)
  return { total,newProductList }
}


const tableData = ref(prop.productList)
const originalProductList = ref(prop.productList)
if ( originalProductList.value.length > 5 ) {
  const { total, newProductList } = startPage(originalProductList.value)
  originalProductList.value = newProductList
  childTotal.value = total
}
tableData.value.forEach(item => {
  item.tags = item.tags.split(',')
})

const handleChange = value => {
  const { total, newProductList } = startPage(tableData.value,value,5)
  originalProductList.value = newProductList
  childTotal.value = total
}


</script>x

<template>
  <el-card style="width: 550px;margin:10px">
    <template #header>
      <div class="card-header head">
        <span>BusinessName: {{ businessName }}</span>
        <span>Location: {{ location }}</span>
      </div>
    </template>
    <el-table :data="originalProductList" stripe style="width: 100%;max-height: 610px">
      <el-table-column label="Product name" width="250">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <span>{{ scope.row.productName }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Price" width="80">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <span >${{ scope.row.listedPrice }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Inventory" width="90">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <span>{{ scope.row.inventory }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Tags" width="80">
        <template #default="scope">
          <div style="display: flex; flex-direction: column;align-items: center;justify-content: space-between;">
            <el-tag size="small" v-for="(item,index) in scope.row.tags" :key="index">{{item}}</el-tag>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <template #footer>
      <div style="display:flex;justify-content: space-between">
        <div>Score: {{ score }}</div>
        <div><el-pagination background layout="prev, pager, next" :total="childTotal"
                            :page-size="5" @current-change="handleChange"
        /></div>
      </div>
    </template>
  </el-card>
</template>

<style scoped>
.head {
  display: flex;
  justify-content: space-between;
}
</style>
