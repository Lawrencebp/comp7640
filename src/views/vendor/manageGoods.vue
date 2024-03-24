<script setup>
import maGoods from '@/components/maGoods.vue'
import {ref,onMounted} from "vue";
import {getOneVendorProduct,updateGoodsInfo,delOneProduct} from "@/api/vendor/request.js";
import {paginationByEl} from "@/util/myselfFun.js";
import {useVendorStore} from "@/stores/index.js";
import router from "@/router/index.js";
import {ElMessage} from "element-plus";
const vendorStore = useVendorStore()
const allData = ref([])
const page_size = ref(4)
const total = ref(0)
const current = ref(1)

onMounted( async () => {
  await paginationByEl(getOneVendorProduct,page_size.value,1,{vendorId:vendorStore.vendorId},total,allData)
})

const handleChange = async (value) => {
  await paginationByEl(getOneVendorProduct,page_size.value,value,{vendorId:vendorStore.vendorId},total,allData)
}

const changeName = ({productId,value}) => {
  allData.value.forEach(item => {
    if (item.productId === productId){
      item.productName = value
    }
  })
}

const changePrice = ({productId,value}) => {
  allData.value.forEach(item => {
    if (item.productId === productId){
      item.listedPrice = value
    }
  })
}

const changeInventory = ({productId,value}) => {
  allData.value.forEach(item => {
    if (item.productId === productId){
      item.inventory = value
    }
  })
}

const changeTag = ({productId,value}) => {
  allData.value.forEach(item => {
    if (item.productId === productId){
      item.tags = value.join(',')
    }
  })
}

const changeImg = ({productId,value}) => {
  allData.value.forEach(item => {
    if (item.productId === productId){
      item.imgUrl = value
    }
  })
}

const remove =  async (id) => {
  const res = await delOneProduct(id)
  if (res.code !== 200){
    ElMessage({
      message: res.message,
      type: 'error',
      duration:1000
    })
  }else {
    ElMessage({
      showClose: true,
      message: 'Delete good successfully',
      type: 'success',
      duration: 1000
    })
  }
  current.value = 1
  await paginationByEl(getOneVendorProduct,page_size.value,1,{vendorId:vendorStore.vendorId},total,allData)
  setTimeout(() => {
    router.go(0)
  },1100)
}

const submitChange = async () => {
  const res = await updateGoodsInfo(allData.value)
  if (res.code !== 200){
    ElMessage({
      message: res.message,
      type: 'error',
      duration:1000
    })
  }else {
    ElMessage({
      showClose: true,
      message: 'Change successfully',
      type: 'success',
      duration: 1000
    })
  }
  await paginationByEl(getOneVendorProduct,page_size.value,1,{vendorId:vendorStore.vendorId},total,allData)
  setTimeout(() => {
    router.go(0)
  },1100)
}

</script>

<template>
  <div v-if="allData.length === 0" class="warning">
    <el-empty description="There are no products in your store yet" />
  </div>
  <ma-goods v-for="item in allData" :key="item.productId"
            :imgUrl="item.imgUrl"
            :inventory="item.inventory"
            :listedPrice="item.listedPrice"
            :productId="item.productId"
            :tags="item.tags"
            :productName="item.productName"
            @modifyName="changeName"
            @modifyPrice="changePrice"
            @modifyInventory="changeInventory"
            @modifyTag="changeTag"
            @modifyImg="changeImg"
  >
  <template #button="obj">
    <el-button type="danger" @click="remove(obj.productId)">Remove</el-button>
  </template>
  </ma-goods>
  <el-pagination v-if="allData.length !== 0" background layout="prev, pager, next" :total="total"
                 :page-size="page_size" @current-change="handleChange"
  />
  <div class="submit">
    <el-button v-if="allData.length !== 0" type="primary" round @click="submitChange">Change</el-button>
  </div>

</template>

<style scoped>
.submit{
  display: flex;
  justify-content: end;
}
</style>
