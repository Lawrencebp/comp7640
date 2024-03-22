<script setup>
import {ref} from "vue";
import {useVendorStore} from "@/stores/index.js";
import {publishNewGood} from "@/api/vendor/request.js";
import {ElMessage} from "element-plus";

const vendorStore = useVendorStore()
const newProductForm = ref(null)
const rules = ref({
  productName: [
    {required: true, message: 'You must type product name', trigger: 'blur'},
    {min: 5, max: 20, message: 'The length of product name must be 5 - 20', trigger: 'blur'}
  ]
})
const newProductModel = ref({
  productName: '',
  listedPrice: 0,
  inventory: 1,
  tags: [],
  vendorId:vendorStore.vendorId,
  imgUrl:null
})

const submitProductData = async () => {
  newProductModel.value.tags = newProductModel.value.tags.join(',')
  const res = await publishNewGood(newProductModel.value)
  if (res.code === 200){
    ElMessage({
      showClose: true,
      message: 'Publish new product successfully',
      type: 'success',
      duration:2000
    })
    newProductModel.value.tags = []
    newProductForm.value.resetFields()
    return
  }
  ElMessage({
    showClose: true,
    message: res.message,
    type: 'error',
    duration:2000
  })
}

</script>

<template>
  <div class="bone">
    <el-form
        style="max-width: 600px"
        label-width="auto"
        class="demo-ruleForm"
        status-icon
        ref="newProductForm"
        :model="newProductModel"
        :rules="rules"
    >
      <el-form-item label="Product name" prop="productName" >
        <el-input v-model="newProductModel.productName" placeholder="Please type your product name"/>
      </el-form-item>
      <el-form-item label="Price">
        <el-input-number v-model="newProductModel.listedPrice" :min="1" :precision="0"/>
      </el-form-item>
      <el-form-item label="Inventory">
        <el-input-number v-model="newProductModel.inventory" :min="10" :precision="0"/>
      </el-form-item>
      <el-form-item label="Tag" prop="name">
        <el-checkbox-group v-model="newProductModel.tags" :max="3">
          <ul class="checkBoxGroup">
            <li>
              <el-checkbox label="Digital" value="Digital" size="large"/>
            </li>
            <li>
              <el-checkbox label="Food" value="Food" size="large"/>
            </li>
            <li>
              <el-checkbox label="Electric" value="Electric" size="large"/>
            </li>
            <li>
              <el-checkbox label="Phone" value="Phone" size="large"/>
            </li>
          </ul>
          <ul class="checkBoxGroup">
            <li>
              <el-checkbox label="Book" value="Book" size="large"/>
            </li>
            <li>
              <el-checkbox label="Make up" value="Makeup" size="large"/>
            </li>
            <li>
              <el-checkbox label="Decoration" value="Decoration" size="large"/>
            </li>
            <li>
              <el-checkbox label="Painting" value="Painting" size="large"/>
            </li>
          </ul>

        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="  ">
        <el-button type="primary" @click="submitProductData">
          Create
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped>
.bone {
  width: 800px;
  padding: 0 100px;
  margin: 200px auto;
}

.checkBoxGroup {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.checkBoxGroup li{
  width: 150px;
}
</style>
