<script setup>
import eachGood from '@/components/eachGood.vue'
import {useGoodsStore, useCustomerStore} from "@/stores/index.js";
import {ref, onMounted} from "vue";
import {payCurrentOrder} from "@/api/customerIndex/request.js";
import router from "@/router/index.js";

const goodsStore = useGoodsStore()
const customerStore = useCustomerStore()
const finalList = ref([])
const total = ref(0)
const page_size = ref(5)
const currentPage = ref(1)

// 分页查询购物车商品
const pageQueryCartGoods = (current = 1, size = 10) => {
  const {cartList} = goodsStore;
  const total = cartList.length;
  const offset = (current - 1) * size;
  const cartGoods = cartList.slice(offset, offset + size);
  return {current, size, total, records: cartGoods}
}

const startPagination = (currentPage,size) => {
  const page = pageQueryCartGoods(currentPage, size)
  finalList.value = page.records
  total.value = page.total
}

const delOneGood = delId => {
  finalList.value = finalList.value.filter(item => item.productId !== delId)
  goodsStore.cartList = goodsStore.cartList.filter(item => item.productId !== delId)
  startPagination(currentPage.value,page_size.value)
  if (finalList.value.length === 0 && currentPage.value > 0) {
    startPagination(currentPage.value - 1,page_size.value)
  }

}

onMounted(() => {
  startPagination(currentPage.value,page_size.value)
})

const handleChange = value => {
  currentPage.value = value
  startPagination(currentPage.value,page_size.value)
}

const pay = async () => {
  const submitData = goodsStore.cartList.map(({productId, number: amount}) => {
    return {
      userId: customerStore.customerId,
      productId,
      amount
    }
  })
  await payCurrentOrder(submitData)
  await router.go(0)
}


</script>

<template>
  <div v-if="finalList.length === 0" class="warning">
    <h1>You have not goods in your cart</h1>
  </div>
  <each-good v-for="item in finalList" :key="item.productId"
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

  <el-pagination v-if="finalList.length !== 0" background layout="prev, pager, next" :total="total"
                 :page-size="page_size" @current-change="handleChange"
  />
  <div class="submit" v-if="finalList.length !== 0">
    <el-button type="primary" round @click="pay">Pay</el-button>
  </div>
</template>

<style scoped>
.submit {
  display: flex;
  justify-content: end;
}

.warning {
  width: 100%;
  height: 50%;
  margin: 0 auto;
}
</style>
