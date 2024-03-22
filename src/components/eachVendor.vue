<script setup>
import {ref} from "vue";

const prop = defineProps({
  businessName: String,
  score: Number,
  productList: Array,
  location: String
})

const tableData = ref(prop.productList)
tableData.value.forEach(item => {
  item.tags = item.tags.split(',')
})


</script>

<template>
  <el-card style="width: 550px;margin:10px">
    <template #header>
      <div class="card-header head">
        <span>BusinessName: {{ businessName }}</span>
        <span>Location: {{ location }}</span>
      </div>
    </template>
    <el-table :data="tableData" stripe style="width: 100%;max-height: 610px">
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
    <template #footer>Score: {{ score }}</template>
  </el-card>
</template>

<style scoped>
.head {
  display: flex;
  justify-content: space-between;
}
</style>
