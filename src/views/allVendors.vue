<script setup>
import eachVendor from '@/components/eachVendor.vue'
import {ref, onMounted} from "vue";
import {useRoute} from "vue-router";
import {getVendorsLit} from "@/api/customerIndex/request.js";
import {paginationByEl} from "@/util/myselfFun.js";

const page_size = ref(2)
const route = useRoute()
const vendorsData = ref([])
const total = ref(0)

onMounted( async () => {
  await paginationByEl(getVendorsLit,page_size.value,1,route.query,total,vendorsData)
})
const handleChange = async (value) => {
  await paginationByEl(getVendorsLit,page_size.value,value,route.query,total,vendorsData)
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
  <div style="width: 100%;">
    <el-pagination v-if="vendorsData.length !== 0" background layout="prev, pager, next" :total="total"
                   :page-size="page_size" @current-change="handleChange"
    />
  </div>
</template>

<style scoped>
.vendor {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  margin-bottom: 10px;
  //padding: 0 50px;
}
</style>
