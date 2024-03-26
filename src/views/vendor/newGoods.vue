<script setup>
import {ref} from "vue";
import {useVendorStore} from "@/stores/index.js";
import {publishNewGood} from "@/api/vendor/request.js";
import {ElMessage} from "element-plus";
import { Plus } from '@element-plus/icons-vue'
import {URL} from "@/util/axiosConfig.js";

const vendorStore = useVendorStore()
const newProductForm = ref(null)
const trueUrl = URL + '/file/upload'
const rules = ref({
  productName: [
    { required: true, message: 'You must type product name', trigger: 'blur' },
    { min: 5, max: 20, message: 'The length of product name must be 5 - 20', trigger: 'blur' }
  ],
  fakeTags: [
    { required:true, message:'You must choose tags', trigger:'change'},
  ]
})
const newProductModel = ref({
  productName: '',
  listedPrice: 0,
  inventory: 1,
  fakeTags: [],
  vendorId:vendorStore.vendorId,
  imgUrl:null
})

const submitProductData = async () => {
  try{
    await newProductForm.value.validate()
  } catch (e){
    return
  }
  newProductModel.value.tags = newProductModel.value.fakeTags.join(',')
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

const handleImgSuccess = (response) => {
  newProductModel.value.imgUrl = "http://" + response.data;
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
      <el-form-item label="Image">
        <el-upload
          v-model="newProductModel.imgUrl"
          class="avatar-uploader"
          :action="trueUrl"
          :show-file-list="false"
          :on-success="handleImgSuccess"
        >
          <img v-if="newProductModel.imgUrl" :src="newProductModel.imgUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="Tag" prop="fakeTags">
        <el-checkbox-group v-model="newProductModel.fakeTags" :max="3">
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
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>

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
