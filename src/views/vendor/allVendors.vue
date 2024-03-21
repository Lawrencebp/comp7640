<script setup>
import eachVendor from '@/components/eachVendor.vue'
import {ref, onMounted} from "vue";
import {useRoute} from "vue-router";
import {getVendorsLit} from "@/api/customerIndex/request.js";

const page_size = ref(2)
const route = useRoute()
const vendorsData = ref([])
const total = ref(0)
onMounted(async () => {
  const data = await getVendorsLit(page_size.value,1,route.query)
  total.value = data.data.total
  vendorsData.value = data.data.records
})


const handleChange = async (value) => {
  const data = await getVendorsLit(page_size.value,value,route.query)
  total.value = data.data.total
  vendorsData.value = data.data.records
  console.log(data.data.records)
}
</script>

<template>
  <div class="vendor">
    <each-vendor v-for="item in vendorsData" :key="item.vendorId"
                 :businessName="item.businessName"
                 :score="item.score"
                 :productList="item.productList"
                 :location="item.geographicalPresence"
    ></each-vendor>
  </div>
  <el-pagination background layout="prev, pager, next" :total="total"
                 :page-size="page_size" @current-change="handleChange"
  />
</template>

<style scoped>
.vendor{
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 50px;
}
</style>
