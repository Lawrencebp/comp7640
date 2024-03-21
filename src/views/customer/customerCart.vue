<script setup>
import eachGood from '@/components/eachGood.vue'
import {useGoodsStore} from "@/stores/index.js";

const goodsStore = useGoodsStore()
goodsStore.cartList.forEach(item => {
  item.number = 1
  if (!goodsStore.cartList.includes(item)) {
    item.number = 1
  } else {
    console.log(goodsStore.cartList)
    goodsStore.cartList.splice(goodsStore.cartList.indexOf(item),1)
    goodsStore.cartList[goodsStore.cartList.indexOf(item)].number += 1

  }
})
console.log(goodsStore.cartList)

const delOneGood = delId => {
  goodsStore.cartList = goodsStore.cartList.filter(item => item.productId !== delId)
}

</script>

<template>
  <div class="warning">
    <h1>You have not goods in your cart</h1>
  </div>
  <each-good v-for="item in goodsStore.cartList" :key="item.productId"
             :bname="item.businessName"
             :img_url="item.img_url"
             :tag="item.tags"
             :price="item.listedPrice"
             :product-name="item.productName"
             :productId="item.productId"
  >
    <template #number>
      <el-input-number v-model="item.number" :min="1"/>
    </template>
    <template #del="obj">
      <el-button type="danger" @click="delOneGood(obj.productId)">Remove</el-button>
    </template>
  </each-good>
  <div class="submit">
    <el-button type="primary" round>Pay</el-button>
  </div>
</template>

<style scoped>
.submit {
  display: flex;
  justify-content: end;
}
.warning{
  width: 100%;
  height: 50%;
  margin: 0 auto;
}
</style>
