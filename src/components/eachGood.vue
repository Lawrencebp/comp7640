<script setup>
const prop = defineProps({
  bname:{
    type:String,
    required:false
  },
  productId:{
    type:Number,
    required:false
  },
  img_url: {
    type:String,
    required:false
  },
  inventory:{
    type:Number,
    required:false
  },
  productName:{
    type:String,
    required:false
  },
  price:{
    type:Number,
    required:false
  },
  tag:{
    type:String,
    required:false
  }
})

</script>

<template>
  <div class="bone">
    <ul class="eachWindow">
      <li class="vendorName">
        {{bname}}
      </li>
      <li>
        <img :src="img_url" alt="..."/>
      </li>
      <li class="name">
        {{ productName }}
      </li>
      <li class="tag">
        <el-tag type="primary" v-for="(item,index) in tag.split(',')" :key="index" >{{item}}</el-tag>
      </li>
      <li>
        ${{price}}
      </li>
      <li>
        <slot name="number">
          Inventory: {{inventory}}
        </slot>
      </li>
      <li>
        <slot name="add" :productId="productId" :productName="productName" :img_url="img_url"
                         :businessName="bname" :listedPrice="price" :inventory="inventory" :tags="tag"
        ></slot>
        <slot name="del" :productId="productId"></slot>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.bone {
  width: 100%;
  height: 120px;
  background-color: rgb(242,242,242);
  border-radius: 10px;
  margin-bottom: 40px;
}

.bone .eachWindow {
  height: 120px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.bone .eachWindow li {
  height: 120px;
  display: flex;
  align-items: center;
}
.name{
  width: 200px;
}
.tag {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}
.eachWindow img {
  width: 100px;
  height: 80px;
}
</style>
