<script setup>
import {ref} from "vue";

const isEdit = ref(false)
const tableData = [
  {
    goodName:'iphone15',
    price:'$100',
    state:0,
    time:'2020-1-1',
    number:10,
    img:'src/assets/demo.jpg',
    totalPrice:1000
  },
  {
    goodName:'iphone15',
    price:'$100',
    state:0,
    time:'2020-1-1',
    number:10,
    img:'src/assets/demo.jpg',
    totalPrice:1000
  },
  {
    goodName:'iphone15',
    price:'$100',
    state:0,
    time:'2020-1-1',
    number:10,
    img:'src/assets/demo.jpg',
    totalPrice:1000
  },
]

const handleEdit = (index, row) => {
  isEdit.value = !isEdit.value
  console.log(index, row)
}
const handleDelete = (index, row) => {
  console.log(index, row)
}

</script>

<template>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column label="Image" >
        <template #default="scope">
          <div style="display: flex; align-items: center;height: 80px">
            <el-image style="width: 80px;height: 80px" :src="scope.row.img"/>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="goodName" label="Good Name"  />
      <el-table-column prop="price" label="Price"  />
      <el-table-column prop="number" label="Number" width="300px">
        <div v-if="isEdit">
          <el-input-number size="small"  />
          <el-button size="small" @click="isEdit = !isEdit">Finish</el-button>
        </div>
      </el-table-column>
      <el-table-column prop="state" label="State" />
      <el-table-column prop="time" label="Time" />
      <el-table-column prop="time" label="Operation" >
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope)"
          >Edit</el-button
          >
          <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
          >Delete</el-button
          >
        </template>
      </el-table-column>
    </el-table>
</template>

<style scoped>

</style>
