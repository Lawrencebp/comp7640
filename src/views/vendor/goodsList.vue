<script setup>
import eachGood from '@/components/eachGood.vue'
import {getGoodsLit} from "@/api/customerIndex/request.js";
import {ref, onMounted} from "vue";
import {useRoute} from "vue-router";
import {useGoodsStore} from "@/stores/index.js";
import { ElNotification } from 'element-plus'

const goodsStore = useGoodsStore()
const route = useRoute()
const goodsData = ref([])
const total = ref(0)

onMounted(async () => {
  const data = await getGoodsLit(4,1,route.query)
  total.value = data.data.total
  goodsData.value = data.data.records
})

const handleChange = async (value) => {
  const data = await getGoodsLit(4,value,route.query)
  total.value = data.data.total
  goodsData.value = data.data.records
}

const isHave = compareId => {
  for (let i = 0; i < goodsStore.cartList.length; i++) {
    if (goodsStore.cartList[i].productId === compareId){
      return true
    }
  }
  return false
}

const add = value => {
  if (isHave(value.productId)){
    goodsStore.cartList.forEach(item => {
      if (item.productId === value.productId){
        item.number += 1
      }
    })
  }else {
    value.number = 1
    goodsStore.setCartList(value)
  }
  ElNotification({
    title: 'Success',
    message: 'Successfully added to shopping cart',
    type: 'success',
    position:'bottom-left',
    duration:1500
  })
}

</script>

<template>
  <each-good v-for="item in goodsData" :key="item.productId"
             :bname="item.businessName"
             :img_url="item.imgUrl"
             :tag="item.tags"
             :price="item.listedPrice"
             :inventory="item.inventory"
             :product-name="item.productName"
             :productId="item.productId"
  >
    <template #add="obj" v-if="route.path !== '/goods'">
      <el-button type="primary" @click="add(obj)" :disabled="item.inventory <= 0">Add</el-button>
    </template>
  </each-good>
  <el-pagination background layout="prev, pager, next" :total="total"
                 :page-size="4" @current-change="handleChange"
  />


</template>

<style scoped>

</style>
