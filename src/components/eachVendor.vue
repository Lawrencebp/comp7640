<script setup>
const prop = defineProps({
  businessName: String,
  score: Number,
  productList: Array,
  location: String
})


</script>

<template>
  <el-card style="width: 550px;margin:10px">
    <template #header>
      <div class="card-header head">
        <span>BusinessName: {{ businessName }}</span>
        <span>Location: {{ location }}</span>
      </div>
      <!--        <div class="title">-->
      <!--          <div style="width: 200px">Product Name</div>-->
      <!--          <div>Price</div>-->
      <!--          <div>Inventory</div>-->
      <!--          <div>Tags</div>-->
      <!--        </div>-->
    </template>
    <div class="product" v-for="item in productList" :key="item.productId">
      <div class="pname">
        <div style="font-weight: 800;color: red">Product Name:</div>
        {{ item.productName }}
      </div>
      <div>
        <div style="font-weight: 800;color: red">Price:</div>
        ${{ item.listedPrice }}
      </div>
      <div>
        <div style="font-weight: 800;color: red">Inventory:</div>
        {{ item.inventory }}
      </div>
      <div class="tag">
        <div v-for="(each,index) in item.tags.split(',')" :key="index">
          <el-tag size="small">{{ each }}</el-tag>
        </div>
      </div>
    </div>
    <template #footer>Score: {{ score }}</template>
  </el-card>
</template>

<style scoped>
.head {
  display: flex;
  justify-content: space-between;
}

.product {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.tag {
  display: flex;
  flex-direction: column;
  justify-content: start;
}

.pname {
  width: 200px;
}

.title {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}
</style>
