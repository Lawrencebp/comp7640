<script setup>
const prop = defineProps({
  businessName:String,
  score:Number,
  productList:Array,
  location:String
})


</script>

<template>
    <el-card style="width: 560px;margin:10px">
      <template #header>
        <div class="card-header head">
          <span>BusinessName: {{ businessName }}</span>
          <span>Location: {{ location}}</span>
        </div>
      </template>
      <div class="product" v-for="item in productList" :key="item.productId">
        <div>{{item.productName}}</div>
        <div>{{item.listedPrice}}</div>
        <div>{{item.inventory}}</div>
        <div class="tag">
          <div v-for="(each,index) in item.tags.split(',')" :key="index">
            <el-tag size="small">{{ each }}</el-tag>
          </div>
        </div>
      </div>
      <template #footer>Score: {{score}}</template>
    </el-card>
</template>

<style scoped>
.head{
  display: flex;
  justify-content: space-between;
}
.product{
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.product div{
  width: 70px;
}
.tag{
  display: flex;
  justify-content: end;
}
</style>
