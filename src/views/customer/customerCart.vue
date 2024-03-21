<script setup>
import eachGood from '@/components/eachGood.vue'
import {useGoodsStore} from "@/stores/index.js";
import {ref,onMounted} from "vue";

const goodsStore = useGoodsStore()
const list = ref([])
const total = ref(0)

const delOneGood = delId => {
  goodsStore.cartList = goodsStore.cartList.filter(item => item.productId !== delId)
}

// 分页查询购物车商品
const pageQueryCartGoods = (current=1, size=10) => {
  const { cartList } = goodsStore;
  const total = cartList.length;
  const offset = (current - 1) * size;
  const cartGoods = cartList.slice(offset, offset + size);
  return { current, size, total, records: cartGoods }
}

onMounted(() => {
  const page = pageQueryCartGoods(1,4)
  list.value = page.records
  total.value = page.total
})

const handleChange = value => {
  const page = pageQueryCartGoods(value,4)
  list.value = page.records
  total.value = page.total
}


</script>

<template>
  <div v-if="goodsStore.cartList.length === 0" class="warning">
    <h1>You have not goods in your cart</h1>
  </div>
  <each-good v-for="item in list" :key="item.productId"
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
  <el-pagination background layout="prev, pager, next" :total="total"
                 :page-size="4" @current-change="handleChange"
  />
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
