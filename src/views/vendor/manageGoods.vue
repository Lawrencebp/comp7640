<script setup>
import maGoods from '@/components/maGoods.vue'
</script>

<template>
  <ma-goods></ma-goods>
  <ma-goods></ma-goods>
  <ma-goods></ma-goods>
  <ma-goods></ma-goods>
  <div class="submit">
    <el-button type="primary" round>Change</el-button>
  </div>

</template>

<style scoped>
.submit{
  display: flex;
  justify-content: end;
}
</style>
