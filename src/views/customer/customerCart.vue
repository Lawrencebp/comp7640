<script setup>
import eachGood from '@/components/eachGood.vue'
import {useGoodsStore} from "@/stores/index.js";

const goodsStore = useGoodsStore()


const delOneGood = delId => {
  goodsStore.cartList = goodsStore.cartList.filter(item => item.productId !== delId)
}

</script>

<template>
  <div v-if="goodsStore.cartList.length === 0" class="warning">
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
  <div class="submit" v-if="goodsStore.cartList.length !== 0">
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
